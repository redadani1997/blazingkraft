package com.redadani1997.blazingkraft.producer.serializer;

import com.google.protobuf.Message;
import com.google.protobuf.Struct;
import com.google.protobuf.util.JsonFormat;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonSerdeUtils;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.serializers.protobuf.KafkaProtobufSerializer;
import java.util.Map;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.header.Headers;

public class ProducerProtobufSchemaRegistrySerializer implements CommonSerializer {

    private final KafkaProtobufSerializer delegateSerializer;

    public ProducerProtobufSchemaRegistrySerializer(
            SchemaRegistryClient schemaRegistryClient, Map<String, Object> props, boolean isKey) {
        this.delegateSerializer = new KafkaProtobufSerializer(schemaRegistryClient);

        CommonSerdeUtils.configureSerializer(this.delegateSerializer, isKey, props);
    }

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        try {
            Struct.Builder structBuilder = Struct.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(data, structBuilder);
            Message message = structBuilder.build();
            return this.delegateSerializer.serialize(topic, headers, message);
        } catch (Exception ex) {
            Throwable throwable = ex instanceof SerializationException ? ex.getCause() : ex;
            throw new ProducerException(throwable);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.PROTOBUF_SCHEMA_REGISTRY;
    }
}
