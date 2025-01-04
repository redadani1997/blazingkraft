package com.redadani1997.blazingkraft.consumer.mapper.in.blazing_consumer;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.authorization.service.impl.CommonAuthorizationService;
import com.redadani1997.blazingkraft.cleanup.service.CleanUpService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.actions.cluster.ConsumerActions;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.BlazingConsumptionRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BlazingConsumerRequestMapper {
    private final ClientsFactory clientsFactory;
    private final CommonAuthorizationService commonAuthorizationService;
    private final CleanUpService cleanUpService;
    private final AuditLogService auditLogService;
    private final CurrentUserFacade currentUserFacade;

    public BlazingConsumptionRequest blazingConsumptionRequest(
            String requestBody, CurrentUser currentUser) {
        this.cleanUpService.cleanUp();

        this.auditLogService.setEntityType(EntityType.CLUSTER);

        this.currentUserFacade.setCurrentWSUser(currentUser);

        BlazingConsumptionRequest request =
                CommonCastingUtils.cast(requestBody, BlazingConsumptionRequest.class);

        CommonValidator.assertNotNull("The request", request);
        CommonValidator.assertNotNull("clusterCode", request.getClusterCode());

        this.handleClientAndEntity(request);

        CommonValidator.assertNotEmpty("topics", request.getTopics());
        CommonValidator.assertNotNull("topics", request.getTopics());

        this.commonAuthorizationService.authorize(
                currentUser,
                ConsumerActions.CONSUME,
                com.redadani1997.blazingkraft.common.enums.EntityType.CLUSTER);

        ConsumerAdditionalConfigurationRequest additionalConfigurationRequest =
                request.getConsumerAdditionalConfigurationRequest();

        if (additionalConfigurationRequest != null) {
            String schemaRegistryCode = this.currentConsumerClient().schemaRegistryCode();
            additionalConfigurationRequest.setSchemaRegistryCode(schemaRegistryCode);
            CommonSerde keyDeserializer = additionalConfigurationRequest.getKeyDeserializer();
            CommonSerde valueDeserializer = additionalConfigurationRequest.getKeyDeserializer();

            if (CommonSerde.isSchemaRegistrySerde(keyDeserializer)) {
                if (CommonSerde.isSchemaRegistrySerde(valueDeserializer)) {
                    CommonValidator.assertNotNull(
                            "Key Deserializer Configuration",
                            additionalConfigurationRequest.getKeyDeserializerConfiguration());
                    if (schemaRegistryCode == null) {
                        throw new ConsumerException(
                                "Schema Registry is required when using Schema Registry Key Deserializer");
                    }
                }
            }
            if (CommonSerde.isSchemaRegistrySerde(valueDeserializer)) {
                CommonValidator.assertNotNull(
                        "Value Deserializer Configuration",
                        additionalConfigurationRequest.getValueDeserializerConfiguration());
                if (schemaRegistryCode == null) {
                    throw new ConsumerException(
                            "Schema Registry is required when using Schema Registry Value Deserializer");
                }
            }
        }
        ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest =
                request.getConsumerAdditionalFiltersRequest();
        CommonValidator.assertNotNull(
                "consumerAdditionalFiltersRequest", consumerAdditionalFiltersRequest);
        CommonValidator.assertNotNull("Time Filter", consumerAdditionalFiltersRequest.getTimeFilter());
        CommonValidator.assertNotNull(
                "Offset Filter", consumerAdditionalFiltersRequest.getOffsetFilter());
        CommonValidator.assertNotNull(
                "Partition Filter", consumerAdditionalFiltersRequest.getPartitionFilter());
        CommonValidator.assertNotNull(
                "Javascript Filter", consumerAdditionalFiltersRequest.getJavascriptFilter());
        CommonValidator.assertNotNull(
                "Text Search Filter", consumerAdditionalFiltersRequest.getTextSearchFilter());

        CommonValidator.assertNotNull(
                "Javascript Filter Code", consumerAdditionalFiltersRequest.getJavascriptFilter().getCode());
        CommonValidator.assertNotNull(
                "Javascript Filter Disabled",
                consumerAdditionalFiltersRequest.getJavascriptFilter().getDisabled());

        if (request.getResultsSize() == null
                || request.getResultsSize() < -1
                || request.getResultsSize() > 1000) {
            request.setResultsSize(300);
        }

        this.handleSubject(request);

        return request;
    }

    private void handleClientAndEntity(BlazingConsumptionRequest request) {
        CurrentCode currentCode = new CurrentCode(request.getClusterCode(), EntityType.CLUSTER);
        this.clientsFactory.setCurrentCode(currentCode);
        this.auditLogService.setEntity(request.getClusterCode());
        this.clientsFactory.setCurrentConsumerClient(request.getClusterCode());
    }

    private void handleSubject(BlazingConsumptionRequest request) {
        this.auditLogService.setSubject(String.join(" ", request.getTopics()));
    }

    private CommonConsumerClient currentConsumerClient() {
        return this.clientsFactory.currentConsumerClient();
    }
}
