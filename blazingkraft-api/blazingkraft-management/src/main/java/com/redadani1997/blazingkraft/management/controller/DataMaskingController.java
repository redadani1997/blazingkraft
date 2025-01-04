package com.redadani1997.blazingkraft.management.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.DataMaskingActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.management.data_masking.openapi.api.DataMaskingApi;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingApiResponse;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingCreateApiRequest;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingEditApiRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingEditRequest;
import com.redadani1997.blazingkraft.management.mapper.in.ManagementRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.data_masking.DataMaskingRequestMapper;
import com.redadani1997.blazingkraft.management.service.DataMaskingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DataMaskingController implements DataMaskingApi {
    private final DataMaskingService service;
    private final ManagementRequestMapper managementRequestMapper;

    @WithCleanUp
    @WithAudit(
            action = DataMaskingActions.CREATE_DATA_MASKING,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = DataMaskingActions.CREATE_DATA_MASKING,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<DataMaskingApiResponse> createDataMasking(
            DataMaskingCreateApiRequest apiRequest) {
        DataMaskingCreateRequest request = this.requestMapper().dataMaskingCreateRequest(apiRequest);

        DataMaskingApiResponse response = this.service.createDataMasking(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = DataMaskingActions.DELETE_DATA_MASKING,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = DataMaskingActions.DELETE_DATA_MASKING,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteDataMasking(String code) {
        DataMaskingDeleteRequest request = this.requestMapper().dataMaskingDeleteRequest(code);

        this.service.deleteDataMasking(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAudit(
            action = DataMaskingActions.EDIT_DATA_MASKING,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = DataMaskingActions.EDIT_DATA_MASKING,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<DataMaskingApiResponse> editDataMasking(
            String code, DataMaskingEditApiRequest apiRequest) {
        DataMaskingEditRequest request = this.requestMapper().dataMaskingEditRequest(code, apiRequest);

        DataMaskingApiResponse response = this.service.editDataMasking(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = DataMaskingActions.DESCRIBE_DATA_MASKINGS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<DataMaskingApiResponse>> getAllDataMaskings() {
        List<DataMaskingApiResponse> responses = this.service.getAllDataMaskings();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    private DataMaskingRequestMapper requestMapper() {
        return this.managementRequestMapper.dataMaskingRequestMapper();
    }
}
