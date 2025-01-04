package com.redadani1997.blazingkraft.client.factory;

import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import io.confluent.kafka.schemaregistry.client.rest.RestService;
import io.confluent.ksql.api.client.Client;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.kafka.clients.admin.Admin;
import org.apache.kafka.clients.consumer.Consumer;

public interface ClientsFactory {
    // CURRENT CODE
    CurrentCode currentCode();

    void setCurrentCode(CurrentCode currentCode);

    // GET CLIENTS
    ConcurrentHashMap<String, CommonSchemaRegistryClient> getSchemaRegistries();

    // GET CURRENT CLIENTS
    CommonAdminClient currentAdminClient();

    CommonProducerClient currentProducerClient();

    CommonConsumerClient currentConsumerClient();

    CommonSchemaRegistryClient currentSchemaRegistryClient();

    RestService currentSchemaRegistryRestService();

    CommonKafkaConnectClient currentKafkaConnectClient();

    CommonKsqlDbClient currentKsqlDbClient();

    // SET CURRENT CLIENTS
    void setCurrentAdminClient(String clusterCode);

    void setCurrentProducerClient(String clusterCode);

    void setCurrentConsumerClient(String clusterCode);

    void setCurrentSchemaRegistryClient(String schemaRegistryCode);

    void setCurrentKafkaConnectClient(String kafkaConnectCode);

    void setCurrentKsqlDbClient(String ksqlDbCode);

    // REGISTER CLIENTS
    void registerAdminClient(
            String clusterCode,
            Map<String, Object> configuration,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment);

    void registerProducerClient(
            String clusterCode,
            String schemaRegistryCode,
            Boolean perRequestKeySerializer,
            CommonSerializer keySerializer,
            Boolean perRequestValueSerializer,
            CommonSerializer valueSerializer,
            Map<String, Object> configuration);

    void registerConsumerClient(
            String clusterCode,
            String schemaRegistryCode,
            Boolean perRequestKeyDeserializer,
            CommonDeserializer keyDeserializer,
            Boolean perRequestValueDeserializer,
            CommonDeserializer valueDeserializer,
            Map<String, Object> configuration,
            Long pollTimeoutMs);

    void registerSchemaRegistryClient(
            String schemaRegistryCode,
            String schemaRegistryUrls,
            Integer schemasCacheSize,
            Map<String, Object> configuration,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment);

    void registerKafkaConnectClient(
            String kafkaConnectCode,
            String url,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment);

    void registerKsqlDbClient(
            String ksqlDbCode,
            String host,
            Integer port,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            Boolean keyStoreEnabled,
            String keyStore,
            String keyStorePassword,
            Boolean trustStoreEnabled,
            String trustStore,
            String trustStorePassword,
            Boolean useTls,
            Boolean verifyHost,
            Boolean useAlpn,
            Integer executeQueryMaxResultRows,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment);

    // UNREGISTER CLIENTS
    void unregisterAdminClient(String clusterCode);

    void unregisterProducerClient(String clusterCode);

    void unregisterConsumerClient(String clusterCode);

    void unregisterSchemaRegistryClient(String schemaRegistryCode);

    void unregisterKafkaConnectClient(String kafkaConnectCode);

    void unregisterKsqlDbClient(String ksqlDbCode);

    // CREATE CLIENTS
    Consumer<byte[], byte[]> createConsumerClient(Map<String, Object> overrides);

    Admin createAdminClient(Map<String, Object> configuration);

    CommonRestClient createKafkaConnectClient(
            String url, Boolean basicAuthEnabled, String basicAuthUsername, String basicAuthPassword);

    Client createKsqlDbClient(
            String host,
            Integer port,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            Boolean keyStoreEnabled,
            String keyStore,
            String keyStorePassword,
            Boolean trustStoreEnabled,
            String trustStore,
            String trustStorePassword,
            Boolean useTls,
            Boolean verifyHost,
            Boolean useAlpn,
            Integer executeQueryMaxResultRows);

    void cleanUp();
}
