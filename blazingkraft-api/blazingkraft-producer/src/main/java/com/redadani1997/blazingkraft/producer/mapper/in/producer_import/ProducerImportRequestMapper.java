package com.redadani1997.blazingkraft.producer.mapper.in.producer_import;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonReflectionUtils;
import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.ProducerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportImprovedRecordRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordsRequest;
import java.io.InputStream;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ProducerImportRequestMapper {
    private final ClientsFactory clientsFactory;
    private final AuditLogService auditLogService;

    public ProducerImportRecordsRequest producerImportRecordsRequest(
            MultipartFile jsonFile,
            Boolean failFast,
            Boolean async,
            String keySchema,
            String valueSchema,
            String keySerializerReq,
            String keySerializerConfiguration,
            String valueSerializerStr,
            String valueSerializerConfiguration) {

        CommonValidator.assertNotNull("Json File", jsonFile);
        CommonValidator.assertNotNull("Fail Fast", failFast);
        CommonValidator.assertNotNull("Async", async);

        if (failFast && async) {
            throw new ProducerException("Fail Fast and Async cannot both be true");
        }

        String fileName = jsonFile.getOriginalFilename();

        this.auditLogService.setSubject(fileName);

        if (fileName == null || !fileName.endsWith(".json")) {
            throw new ProducerException(String.format("File '%s' is not a JSON file", fileName));
        }

        CommonValidator.assertNotNull("Key Serializer", keySerializerReq);
        CommonValidator.assertNotNull("Value Serializer", valueSerializerStr);

        CommonSerde keySerializer = EnumUtils.fromName(CommonSerde.class, keySerializerReq);
        CommonSerde valueSerializer = EnumUtils.fromName(CommonSerde.class, valueSerializerStr);

        String schemaRegistryCode = this.currentProducerClient().schemaRegistryCode();
        Map<String, Object> keySerializerConfigurationMap = null;
        Map<String, Object> valueSerializerConfigurationMap = null;

        if (CommonSerde.isSchemaRegistrySerde(keySerializer)) {
            if (schemaRegistryCode == null) {
                throw new ConsumerException(
                        "Schema Registry is required when using Schema Registry Key Serializer");
            }
            keySerializerConfigurationMap = CommonTextUtils.stringToMap(keySerializerConfiguration);
            CommonValidator.assertNotNull("Key Serializer Configuration", keySerializerConfigurationMap);
        }
        if (CommonSerde.isSchemaRegistrySerde(valueSerializer)) {
            if (schemaRegistryCode == null) {
                throw new ConsumerException(
                        "Schema Registry is required when using Schema Registry Value Serializer");
            }
            valueSerializerConfigurationMap = CommonTextUtils.stringToMap(valueSerializerConfiguration);
            CommonValidator.assertNotNull(
                    "Value Serializer Configuration", valueSerializerConfigurationMap);
        }

        ProducerAdditionalConfigurationRequest producerAdditionalConfigurationRequest =
                ProducerAdditionalConfigurationRequest.builder()
                        .schemaRegistryCode(schemaRegistryCode)
                        .keySerializer(keySerializer)
                        .keySerializerConfiguration(keySerializerConfigurationMap)
                        .valueSerializer(valueSerializer)
                        .valueSerializerConfiguration(valueSerializerConfigurationMap)
                        .build();

        return ProducerImportRecordsRequest.builder()
                .keySchema(keySchema)
                .valueSchema(valueSchema)
                .producerAdditionalConfigurationRequest(producerAdditionalConfigurationRequest)
                .failFast(failFast)
                .async(async)
                .inputStream(getInputStream(jsonFile))
                .build();
    }

    public ProducerImportImprovedRecordRequest producerImportImprovedRecordRequest(
            ProducerImportRecordRequest record) {
        if (record == null) {
            throw new ProducerException("Record cannot be null");
        }
        if (record.getMetadata() == null) {
            throw new ProducerException("Record Metadata cannot be null");
        }
        if (record.getMetadata().get("topic") == null) {
            throw new ProducerException("Record Metadata Topic cannot be null");
        }
        if (record.getMetadata().get("partition") == null) {
            throw new ProducerException("Record Metadata Partition cannot be null");
        }

        String key =
                CommonReflectionUtils.isPrimitive(record.getKey())
                        ? record.getKey().toString()
                        : CommonCastingUtils.toJsonString(record.getKey());

        String value =
                CommonReflectionUtils.isPrimitive(record.getValue())
                        ? record.getValue().toString()
                        : CommonCastingUtils.toJsonString(record.getValue());

        return ProducerImportImprovedRecordRequest.builder()
                .key(key)
                .value(value)
                .headers(record.getHeaders())
                .topic(record.getMetadata().get("topic").toString())
                .partition(Integer.valueOf(record.getMetadata().get("partition").toString()))
                .build();
    }

    private InputStream getInputStream(MultipartFile jsonFile) {
        try {
            return jsonFile.getInputStream();
        } catch (Exception ex) {
            throw new ConsumerException(
                    String.format(
                            "Error when trying to get InputStream from MultipartFile, with Error => '%s'",
                            ex.getMessage()));
        }
    }

    private CommonProducerClient currentProducerClient() {
        return this.clientsFactory.currentProducerClient();
    }
}
