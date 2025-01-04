package com.redadani1997.blazingkraft.producer.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.client.decorator.WithProducerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ProducerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.BlazingProductionRequest;
import com.redadani1997.blazingkraft.producer.mapper.in.ProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.blazing_producer.BlazingProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.openapi.api.BlazingProducerApi;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiResponse;
import com.redadani1997.blazingkraft.producer.service.BlazingProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BlazingProducerController implements BlazingProducerApi {
    private final ProducerRequestMapper producerRequestMapper;
    private final BlazingProducerService blazingProducerService;

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ProducerActions.PRODUCE,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.LOW)
    @WithProducerClient
    @WithAuthorization(permission = ProducerActions.PRODUCE, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<BlazingProductionApiResponse> produceBlazingRecord(
            BlazingProductionApiRequest apiRequest) {
        BlazingProductionRequest request =
                this.simpleProducerRequestMapper().blazingProductionRequest(apiRequest);

        BlazingProductionApiResponse response = blazingProducerService.producerBlazingRecord(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private BlazingProducerRequestMapper simpleProducerRequestMapper() {
        return this.producerRequestMapper.simpleProducerRequestMapper();
    }
}
