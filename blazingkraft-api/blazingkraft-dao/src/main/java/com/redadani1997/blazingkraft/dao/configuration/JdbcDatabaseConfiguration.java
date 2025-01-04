package com.redadani1997.blazingkraft.dao.configuration;

import com.redadani1997.blazingkraft.dao.dao.*;
import com.redadani1997.blazingkraft.dao.dao.jdbc.*;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class JdbcDatabaseConfiguration {

    private final SchemaRegistryRepository schemaRegistryRepository;
    private final ClusterRepository clusterRepository;
    private final ProducerRepository producerRepository;
    private final ConsumerRepository consumerRepository;
    private final KafkaConnectRepository kafkaConnectRepository;
    private final OIDCProviderRepository oidcProviderRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ServerPermissionsRepository serverPermissionsRepository;
    private final KsqlDbRepository ksqlDbRepository;
    private final AuditRepository auditRepository;
    private final DataMaskingRepository dataMaskingRepository;

    @Bean
    public ClusterDao clusterDao() {
        ClusterJdbcDao dao = new ClusterJdbcDao(this.clusterRepository);
        return dao;
    }

    @Bean
    public ProducerDao producerDao() {
        ProducerJdbcDao dao = new ProducerJdbcDao(this.producerRepository);
        return dao;
    }

    @Bean
    public ConsumerDao consumerDao() {
        ConsumerJdbcDao dao = new ConsumerJdbcDao(this.consumerRepository);
        return dao;
    }

    @Bean
    public SchemaRegistryDao schemaRegistryDao() {
        SchemaRegistryJdbcDao dao = new SchemaRegistryJdbcDao(this.schemaRegistryRepository);
        return dao;
    }

    @Bean
    public KafkaConnectDao kafkaConnectDao() {
        KafkaConnectJdbcDao dao = new KafkaConnectJdbcDao(this.kafkaConnectRepository);
        return dao;
    }

    @Bean
    public OIDCProviderDao oidcProviderDao() {
        OIDCProviderJdbcDao dao = new OIDCProviderJdbcDao(this.oidcProviderRepository);
        return dao;
    }

    @Bean
    public GroupDao groupDao() {
        GroupJdbcDao dao = new GroupJdbcDao(this.groupRepository);
        return dao;
    }

    @Bean
    public UserDao userDao() {
        UserJdbcDao dao = new UserJdbcDao(this.userRepository);
        return dao;
    }

    @Bean
    public ServerPermissionsDao serverPermissionsDao() {
        ServerPermissionsJdbcDao dao = new ServerPermissionsJdbcDao(this.serverPermissionsRepository);
        return dao;
    }

    @Bean
    public KsqlDbDao ksqlDbDao() {
        KsqlDbJdbcDao dao = new KsqlDbJdbcDao(this.ksqlDbRepository);
        return dao;
    }

    @Bean
    public AuditDao auditDao() {
        AuditJdbcDao dao = new AuditJdbcDao(this.auditRepository);
        return dao;
    }

    @Bean
    public DataMaskingDao dataMaskingDao() {
        DataMaskingJdbcDao dao = new DataMaskingJdbcDao(this.dataMaskingRepository);
        return dao;
    }

    private void clean() {
        this.producerRepository.deleteAll();
        this.consumerRepository.deleteAll();
        this.clusterRepository.deleteAll();
        this.schemaRegistryRepository.deleteAll();
    }
}
