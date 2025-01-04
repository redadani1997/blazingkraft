package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonSerdeUtils;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.serializers.json.KafkaJsonSchemaSerializer;
import java.util.Map;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.header.Headers;

public class ProducerJsonSchemaRegistrySerializer implements CommonSerializer {

    private final KafkaJsonSchemaSerializer delegateSerializer;

    public ProducerJsonSchemaRegistrySerializer(
            SchemaRegistryClient schemaRegistryClient, Map<String, Object> props, boolean isKey) {
        this.delegateSerializer = new KafkaJsonSchemaSerializer(schemaRegistryClient);

        CommonSerdeUtils.configureSerializer(this.delegateSerializer, isKey, props);
    }

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        Object dataObject = data;
        try {
            dataObject = CommonCastingUtils.cast(data, Map.class);
        } catch (Exception ex) {
            // Ignore if not a json object or array (i.e. a primitive)
        }
        try {
            return this.delegateSerializer.serialize(topic, headers, dataObject);
        } catch (Exception ex) {
            Throwable throwable = ex instanceof SerializationException ? ex.getCause() : ex;
            throw new ProducerException(throwable);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON_SCHEMA_REGISTRY;
    }
}
