package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterExportRequest;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterImportRequest;
import com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.model.ImportedClusterMetaApiResponse;
import com.redadani1997.blazingkraft.io.dto.out.export.IOExportZipResponse;

public interface ExportImportClusterService {

    IOExportZipResponse exportCluster(ClusterExportRequest request);

    ImportedClusterMetaApiResponse importCluster(ClusterImportRequest request);
}
