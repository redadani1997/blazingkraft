package com.redadani1997.blazingkraft.schemaregistry.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryAssignedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
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
public class SchemaRegistryApplicationListener {
    private final SchemaRegistryDao schemaRegistryDao;
    private final ClientsFactory clientsFactory;

    @EventListener
    @Order(0)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        List<SchemaRegistryModel> schemaRegistryModels = this.schemaRegistryDao.findAll();

        for (SchemaRegistryModel schemaRegistryModel : schemaRegistryModels) {
            try {
                this.registerSchemaRegistryClient(schemaRegistryModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering Schema Registry client for Schema Registry: '%s', with error => '%s'."
                                        + " Proceeding with application startup and will retry to re-construct client when requested.",
                                schemaRegistryModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void schemaRegistryCreatedApplicationEvent(
            SchemaRegistryCreatedApplicationEvent eventData) {
        SchemaRegistryModel schemaRegistryModel =
                this.schemaRegistryDao.findByCode(eventData.getSchemaRegistryCode());

        this.registerSchemaRegistryClient(schemaRegistryModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void schemaRegistryEditedApplicationEvent(SchemaRegistryEditedApplicationEvent eventData) {
        SchemaRegistryModel schemaRegistryModel =
                this.schemaRegistryDao.findByCode(eventData.getSchemaRegistryCode());

        this.registerSchemaRegistryClient(schemaRegistryModel);
    }

    @EventListener
    public void schemaRegistryAssignedApplicationEvent(
            SchemaRegistryAssignedApplicationEvent eventData) {
        String schemaRegistryCode = eventData.getSchemaRegistryCode();
        try {
            this.clientsFactory.setCurrentSchemaRegistryClient(schemaRegistryCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "Schema Registry with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getSchemaRegistryCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            SchemaRegistryModel schemaRegistryModel =
                    this.schemaRegistryDao.findByCode(schemaRegistryCode);

            this.registerSchemaRegistryClient(schemaRegistryModel);

            this.clientsFactory.setCurrentSchemaRegistryClient(schemaRegistryCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void schemaRegistryDeletedApplicationEvent(
            SchemaRegistryDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterSchemaRegistryClient(eventData.getSchemaRegistryCode());
    }

    private void registerSchemaRegistryClient(SchemaRegistryModel schemaRegistryModel) {
        this.clientsFactory.registerSchemaRegistryClient(
                schemaRegistryModel.getCode(),
                schemaRegistryModel.getSchemaRegistryUrls(),
                schemaRegistryModel.getSchemasCacheSize(),
                schemaRegistryModel.mainConfiguration(),
                schemaRegistryModel.getJmxEnabled(),
                schemaRegistryModel.getJmxUrl(),
                schemaRegistryModel.jmxEnvironment());
    }
}
