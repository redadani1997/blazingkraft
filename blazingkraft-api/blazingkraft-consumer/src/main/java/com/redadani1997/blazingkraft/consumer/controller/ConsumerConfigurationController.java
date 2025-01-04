package com.redadani1997.blazingkraft.consumer.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.client.decorator.WithConsumerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ConsumerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_configuration.ConsumerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.consumer.mapper.in.ConsumerRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.in.consumer_configuration.ConsumerConfigurationRequestMapper;
import com.redadani1997.blazingkraft.consumer.openapi.api.ConsumerConfigurationApi;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationUpdateApiRequest;
import com.redadani1997.blazingkraft.consumer.service.ConsumerConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsumerConfigurationController implements ConsumerConfigurationApi {
    private final ConsumerConfigurationService consumerConfigurationService;
    private final ConsumerRequestMapper consumerRequestMapper;

    @WithCleanUp
    @WithClusterCode
    @WithConsumerClient
    @WithAuthorization(
            permission = ConsumerActions.DESCRIBE_CONSUMER_CONFIGURATION,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ConsumerCompleteConfigurationApiResponse>
            getConsumerCompleteConfiguration() {
        ConsumerCompleteConfigurationApiResponse response =
                this.consumerConfigurationService.getConsumerCompleteConfiguration();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithConsumerClient
    @WithAuthorization(permission = ConsumerActions.CONSUME, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ConsumerConfigurationApiResponse> getConsumerConfiguration() {
        ConsumerConfigurationApiResponse response =
                this.consumerConfigurationService.getConsumerConfiguration();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ConsumerActions.EDIT_CONSUMER_CONFIGURATION,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.MEDIUM)
    @WithConsumerClient
    @WithAuthorization(
            permission = ConsumerActions.EDIT_CONSUMER_CONFIGURATION,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ConsumerConfigurationApiResponse> updateConsumerConfiguration(
            ConsumerConfigurationUpdateApiRequest apiRequest) {
        ConsumerConfigurationUpdateRequest request =
                this.consumerConfigurationRequestMapper().consumerConfigurationUpdateRequest(apiRequest);

        ConsumerConfigurationApiResponse response =
                this.consumerConfigurationService.updateConsumerConfiguration(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private ConsumerConfigurationRequestMapper consumerConfigurationRequestMapper() {
        return this.consumerRequestMapper.consumerConfigurationRequestMapper();
    }
}
