package com.redadani1997.blazingkraft.admin.dto.io.cluster;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProducerExportImportDto {

    private Boolean perRequestKeySerializer;
    private CommonSerde keySerializer;
    private Map<String, Object> keySerializerConfiguration;

    private Boolean perRequestValueSerializer;
    private CommonSerde valueSerializer;
    private Map<String, Object> valueSerializerConfiguration;

    private Map<String, Object> mainConfiguration;

    public static ProducerExportImportDto from(ProducerModel model) {
        ProducerExportImportDto producerExportImportDto = new ProducerExportImportDto();

        producerExportImportDto.setPerRequestKeySerializer(model.getPerRequestKeySerializer());
        producerExportImportDto.setKeySerializer(
                EnumUtils.fromName(CommonSerde.class, model.getKeySerializer()));
        producerExportImportDto.setKeySerializerConfiguration(model.keySerializerConfiguration());
        producerExportImportDto.setPerRequestValueSerializer(model.getPerRequestValueSerializer());
        producerExportImportDto.setValueSerializer(
                EnumUtils.fromName(CommonSerde.class, model.getValueSerializer()));
        producerExportImportDto.setValueSerializerConfiguration(model.valueSerializerConfiguration());
        producerExportImportDto.setMainConfiguration(model.mainConfiguration());

        return producerExportImportDto;
    }
}
