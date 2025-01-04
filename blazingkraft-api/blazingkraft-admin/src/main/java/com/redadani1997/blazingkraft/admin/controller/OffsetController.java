package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetsListRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.offset.OffsetRequestMapper;
import com.redadani1997.blazingkraft.admin.offset.openapi.api.OffsetApi;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.*;
import com.redadani1997.blazingkraft.admin.service.OffsetService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.OffsetActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OffsetController implements OffsetApi {
    private final AdminRequestMapper adminRequestMapper;
    private final OffsetService offsetService;

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = OffsetActions.ALTER_CONSUMER_GROUP_OFFSETS,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.MEDIUM)
    @WithClusterClient
    @WithAuthorization(
            permission = OffsetActions.ALTER_CONSUMER_GROUP_OFFSETS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> alterConsumerGroupOffsets(
            OffsetConsumerGroupAlterApiRequest apiRequest) {
        OffsetConsumerGroupAlterRequest request =
                this.offsetRequestMapper().offsetConsumerGroupAlterRequest(apiRequest);

        this.offsetService.alterConsumerGroupOffsets(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = OffsetActions.CLEAR_CONSUMER_GROUP_OFFSETS,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = OffsetActions.CLEAR_CONSUMER_GROUP_OFFSETS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> deleteConsumerGroupOffsets(
            String consumerGroup, DeleteConsumerGroupOffsetsApiRequest apiRequest) {

        OffsetConsumerGroupDeleteRequest request =
                this.offsetRequestMapper().offsetConsumerGroupDeleteRequest(apiRequest, consumerGroup);

        this.offsetService.deleteConsumerGroupOffsets(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = OffsetActions.LIST_CONSUMER_GROUP_OFFSETS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<OffsetApiResponse>> listConsumerGroupOffsets(String consumerGroup) {
        List<OffsetApiResponse> responses = this.offsetService.listConsumerGroupOffsets(consumerGroup);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = OffsetActions.LIST_TOPIC_PARTITION_OFFSETS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<OffsetInfoApiResponse>> listTopicPartitionsOffsets(
            OffsetTopicPartitionsListApiRequest apiRequest) {

        OffsetsListRequest request = this.offsetRequestMapper().offsetsListRequest(apiRequest);

        List<OffsetInfoApiResponse> responses = this.offsetService.listTopicPartitionsOffsets(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    private OffsetRequestMapper offsetRequestMapper() {
        return this.adminRequestMapper.offsetRequestMapper();
    }
}
