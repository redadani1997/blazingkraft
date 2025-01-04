package com.redadani1997.blazingkraft.ksqldb.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbAssignedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.KsqlDbDao;
import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.ksqldb.service.impl.KsqlDbStreamQueryHandlerServiceImpl;
import com.redadani1997.blazingkraft.ws.repository.CommonWebSocketHandlerRepository;
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
public class KsqlDbApplicationListener {
    private final ClientsFactory clientsFactory;
    private final KsqlDbDao ksqlDbDao;
    private final CommonWebSocketHandlerRepository commonWebSocketHandlerRepository;

    @EventListener
    @Order(0)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        // Register ws handler
        try {
            this.commonWebSocketHandlerRepository.register(
                    "/queue/ksqldb", KsqlDbStreamQueryHandlerServiceImpl.class);
        } catch (Exception ex) {
            String errorMessage =
                    String.format(
                            "Error while registering ksql stream query websocket handler with error => '%s'.",
                            ex.getMessage());
            log.error(CommonLogUtils.getError(errorMessage), ex);
        }

        // Register clients
        List<KsqlDbModel> ksqlDbModels = this.ksqlDbDao.findAll();

        for (KsqlDbModel ksqlDbModel : ksqlDbModels) {
            try {
                this.registerKsqlDbClient(ksqlDbModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering KsqlDb client for KsqlDb: '%s', with error => '%s'."
                                        + " Proceeding with application startup and will retry to re-construct client when requested.",
                                ksqlDbModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void ksqlDbCreatedApplicationEvent(KsqlDbCreatedApplicationEvent eventData) {
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(eventData.getKsqlDbCode());

        this.registerKsqlDbClient(ksqlDbModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void ksqlDbEditedApplicationEvent(KsqlDbEditedApplicationEvent eventData) {
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(eventData.getKsqlDbCode());

        this.registerKsqlDbClient(ksqlDbModel);
    }

    @EventListener
    public void ksqlDbAssignedApplicationEvent(KsqlDbAssignedApplicationEvent eventData) {
        String ksqlDbCode = eventData.getKsqlDbCode();
        try {
            this.clientsFactory.setCurrentKsqlDbClient(ksqlDbCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "KsqlDb with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getKsqlDbCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(ksqlDbCode);

            this.registerKsqlDbClient(ksqlDbModel);

            this.clientsFactory.setCurrentKsqlDbClient(ksqlDbCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void ksqlDbDeletedApplicationEvent(KsqlDbDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterKsqlDbClient(eventData.getKsqlDbCode());
    }

    private void registerKsqlDbClient(KsqlDbModel ksqlDbModel) {
        this.clientsFactory.registerKsqlDbClient(
                ksqlDbModel.getCode(),
                ksqlDbModel.getHost(),
                ksqlDbModel.getPort(),
                ksqlDbModel.getBasicAuthEnabled(),
                ksqlDbModel.getBasicAuthUsername(),
                ksqlDbModel.getBasicAuthPassword(),
                ksqlDbModel.getKeyStoreEnabled(),
                ksqlDbModel.getKeyStore(),
                ksqlDbModel.getKeyStorePassword(),
                ksqlDbModel.getTrustStoreEnabled(),
                ksqlDbModel.getTrustStore(),
                ksqlDbModel.getTrustStorePassword(),
                ksqlDbModel.getUseTls(),
                ksqlDbModel.getVerifyHost(),
                ksqlDbModel.getUseAlpn(),
                ksqlDbModel.getExecuteQueryMaxResultRows(),
                ksqlDbModel.getJmxEnabled(),
                ksqlDbModel.getJmxUrl(),
                ksqlDbModel.jmxEnvironment());
    }
}
