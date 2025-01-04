package com.redadani1997.blazingkraft.producer.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.client.decorator.WithProducerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ProducerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordsRequest;
import com.redadani1997.blazingkraft.producer.mapper.in.ProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.producer_import.ProducerImportRequestMapper;
import com.redadani1997.blazingkraft.producer.openapi.api.ProducerImportRecordsApi;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionMetadataOrErrorApiResponse;
import com.redadani1997.blazingkraft.producer.service.ProducerImportService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ProducerImportRecordsController implements ProducerImportRecordsApi {
    private final ProducerImportService service;
    private final ProducerRequestMapper producerRequestMapper;

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ProducerActions.PRODUCE,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.LOW)
    @WithProducerClient
    @WithAuthorization(permission = ProducerActions.PRODUCE, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<BlazingProductionMetadataOrErrorApiResponse>> importProducerRecords(
            MultipartFile jsonFile,
            Boolean failFast,
            Boolean async,
            String keySchema,
            String valueSchema,
            String keySerializer,
            String keySerializerConfiguration,
            String valueSerializer,
            String valueSerializerConfiguration) {

        ProducerImportRecordsRequest request =
                this.producerImportRequestMapper()
                        .producerImportRecordsRequest(
                                jsonFile,
                                failFast,
                                async,
                                keySchema,
                                valueSchema,
                                keySerializer,
                                keySerializerConfiguration,
                                valueSerializer,
                                valueSerializerConfiguration);

        List<BlazingProductionMetadataOrErrorApiResponse> responses =
                this.service.importProducerRecords(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(responses);
    }

    private ProducerImportRequestMapper producerImportRequestMapper() {
        return this.producerRequestMapper.producerImportRequestMapper();
    }
}
