package com.redadani1997.blazingkraft.admin.dto.io.cluster;

import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClusterExportImportDto {

    private String name;

    private String code;

    private String color;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private Map<String, Object> jmxEnvironment;

    private Map<String, Object> commonConfiguration;

    private String schemaRegistryCode;

    public static ClusterExportImportDto from(ClusterModel model) {
        ClusterExportImportDto clusterExportImportDto = new ClusterExportImportDto();

        clusterExportImportDto.setName(model.getName());
        clusterExportImportDto.setCode(model.getCode());
        clusterExportImportDto.setColor(model.getColor());
        clusterExportImportDto.setJmxEnabled(model.getJmxEnabled());
        clusterExportImportDto.setJmxUrl(model.getJmxUrl());
        clusterExportImportDto.setJmxEnvironment(model.jmxEnvironment());
        clusterExportImportDto.setCommonConfiguration(model.commonConfiguration());
        clusterExportImportDto.setSchemaRegistryCode(model.schemaRegistryCode());

        return clusterExportImportDto;
    }
}
