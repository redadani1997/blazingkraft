package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterExportRequest;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterImportRequest;
import com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.api.ExportImportClusterApi;
import com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.model.ImportedClusterMetaApiResponse;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.export_import_cluster.ExportImportClusterRequestMapper;
import com.redadani1997.blazingkraft.admin.service.ExportImportClusterService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.ManagementClusterActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.io.dto.out.export.IOExportZipResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ExportImportClusterController implements ExportImportClusterApi {

    private final AdminRequestMapper adminRequestMapper;
    private final ExportImportClusterService exportImportClusterService;

    @WithCleanUp
    @WithAudit(
            action = ManagementClusterActions.MANAGEMENT_EXPORT_CLUSTER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_EXPORT_CLUSTER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<byte[]> exportCluster(String clusterCode) {
        ClusterExportRequest request =
                this.exportImportClusterRequestMapper().clusterExportRequest(clusterCode);

        IOExportZipResponse response = this.exportImportClusterService.exportCluster(request);

        byte[] bytes = response.getBytes();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment;filename=" + response.getFileName())
                .header("Content-Type", "application/octet-stream")
                .contentLength(bytes.length)
                .body(bytes);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementClusterActions.MANAGEMENT_IMPORT_CLUSTER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_IMPORT_CLUSTER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ImportedClusterMetaApiResponse> importCluster(MultipartFile file) {
        ClusterImportRequest request =
                this.exportImportClusterRequestMapper().clusterImportRequest(file);

        ImportedClusterMetaApiResponse response =
                this.exportImportClusterService.importCluster(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private ExportImportClusterRequestMapper exportImportClusterRequestMapper() {
        return this.adminRequestMapper.exportImportClusterRequestMapper();
    }
}
