package com.redadani1997.blazingkraft.admin.mapper.in.export_import_cluster;

import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterExportRequest;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterImportRequest;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExportImportClusterRequestMapper {
    private final AuditLogService auditLogService;

    public ClusterExportRequest clusterExportRequest(String clusterCode) {
        this.handleSubject(clusterCode);

        CommonValidator.assertNotBlank("Code", clusterCode);

        return ClusterExportRequest.builder().code(clusterCode).build();
    }

    public ClusterImportRequest clusterImportRequest(MultipartFile zipFile) {
        CommonValidator.assertNotNull("Zip File", zipFile);

        return ClusterImportRequest.builder().zipFile(zipFile).build();
    }

    private void handleSubject(String code) {
        this.auditLogService.setSubject(code);
    }
}
