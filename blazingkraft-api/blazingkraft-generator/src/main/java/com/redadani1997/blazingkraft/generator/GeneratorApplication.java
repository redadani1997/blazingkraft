package com.redadani1997.blazingkraft.generator;

import com.redadani1997.blazingkraft.generator.creators.*;
import java.io.IOException;

public class GeneratorApplication {

    public static String adminConfigurationUrlPrefix =
            "https://kafka.apache.org/documentation/#adminclientconfigs_";
    public static String producerConfigurationUrlPrefix =
            "https://kafka.apache.org/documentation/#producerconfigs_";
    public static String consumerConfigurationUrlPrefix =
            "https://kafka.apache.org/documentation/#consumerconfigs_";
    public static String topicConfigurationUrlPrefix =
            "https://kafka.apache.org/documentation/#topicconfigs_";
    public static String schemaRegistryConfigurationUrl =
            "https://docs.confluent.io/platform/current/schema-registry/installation/config.html#";
    public static String kafkaConnectSourceConfigurationUrlPrefix =
            "https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#";

    public static String kafkaConnectSinkConfigurationUrlPrefix =
            "https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#";

    public static void main(String[] args) throws IOException {
        AdminConfigurationCreator.main(args);
        ConsumerConfigurationCreator.main(args);
        ProducerConfigurationCreator.main(args);
        TopicConfigurationCreator.main(args);
        SchemaRegistryConfigurationCreator.main(args);
        AvroSchemaRegistrySerializerConfigurationCreator.main(args);
        AvroSchemaRegistryDeserializerConfigurationCreator.main(args);
        JsonSchemaRegistrySerializerConfigurationCreator.main(args);
        JsonSchemaRegistryDeserializerConfigurationCreator.main(args);
        ProtobufSchemaRegistrySerializerConfigurationCreator.main(args);
        ProtobufSchemaRegistryDeserializerConfigurationCreator.main(args);
        KafkaConnectSourceConfigurationCreator.main(args);
        KafkaConnectSinkConfigurationCreator.main(args);
    }
}
