package com.redadani1997.blazingkraft.producer.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.*;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.ProducerDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import com.redadani1997.blazingkraft.producer.serializer.ProducerSerializerDeterminer;
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
public class ProducerApplicationListener {
    private final ProducerDao producerDao;
    private final ClusterDao clusterDao;
    private final ClientsFactory clientsFactory;
    private final ProducerSerializerDeterminer producerSerializerDeterminer;

    @EventListener
    @Order(2)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        List<ProducerModel> producerModels = this.producerDao.findAll();

        for (ProducerModel producerModel : producerModels) {
            try {
                this.registerProducerClient(producerModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering producer client for cluster: '%s', with error => '%s'."
                                        + " Proceeding with application startup and will retry to re-construct client when requested.",
                                producerModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterCreatedApplicationEvent(ClusterCreatedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());
        // Create Producer in DB
        ProducerModel producerModel = new ProducerModel(clusterModel, new HashMap<>());
        ProducerModel savedProducerModel = this.producerDao.save(producerModel);

        // Register Producer Client
        this.registerProducerClient(savedProducerModel);
    }

    @EventListener
    public void clusterImportedApplicationEvent(ClusterImportedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());
        // Create Producer in DB
        ProducerModel producerModel = new ProducerModel(clusterModel, new HashMap<>());
        this.producerDao.save(producerModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterEditedApplicationEvent(ClusterEditedApplicationEvent eventData) {
        ProducerModel model = this.producerDao.findByCode(eventData.getClusterCode());

        this.registerProducerClient(model);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void producerUpdatedApplicationEvent(ProducerUpdatedApplicationEvent eventData) {
        ProducerModel producerModel = this.producerDao.findByCode(eventData.getClusterCode());

        this.registerProducerClient(producerModel);
    }

    @EventListener
    public void producerAssignedApplicationEvent(ProducerAssignedApplicationEvent eventData) {
        String clusterCode = eventData.getClusterCode();
        try {
            this.clientsFactory.setCurrentProducerClient(clusterCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "Cluster with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getClusterCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            ProducerModel producerModel = this.producerDao.findByCode(clusterCode);

            this.registerProducerClient(producerModel);

            this.clientsFactory.setCurrentProducerClient(clusterCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void clusterDeletedApplicationEvent(ClusterDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterProducerClient(eventData.getClusterCode());
    }

    private void registerProducerClient(ProducerModel producerModel) {
        CommonSerializer keySerializer = null;
        CommonSerializer valueSerializer = null;
        if (!producerModel.getPerRequestKeySerializer()) {
            keySerializer =
                    this.producerSerializerDeterminer.determineKey(
                            EnumUtils.fromNameNotNull(CommonSerde.class, producerModel.getKeySerializer()),
                            producerModel.schemaRegistryCode(),
                            producerModel.keySerializerConfiguration());
        }
        if (!producerModel.getPerRequestValueSerializer()) {
            valueSerializer =
                    this.producerSerializerDeterminer.determineValue(
                            EnumUtils.fromNameNotNull(CommonSerde.class, producerModel.getValueSerializer()),
                            producerModel.schemaRegistryCode(),
                            producerModel.valueSerializerConfiguration());
        }

        // Register Producer Client
        this.clientsFactory.registerProducerClient(
                producerModel.getCode(),
                producerModel.schemaRegistryCode(),
                producerModel.getPerRequestKeySerializer(),
                keySerializer,
                producerModel.getPerRequestValueSerializer(),
                valueSerializer,
                producerModel.mergedConfiguration());
    }
}
