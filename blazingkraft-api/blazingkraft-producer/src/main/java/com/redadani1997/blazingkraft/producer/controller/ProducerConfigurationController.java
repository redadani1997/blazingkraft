package com.redadani1997.blazingkraft.producer.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.client.decorator.WithProducerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ProducerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.producer.dto.in.producer_configuration.ProducerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.producer.mapper.in.ProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.producer_configuration.ProducerConfigurationRequestMapper;
import com.redadani1997.blazingkraft.producer.openapi.api.ProducerConfigurationApi;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationUpdateApiRequest;
import com.redadani1997.blazingkraft.producer.service.ProducerConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProducerConfigurationController implements ProducerConfigurationApi {
    private final ProducerConfigurationService producerConfigurationService;
    private final ProducerRequestMapper producerRequestMapper;

    @WithCleanUp
    @WithClusterCode
    @WithProducerClient
    @WithAuthorization(
            permission = ProducerActions.DESCRIBE_PRODUCER_CONFIGURATION,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ProducerCompleteConfigurationApiResponse>
            getProducerCompleteConfiguration() {
        ProducerCompleteConfigurationApiResponse response =
                this.producerConfigurationService.getProducerCompleteConfiguration();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithProducerClient
    @WithAuthorization(permission = ProducerActions.PRODUCE, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ProducerConfigurationApiResponse> getProducerConfiguration() {
        ProducerConfigurationApiResponse response =
                this.producerConfigurationService.getProducerConfiguration();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ProducerActions.EDIT_PRODUCER_CONFIGURATION,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.MEDIUM)
    @WithProducerClient
    @WithAuthorization(
            permission = ProducerActions.EDIT_PRODUCER_CONFIGURATION,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ProducerConfigurationApiResponse> updateProducerConfiguration(
            ProducerConfigurationUpdateApiRequest producerConfigurationUpdateApiRequest) {
        ProducerConfigurationUpdateRequest request =
                this.producerConfigurationRequestMapper()
                        .producerConfigurationUpdateRequest(producerConfigurationUpdateApiRequest);

        ProducerConfigurationApiResponse response =
                this.producerConfigurationService.updateProducerConfiguration(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private ProducerConfigurationRequestMapper producerConfigurationRequestMapper() {
        return this.producerRequestMapper.producerConfigurationRequestMapper();
    }
}
