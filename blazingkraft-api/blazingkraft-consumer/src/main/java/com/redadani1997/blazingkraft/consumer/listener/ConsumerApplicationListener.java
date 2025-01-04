package com.redadani1997.blazingkraft.consumer.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.*;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.consumer.deserializer.ConsumerDeserializerDeterminer;
import com.redadani1997.blazingkraft.consumer.service.impl.BlazingConsumerHandlerServiceImpl;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.ConsumerDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class ConsumerApplicationListener {
    private final ConsumerDao consumerDao;
    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;
    private final ClusterDao clusterDao;
    private final ClientsFactory clientsFactory;
    private final ConsumerDeserializerDeterminer consumerDeserializerDeterminer;

    @EventListener
    @Order(2)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        // Register ws handler
        try {
            this.commonWebSocketHandlerRepository.register(
                    "/queue/consumer", BlazingConsumerHandlerServiceImpl.class);
        } catch (Exception ex) {
            String errorMessage =
                    String.format(
                            "Error while registering consumer websocket handler with error => '%s'.",
                            ex.getMessage());
            log.error(CommonLogUtils.getError(errorMessage), ex);
        }

        // Register consumer clients
        List<ConsumerModel> consumerModels = this.consumerDao.findAll();
        for (ConsumerModel consumerModel : consumerModels) {
            try {
                this.registerConsumerClient(consumerModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering consumer client for cluster: '%s', with error => '%s'."
                                        + " Proceeding with application startup and will retry to re-construct client when requested.",
                                consumerModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterCreatedApplicationEvent(ClusterCreatedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());
        // Create Consumer in DB
        ConsumerModel consumerModel = new ConsumerModel(clusterModel, new HashMap<>());
        ConsumerModel savedConsumerModel = this.consumerDao.save(consumerModel);

        // Register Consumer Client
        this.registerConsumerClient(savedConsumerModel);
    }

    @EventListener
    public void clusterImportedApplicationEvent(ClusterImportedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());
        // Create Consumer in DB
        ConsumerModel consumerModel = new ConsumerModel(clusterModel, new HashMap<>());
        this.consumerDao.save(consumerModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterEditedApplicationEvent(ClusterEditedApplicationEvent eventData) {
        ConsumerModel model = this.consumerDao.findByCode(eventData.getClusterCode());

        this.registerConsumerClient(model);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void consumerUpdatedApplicationEvent(ConsumerUpdatedApplicationEvent eventData) {
        ConsumerModel consumerModel = this.consumerDao.findByCode(eventData.getClusterCode());

        this.registerConsumerClient(consumerModel);
    }

    @EventListener
    public void consumerAssignedApplicationEvent(ConsumerAssignedApplicationEvent eventData) {
        String clusterCode = eventData.getClusterCode();
        try {
            this.clientsFactory.setCurrentConsumerClient(clusterCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "Cluster with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getClusterCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            ConsumerModel consumerModel = this.consumerDao.findByCode(clusterCode);

            this.registerConsumerClient(consumerModel);

            this.clientsFactory.setCurrentConsumerClient(clusterCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterDeletedApplicationEvent(ClusterDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterConsumerClient(eventData.getClusterCode());
    }

    private void registerConsumerClient(ConsumerModel consumerModel) {
        CommonDeserializer keyDeserializer = null;
        CommonDeserializer valueDeserializer = null;
        if (!consumerModel.getPerRequestKeyDeserializer()) {
            keyDeserializer =
                    this.consumerDeserializerDeterminer.determineKey(
                            EnumUtils.fromNameNotNull(CommonSerde.class, consumerModel.getKeyDeserializer()),
                            consumerModel.schemaRegistryCode(),
                            consumerModel.keyDeserializerConfiguration(),
                            null);
        }
        if (!consumerModel.getPerRequestValueDeserializer()) {
            valueDeserializer =
                    this.consumerDeserializerDeterminer.determineValue(
                            EnumUtils.fromNameNotNull(CommonSerde.class, consumerModel.getValueDeserializer()),
                            consumerModel.schemaRegistryCode(),
                            consumerModel.valueDeserializerConfiguration(),
                            null);
        }

        // Register Consumer Client
        this.clientsFactory.registerConsumerClient(
                consumerModel.getCode(),
                consumerModel.schemaRegistryCode(),
                consumerModel.getPerRequestKeyDeserializer(),
                keyDeserializer,
                consumerModel.getPerRequestValueDeserializer(),
                valueDeserializer,
                consumerModel.mergedConfiguration(),
                consumerModel.getPollTimeoutMs());
    }
}
