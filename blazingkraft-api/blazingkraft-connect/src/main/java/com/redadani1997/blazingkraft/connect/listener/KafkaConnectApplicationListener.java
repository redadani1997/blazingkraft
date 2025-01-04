package com.redadani1997.blazingkraft.connect.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectAssignedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.KafkaConnectDao;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
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
public class KafkaConnectApplicationListener {
    private final ClientsFactory clientsFactory;
    private final KafkaConnectDao kafkaConnectDao;

    @EventListener
    @Order(0)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        List<KafkaConnectModel> kafkaConnectModels = this.kafkaConnectDao.findAll();

        for (KafkaConnectModel kafkaConnectModel : kafkaConnectModels) {
            try {
                this.registerKafkaConnectClient(kafkaConnectModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering Kafka Connect client for Kafka Connect: '%s', with error => '%s'."
                                        + " Proceeding with application startup and will retry to re-construct client when requested.",
                                kafkaConnectModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void kafkaConnectCreatedApplicationEvent(KafkaConnectCreatedApplicationEvent eventData) {
        KafkaConnectModel kafkaConnectModel =
                this.kafkaConnectDao.findByCode(eventData.getKafkaConnectCode());

        this.registerKafkaConnectClient(kafkaConnectModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void kafkaConnectEditedApplicationEvent(KafkaConnectEditedApplicationEvent eventData) {
        KafkaConnectModel kafkaConnectModel =
                this.kafkaConnectDao.findByCode(eventData.getKafkaConnectCode());

        this.registerKafkaConnectClient(kafkaConnectModel);
    }

    @EventListener
    public void kafkaConnectAssignedApplicationEvent(KafkaConnectAssignedApplicationEvent eventData) {
        String kafkaConnectCode = eventData.getKafkaConnectCode();
        try {
            this.clientsFactory.setCurrentKafkaConnectClient(kafkaConnectCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "Kafka Connect with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getKafkaConnectCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            KafkaConnectModel kafkaConnectModel = this.kafkaConnectDao.findByCode(kafkaConnectCode);

            this.registerKafkaConnectClient(kafkaConnectModel);

            this.clientsFactory.setCurrentKafkaConnectClient(kafkaConnectCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void kafkaConnectDeletedApplicationEvent(KafkaConnectDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterKafkaConnectClient(eventData.getKafkaConnectCode());
    }

    private void registerKafkaConnectClient(KafkaConnectModel kafkaConnectModel) {
        this.clientsFactory.registerKafkaConnectClient(
                kafkaConnectModel.getCode(),
                kafkaConnectModel.getUrl(),
                kafkaConnectModel.getBasicAuthEnabled(),
                kafkaConnectModel.getBasicAuthUsername(),
                kafkaConnectModel.getBasicAuthPassword(),
                kafkaConnectModel.getJmxEnabled(),
                kafkaConnectModel.getJmxUrl(),
                kafkaConnectModel.jmxEnvironment());
    }
}
