package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.*;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import com.redadani1997.blazingkraft.error.client.ClientsException;
import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.RestService;
import io.confluent.ksql.api.client.Client;
import java.lang.reflect.Field;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.Admin;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.producer.Producer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientsFactoryImpl implements ClientsFactory {

    private final AdminClientFactory adminClientFactory;
    private final ProducerClientFactory producerClientFactory;
    private final ConsumerClientFactory consumerClientFactory;
    private final SchemaRegistryClientFactory schemaRegistryClientFactory;
    private final KafkaConnectClientFactory kafkaConnectClientFactory;
    private final KsqlDbClientFactory ksqlDbClientFactory;

    @Getter private ConcurrentHashMap<String, CommonAdminClient> admins = new ConcurrentHashMap<>();

    @Getter
    private ConcurrentHashMap<String, CommonProducerClient> producers = new ConcurrentHashMap<>();

    @Getter
    private ConcurrentHashMap<String, CommonConsumerClient> consumers = new ConcurrentHashMap<>();

    @Getter
    private ConcurrentHashMap<String, CommonSchemaRegistryClient> schemaRegistries =
            new ConcurrentHashMap<>();

    @Getter
    private ConcurrentHashMap<String, CommonKafkaConnectClient> kafkaConnects =
            new ConcurrentHashMap<>();

    @Getter private ConcurrentHashMap<String, CommonKsqlDbClient> ksqlDbs = new ConcurrentHashMap<>();

    private ThreadLocal<CurrentCode> currentCode = new ThreadLocal<>();
    private ThreadLocal<CommonAdminClient> currentAdminClient = new ThreadLocal<>();
    private ThreadLocal<CommonProducerClient> currentProducerClient = new ThreadLocal<>();
    private ThreadLocal<CommonConsumerClient> currentConsumerClient = new ThreadLocal<>();
    private ThreadLocal<CommonSchemaRegistryClient> currentSchemaRegistryClient = new ThreadLocal<>();
    private ThreadLocal<CommonKafkaConnectClient> currentKafkaConnectClient = new ThreadLocal<>();
    private ThreadLocal<CommonKsqlDbClient> currentKsqlDbClient = new ThreadLocal<>();

    @Override
    public CurrentCode currentCode() {
        return this.currentCode.get();
    }

    @Override
    public void setCurrentCode(CurrentCode currentCode) {
        this.currentCode.set(currentCode);
    }

    // GET CURRENT CLIENTS
    @Override
    public CommonAdminClient currentAdminClient() {
        return this.currentAdminClient.get();
    }

    @Override
    public CommonProducerClient currentProducerClient() {
        return this.currentProducerClient.get();
    }

    @Override
    public CommonConsumerClient currentConsumerClient() {
        return this.currentConsumerClient.get();
    }

    @Override
    public CommonSchemaRegistryClient currentSchemaRegistryClient() {
        return this.currentSchemaRegistryClient.get();
    }

    @Override
    public RestService currentSchemaRegistryRestService() {
        try {
            Field restServiceField = CachedSchemaRegistryClient.class.getDeclaredField("restService");
            restServiceField.setAccessible(true);
            return (RestService) restServiceField.get(this.currentSchemaRegistryClient.get().client());
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new ClientsException(
                    "Error while getting Schema Registry Rest Service, " + e.getMessage());
        }
    }

    @Override
    public CommonKafkaConnectClient currentKafkaConnectClient() {
        return this.currentKafkaConnectClient.get();
    }

    @Override
    public CommonKsqlDbClient currentKsqlDbClient() {
        return this.currentKsqlDbClient.get();
    }

    // SET CURRENT CLIENTS

    @Override
    public void setCurrentAdminClient(String clusterCode) {
        CommonAdminClient commonAdminClient = this.admins.get(clusterCode);
        if (commonAdminClient == null) {
            throw new ClientsException(String.format("Cluster code '%s' not found!", clusterCode));
        }
        this.currentAdminClient.set(commonAdminClient);
    }

    @Override
    public void setCurrentProducerClient(String clusterCode) {
        CommonProducerClient commonProducerClient = this.producers.get(clusterCode);
        if (commonProducerClient == null) {
            throw new ClientsException(String.format("Cluster code '%s' not found!", clusterCode));
        }
        this.currentProducerClient.set(commonProducerClient);
    }

    @Override
    public void setCurrentConsumerClient(String clusterCode) {
        CommonConsumerClient commonConsumerClient = this.consumers.get(clusterCode);
        if (commonConsumerClient == null) {
            throw new ClientsException(String.format("Cluster code '%s' not found!", clusterCode));
        }
        this.currentConsumerClient.set(commonConsumerClient);
    }

    @Override
    public void setCurrentSchemaRegistryClient(String schemaRegistryCode) {
        CommonSchemaRegistryClient commonSchemaRegistryClient =
                this.schemaRegistries.get(schemaRegistryCode);
        if (commonSchemaRegistryClient == null) {
            throw new ClientsException(
                    String.format("Schema Registry Code '%s' not found!", schemaRegistryCode));
        }
        this.currentSchemaRegistryClient.set(commonSchemaRegistryClient);
    }

    @Override
    public void setCurrentKafkaConnectClient(String kafkaConnectCode) {
        CommonKafkaConnectClient commonKafkaConnectClient = this.kafkaConnects.get(kafkaConnectCode);
        if (commonKafkaConnectClient == null) {
            throw new ClientsException(
                    String.format("Kafka Connect code '%s' not found!", kafkaConnectCode));
        }
        this.currentKafkaConnectClient.set(commonKafkaConnectClient);
    }

    @Override
    public void setCurrentKsqlDbClient(String ksqlDbCode) {
        CommonKsqlDbClient commonKsqlDbClient = this.ksqlDbs.get(ksqlDbCode);
        if (commonKsqlDbClient == null) {
            throw new ClientsException(String.format("KsqlDb code '%s' not found!", ksqlDbCode));
        }
        this.currentKsqlDbClient.set(commonKsqlDbClient);
    }

    // REGISTER CLIENTS

    @Override
    public void registerAdminClient(
            String clusterCode,
            Map<String, Object> configuration,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment) {
        CommonAdminClient existingCommonAdminClient = this.admins.get(clusterCode);

        Admin adminClient = this.adminClientFactory.createAdminClient(configuration);

        CommonJmxClient jmxClient = null;

        if (jmxEnabled) {
            jmxClient = CommonJmxClient.create(jmxUrl, jmxEnvironment);
        }

        CommonAdminClient commonAdminClient =
                CommonAdminClient.builder()
                        .adminClient(adminClient)
                        .jmxClient(jmxClient)
                        .clusterCode(clusterCode)
                        .build();

        if (existingCommonAdminClient != null) {
            try {
                existingCommonAdminClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.admins.remove(clusterCode);
        }

        this.admins.put(clusterCode, commonAdminClient);
    }

    @Override
    public void registerProducerClient(
            String clusterCode,
            String schemaRegistryCode,
            Boolean perRequestKeySerializer,
            CommonSerializer keySerializer,
            Boolean perRequestValueSerializer,
            CommonSerializer valueSerializer,
            Map<String, Object> configuration) {
        CommonProducerClient existingCommonProducerClient = this.producers.get(clusterCode);

        Producer<byte[], byte[]> producerClient =
                this.producerClientFactory.createProducerClient(configuration);

        CommonProducerClient commonProducerClient =
                CommonProducerClient.builder()
                        .clusterCode(clusterCode)
                        .schemaRegistryCode(schemaRegistryCode)
                        .perRequestKeySerializer(perRequestKeySerializer)
                        .keySerializer(keySerializer)
                        .perRequestValueSerializer(perRequestValueSerializer)
                        .valueSerializer(valueSerializer)
                        .producerClient(producerClient)
                        .build();

        if (existingCommonProducerClient != null) {
            try {
                existingCommonProducerClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.producers.remove(clusterCode);
        }

        this.producers.put(clusterCode, commonProducerClient);
    }

    @Override
    public void registerConsumerClient(
            String clusterCode,
            String schemaRegistryCode,
            Boolean perRequestKeyDeserializer,
            CommonDeserializer keyDeserializer,
            Boolean perRequestValueDeserializer,
            CommonDeserializer valueDeserializer,
            Map<String, Object> configuration,
            Long pollTimeoutMs) {
        CommonConsumerClient existingCommonConsumerClient = this.consumers.get(clusterCode);

        Consumer<byte[], byte[]> tmpConsumerClient = null;

        try {
            tmpConsumerClient = this.consumerClientFactory.createConsumerClient(configuration);
        } finally {
            if (tmpConsumerClient != null) {
                tmpConsumerClient.close(Duration.of(2, ChronoUnit.SECONDS));
            }
        }

        CommonConsumerClient commonConsumerClient =
                CommonConsumerClient.builder()
                        .clusterCode(clusterCode)
                        .schemaRegistryCode(schemaRegistryCode)
                        .perRequestKeyDeserializer(perRequestKeyDeserializer)
                        .keyDeserializer(keyDeserializer)
                        .perRequestValueDeserializer(perRequestValueDeserializer)
                        .valueDeserializer(valueDeserializer)
                        .configuration(configuration)
                        .pollTimeoutMs(pollTimeoutMs)
                        .build();

        if (existingCommonConsumerClient != null) {
            this.consumers.remove(clusterCode);
        }

        this.consumers.put(clusterCode, commonConsumerClient);
    }

    @Override
    public void registerSchemaRegistryClient(
            String schemaRegistryCode,
            String schemaRegistryUrls,
            Integer schemasCacheSize,
            Map<String, Object> configuration,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment) {
        CommonSchemaRegistryClient existingCommonSchemaRegistryClient =
                this.schemaRegistries.get(schemaRegistryCode);

        SchemaRegistryClient schemaRegistryClient =
                this.schemaRegistryClientFactory.createSchemaRegistryClient(
                        schemaRegistryUrls, schemasCacheSize, configuration);

        CommonJmxClient jmxClient = null;

        if (jmxEnabled) {
            jmxClient = CommonJmxClient.create(jmxUrl, jmxEnvironment);
        }

        CommonSchemaRegistryClient commonSchemaRegistryClient =
                CommonSchemaRegistryClient.builder()
                        .schemaRegistryClient(schemaRegistryClient)
                        .schemaRegistryCode(schemaRegistryCode)
                        .jmxClient(jmxClient)
                        .build();

        if (existingCommonSchemaRegistryClient != null) {
            try {
                existingCommonSchemaRegistryClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.schemaRegistries.remove(schemaRegistryCode);
        }

        this.schemaRegistries.put(schemaRegistryCode, commonSchemaRegistryClient);
    }

    @Override
    public void registerKafkaConnectClient(
            String kafkaConnectCode,
            String url,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            Boolean jmxEnabled,
            String jmxUrl,
            Map<String, Object> jmxEnvironment) {
        CommonKafkaConnectClient existingCommonKafkaConnectClient =
                this.kafkaConnects.get(kafkaConnectCode);

        CommonRestClient commonRestClient =
                this.kafkaConnectClientFactory.createKafkaConnectClient(
                        url, basicAuthEnabled, basicAuthUsername, basicAuthPassword);

        CommonJmxClient jmxClient = null;

        if (jmxEnabled) {
            jmxClient = CommonJmxClient.create(jmxUrl, jmxEnvironment);
        }

        CommonKafkaConnectClient commonKafkaConnectClient =
                CommonKafkaConnectClient.builder()
                        .kafkaConnectCode(kafkaConnectCode)
                        .restClient(commonRestClient)
                        .jmxClient(jmxClient)
                        .build();

        if (existingCommonKafkaConnectClient != null) {
            try {
                existingCommonKafkaConnectClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.kafkaConnects.remove(kafkaConnectCode);
        }

        this.kafkaConnects.put(kafkaConnectCode, commonKafkaConnectClient);
    }

    @Override
    public void registerKsqlDbClient(
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
            Map<String, Object> jmxEnvironment) {

        CommonKsqlDbClient existingCommonKsqlDbClient = this.ksqlDbs.get(ksqlDbCode);

        Client client =
                this.ksqlDbClientFactory.createKsqlDbClient(
                        host,
                        port,
                        basicAuthEnabled,
                        basicAuthUsername,
                        basicAuthPassword,
                        keyStoreEnabled,
                        keyStore,
                        keyStorePassword,
                        trustStoreEnabled,
                        trustStore,
                        trustStorePassword,
                        useTls,
                        verifyHost,
                        useAlpn,
                        executeQueryMaxResultRows);

        CommonJmxClient jmxClient = null;

        if (jmxEnabled) {
            jmxClient = CommonJmxClient.create(jmxUrl, jmxEnvironment);
        }

        CommonKsqlDbClient commonKsqlDbClient =
                CommonKsqlDbClient.builder()
                        .ksqlDbClient(client)
                        .ksqlDbCode(ksqlDbCode)
                        .jmxClient(jmxClient)
                        .build();

        if (existingCommonKsqlDbClient != null) {
            try {
                existingCommonKsqlDbClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.ksqlDbs.remove(ksqlDbCode);
        }

        this.ksqlDbs.put(ksqlDbCode, commonKsqlDbClient);
    }

    // UNREGISTER CLIENTS
    @Override
    public void unregisterAdminClient(String clusterCode) {
        CommonAdminClient commonAdminClient = this.admins.get(clusterCode);
        if (commonAdminClient != null) {
            try {
                commonAdminClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.admins.remove(clusterCode);
        }
    }

    @Override
    public void unregisterProducerClient(String clusterCode) {
        CommonProducerClient commonProducerClient = this.producers.get(clusterCode);
        if (commonProducerClient != null) {
            try {
                commonProducerClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.producers.remove(clusterCode);
        }
    }

    @Override
    public void unregisterConsumerClient(String clusterCode) {
        CommonConsumerClient commonConsumerClient = this.consumers.get(clusterCode);
        if (commonConsumerClient != null) {
            this.consumers.remove(clusterCode);
        }
    }

    @Override
    public void unregisterKafkaConnectClient(String kafkaConnectCode) {
        CommonKafkaConnectClient commonKafkaConnectClient = this.kafkaConnects.get(kafkaConnectCode);
        if (commonKafkaConnectClient != null) {
            try {
                commonKafkaConnectClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.kafkaConnects.remove(kafkaConnectCode);
        }
    }

    @Override
    public void unregisterSchemaRegistryClient(String schemaRegistryCode) {
        CommonSchemaRegistryClient commonSchemaRegistryClient =
                this.schemaRegistries.get(schemaRegistryCode);
        if (commonSchemaRegistryClient != null) {
            try {
                commonSchemaRegistryClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.schemaRegistries.remove(schemaRegistryCode);
        }
    }

    @Override
    public void unregisterKsqlDbClient(String ksqlDbCode) {
        CommonKsqlDbClient commonKsqlDbClient = this.ksqlDbs.get(ksqlDbCode);
        if (commonKsqlDbClient != null) {
            try {
                commonKsqlDbClient.close();
            } catch (Exception ex) {
                // no-op
            }
            this.ksqlDbs.remove(ksqlDbCode);
        }
    }

    // CREATE CLIENTS
    @Override
    public Consumer<byte[], byte[]> createConsumerClient(Map<String, Object> overrides) {
        CommonConsumerClient commonConsumerClient = this.currentConsumerClient.get();

        Map<String, Object> consumerConfiguration = commonConsumerClient.configuration();

        if (overrides != null) {
            consumerConfiguration.putAll(overrides);
        }

        return this.consumerClientFactory.createConsumerClient(consumerConfiguration);
    }

    @Override
    public Admin createAdminClient(Map<String, Object> configuration) {
        return this.adminClientFactory.createAdminClient(configuration);
    }

    @Override
    public CommonRestClient createKafkaConnectClient(
            String url, Boolean basicAuthEnabled, String basicAuthUsername, String basicAuthPassword) {
        return this.kafkaConnectClientFactory.createKafkaConnectClient(
                url, basicAuthEnabled, basicAuthUsername, basicAuthPassword);
    }

    @Override
    public Client createKsqlDbClient(
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
            Integer executeQueryMaxResultRows) {

        return this.ksqlDbClientFactory.createKsqlDbClient(
                host,
                port,
                basicAuthEnabled,
                basicAuthUsername,
                basicAuthPassword,
                keyStoreEnabled,
                keyStore,
                keyStorePassword,
                trustStoreEnabled,
                trustStore,
                trustStorePassword,
                useTls,
                verifyHost,
                useAlpn,
                executeQueryMaxResultRows);
    }

    @Override
    public void cleanUp() {
        this.currentCode.remove();
        this.currentAdminClient.remove();
        this.currentProducerClient.remove();
        this.currentConsumerClient.remove();
        this.currentSchemaRegistryClient.remove();
        this.currentKafkaConnectClient.remove();
        this.currentKsqlDbClient.remove();
    }
}
