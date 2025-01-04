package com.redadani1997.blazingkraft.admin.dto.io.cluster;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConsumerExportImportDto {

    private Long pollTimeoutMs;

    private Boolean perRequestKeyDeserializer;
    private CommonSerde keyDeserializer;
    private Map<String, Object> keyDeserializerConfiguration;

    private Boolean perRequestValueDeserializer;
    private CommonSerde valueDeserializer;
    private Map<String, Object> valueDeserializerConfiguration;

    private Map<String, Object> mainConfiguration;

    public static ConsumerExportImportDto from(ConsumerModel model) {
        ConsumerExportImportDto consumerExportImportDto = new ConsumerExportImportDto();

        consumerExportImportDto.setPollTimeoutMs(model.getPollTimeoutMs());
        consumerExportImportDto.setPerRequestKeyDeserializer(model.getPerRequestKeyDeserializer());
        consumerExportImportDto.setKeyDeserializer(
                EnumUtils.fromName(CommonSerde.class, model.getKeyDeserializer()));
        consumerExportImportDto.setKeyDeserializerConfiguration(model.keyDeserializerConfiguration());
        consumerExportImportDto.setPerRequestValueDeserializer(model.getPerRequestValueDeserializer());
        consumerExportImportDto.setValueDeserializer(
                EnumUtils.fromName(CommonSerde.class, model.getValueDeserializer()));
        consumerExportImportDto.setValueDeserializerConfiguration(
                model.valueDeserializerConfiguration());
        consumerExportImportDto.setMainConfiguration(model.mainConfiguration());

        return consumerExportImportDto;
    }
}
