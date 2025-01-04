package com.redadani1997.blazingkraft.admin.mapper.out.export_import_cluster.cluster;

import com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.model.ImportedClusterMetaApiResponse;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import org.springframework.stereotype.Component;

@Component
public class ExportImportClusterResponseMapper {

    public ImportedClusterMetaApiResponse importedClusterMetaApiResponse(ClusterModel clusterModel) {
        if (clusterModel == null) {
            return null;
        }
        ImportedClusterMetaApiResponse response = new ImportedClusterMetaApiResponse();
        response.setCode(clusterModel.getCode());
        response.setName(clusterModel.getName());
        response.setColor(clusterModel.getColor());
        response.setSchemaRegistryCode(clusterModel.schemaRegistryCode());
        response.setSchemaRegistryName(clusterModel.schemaRegistryName());
        response.setJmxEnabled(clusterModel.getJmxEnabled());

        return response;
    }
}
