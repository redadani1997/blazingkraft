package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterExportRequest;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.ClusterImportRequest;
import com.redadani1997.blazingkraft.admin.dto.io.cluster.ClusterExportImportDto;
import com.redadani1997.blazingkraft.admin.dto.io.cluster.ConsumerExportImportDto;
import com.redadani1997.blazingkraft.admin.dto.io.cluster.ProducerExportImportDto;
import com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.model.ImportedClusterMetaApiResponse;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.export_import_cluster.cluster.ExportImportClusterResponseMapper;
import com.redadani1997.blazingkraft.admin.service.ExportImportClusterService;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.application_event.ClusterImportedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ConsumerUpdatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ProducerUpdatedApplicationEvent;
import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.ConsumerDao;
import com.redadani1997.blazingkraft.dao.dao.ProducerDao;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportZipFSItemRequest;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportZipJsonItemRequest;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportZipRequest;
import com.redadani1997.blazingkraft.io.dto.out.export.IOExportZipResponse;
import com.redadani1997.blazingkraft.io.service.IOExportFileService;
import com.redadani1997.blazingkraft.io.service.impl.IOImportZipFileServiceImpl;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.config.SslConfigs;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExportImportClusterServiceImpl implements ExportImportClusterService {

    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;
    private final ClusterDao clusterDao;
    private final ProducerDao producerDao;
    private final ConsumerDao consumerDao;
    private final SchemaRegistryDao schemaRegistryDao;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final IOExportFileService ioExportFileService;
    private final AuditLogService auditLogService;

    @Override
    @Transactional
    public ImportedClusterMetaApiResponse importCluster(ClusterImportRequest request) {
        try (IOImportZipFileServiceImpl ioImportZipFileService =
                new IOImportZipFileServiceImpl(request.getZipFile())) {
            ClusterExportImportDto clusterExportImportDto =
                    ioImportZipFileService.getJsonFile("cluster/cluster.json", ClusterExportImportDto.class);

            String clusterCode = clusterExportImportDto.getCode();

            this.auditLogService.setSubject(clusterCode);

            ConsumerExportImportDto consumerExportImportDto =
                    ioImportZipFileService.getJsonFile(
                            "consumer/consumer.json", ConsumerExportImportDto.class);
            ProducerExportImportDto producerExportImportDto =
                    ioImportZipFileService.getJsonFile(
                            "producer/producer.json", ProducerExportImportDto.class);

            this.handleImportClusterSslFiles(ioImportZipFileService, clusterExportImportDto);

            // Save Cluster Model
            ClusterModel clusterModel = new ClusterModel();
            clusterModel.setCode(clusterExportImportDto.getCode());
            clusterModel.setName(clusterExportImportDto.getName());
            clusterModel.setColor(clusterExportImportDto.getColor());
            clusterModel.setCommonConfiguration(clusterExportImportDto.getCommonConfiguration());
            clusterModel.setJmxEnabled(clusterExportImportDto.getJmxEnabled());
            clusterModel.setJmxUrl(clusterExportImportDto.getJmxUrl());
            clusterModel.setJmxEnvironment(clusterExportImportDto.getJmxEnvironment());

            String schemaRegistryCode = clusterExportImportDto.getSchemaRegistryCode();
            if (schemaRegistryCode != null) {
                SchemaRegistryModel schemaRegistryModel =
                        this.schemaRegistryDao.findByCode(schemaRegistryCode);
                clusterModel.setSchemaRegistryModel(schemaRegistryModel);
            }

            ClusterModel savedClusterModel = this.clusterDao.create(clusterModel);

            this.applicationEventPublisher.publishEvent(
                    new ClusterImportedApplicationEvent(savedClusterModel.getCode()));

            // Save Consumer Model
            ConsumerModel consumerModel = this.consumerDao.findByCode(clusterCode);

            consumerModel.setPollTimeoutMs(consumerExportImportDto.getPollTimeoutMs());

            consumerModel.setPerRequestKeyDeserializer(
                    consumerExportImportDto.getPerRequestKeyDeserializer());
            consumerModel.setKeyDeserializer(
                    EnumUtils.toName(consumerExportImportDto.getKeyDeserializer()));
            if (CommonSerde.isSchemaRegistrySerde(consumerExportImportDto.getKeyDeserializer())) {
                consumerModel.setKeyDeserializerConfiguration(
                        consumerExportImportDto.getKeyDeserializerConfiguration());
            }

            consumerModel.setPerRequestValueDeserializer(
                    consumerExportImportDto.getPerRequestValueDeserializer());
            consumerModel.setValueDeserializer(
                    EnumUtils.toName(consumerExportImportDto.getValueDeserializer()));
            if (CommonSerde.isSchemaRegistrySerde(consumerExportImportDto.getValueDeserializer())) {
                consumerModel.setValueDeserializerConfiguration(
                        consumerExportImportDto.getValueDeserializerConfiguration());
            }

            consumerModel.setMainConfiguration(consumerExportImportDto.getMainConfiguration());

            ConsumerModel savedConsumerModel = this.consumerDao.save(consumerModel);

            this.applicationEventPublisher.publishEvent(
                    new ConsumerUpdatedApplicationEvent(savedConsumerModel.getCode()));

            // Save Producer Model
            ProducerModel producerModel = this.producerDao.findByCode(clusterCode);

            producerModel.setPerRequestKeySerializer(
                    producerExportImportDto.getPerRequestKeySerializer());
            producerModel.setKeySerializer(EnumUtils.toName(producerExportImportDto.getKeySerializer()));
            if (CommonSerde.isSchemaRegistrySerde(producerExportImportDto.getKeySerializer())) {
                producerModel.setKeySerializerConfiguration(
                        producerExportImportDto.getKeySerializerConfiguration());
            }

            producerModel.setPerRequestValueSerializer(
                    producerExportImportDto.getPerRequestValueSerializer());
            producerModel.setValueSerializer(
                    EnumUtils.toName(producerExportImportDto.getValueSerializer()));
            if (CommonSerde.isSchemaRegistrySerde(producerExportImportDto.getValueSerializer())) {
                producerModel.setValueSerializerConfiguration(
                        producerExportImportDto.getValueSerializerConfiguration());
            }

            producerModel.setMainConfiguration(producerExportImportDto.getMainConfiguration());

            ProducerModel savedProducerModel = this.producerDao.save(producerModel);

            this.applicationEventPublisher.publishEvent(
                    new ProducerUpdatedApplicationEvent(savedProducerModel.getCode()));

            return this.exportImportClusterResponseMapper()
                    .importedClusterMetaApiResponse(savedClusterModel);
        }
    }

    @Override
    public IOExportZipResponse exportCluster(ClusterExportRequest request) {
        ClusterModel clusterModel = this.clusterDao.findByCode(request.getCode());

        ClusterExportImportDto clusterExportImportDto = ClusterExportImportDto.from(clusterModel);
        ConsumerExportImportDto consumerExportImportDto =
                ConsumerExportImportDto.from(clusterModel.getConsumerModel());
        ProducerExportImportDto producerExportImportDto =
                ProducerExportImportDto.from(clusterModel.getProducerModel());

        String baseFileName = String.format("Cluster_%s", clusterModel.getCode());

        IOExportZipJsonItemRequest clusterZipJsonItemRequest =
                IOExportZipJsonItemRequest.builder()
                        .fileName(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FILE_NAME)
                        .folderPath(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FOLDER_PATH)
                        .content(clusterExportImportDto)
                        .build();

        IOExportZipJsonItemRequest consumerZipJsonItemRequest =
                IOExportZipJsonItemRequest.builder()
                        .fileName(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CONSUMER_FILE_NAME)
                        .folderPath(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CONSUMER_FOLDER_PATH)
                        .content(consumerExportImportDto)
                        .build();

        IOExportZipJsonItemRequest producerZipJsonItemRequest =
                IOExportZipJsonItemRequest.builder()
                        .fileName(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_PRODUCER_FILE_NAME)
                        .folderPath(CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_PRODUCER_FOLDER_PATH)
                        .content(producerExportImportDto)
                        .build();

        IOExportZipRequest ioExportZipRequest = new IOExportZipRequest();
        ioExportZipRequest.setBaseFileName(baseFileName);
        ioExportZipRequest.setJsonItems(
                List.of(clusterZipJsonItemRequest, consumerZipJsonItemRequest, producerZipJsonItemRequest));
        ioExportZipRequest.setFsItems(this.getFsItems(clusterExportImportDto));

        return this.ioExportFileService.exportZipFile(ioExportZipRequest);
    }

    private List<IOExportZipFSItemRequest> getFsItems(ClusterExportImportDto clusterExportImportDto) {
        List<IOExportZipFSItemRequest> fsItems = new ArrayList<>();

        Map<String, Object> commonConfiguration = clusterExportImportDto.getCommonConfiguration();

        if (commonConfiguration != null
                && commonConfiguration.get(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG) != null) {
            String keystoreLocation =
                    commonConfiguration.get(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG).toString();
            IOExportZipFSItemRequest keystoreLocationZipFSItemRequest =
                    IOExportZipFSItemRequest.builder()
                            .folderPath(
                                    CommonFileUtils.joinPaths(
                                            CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FILES_FOLDER_PATH,
                                            SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG))
                            .fsPath(keystoreLocation)
                            .build();

            fsItems.add(keystoreLocationZipFSItemRequest);
        }
        if (commonConfiguration != null
                && commonConfiguration.get(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG) != null) {
            String truststoreLocation =
                    commonConfiguration.get(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG).toString();
            IOExportZipFSItemRequest keystoreLocationZipFSItemRequest =
                    IOExportZipFSItemRequest.builder()
                            .folderPath(
                                    CommonFileUtils.joinPaths(
                                            CommonFileConstants.BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FILES_FOLDER_PATH,
                                            SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG))
                            .fsPath(truststoreLocation)
                            .build();

            fsItems.add(keystoreLocationZipFSItemRequest);
        }

        return fsItems;
    }

    private void handleImportClusterSslFiles(
            IOImportZipFileServiceImpl ioImportZipFileService,
            ClusterExportImportDto clusterExportImportDto) {
        String sslKeystoreLocation =
                ioImportZipFileService.copyFile(
                        CommonFileUtils.joinPaths("files", SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG));
        String sslTruststoreLocation =
                ioImportZipFileService.copyFile(
                        CommonFileUtils.joinPaths("files", SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG));

        if (sslKeystoreLocation != null) {
            clusterExportImportDto
                    .getCommonConfiguration()
                    .put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, sslKeystoreLocation);
        }
        if (sslTruststoreLocation != null) {
            clusterExportImportDto
                    .getCommonConfiguration()
                    .put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, sslTruststoreLocation);
        }
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private ExportImportClusterResponseMapper exportImportClusterResponseMapper() {
        return this.adminResponseMapper.exportImportClusterResponseMapper();
    }
}
