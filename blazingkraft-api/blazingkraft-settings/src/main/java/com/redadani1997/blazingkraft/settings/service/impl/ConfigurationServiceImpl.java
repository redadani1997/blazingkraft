package com.redadani1997.blazingkraft.settings.service.impl;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.cache.service.ServerPermissionsCache;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.KafkaConnectDao;
import com.redadani1997.blazingkraft.dao.dao.KsqlDbDao;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.settings.configuration.openapi.model.*;
import com.redadani1997.blazingkraft.settings.mapper.out.SettingsResponseMapper;
import com.redadani1997.blazingkraft.settings.mapper.out.configuration.ConfigurationResponseMapper;
import com.redadani1997.blazingkraft.settings.service.ConfigurationService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfigurationServiceImpl implements ConfigurationService {

    private final ClusterDao clusterDao;
    private final SchemaRegistryDao schemaRegistryDao;
    private final KafkaConnectDao kafkaConnectDao;
    private final KsqlDbDao ksqlDbDao;
    private final SettingsResponseMapper settingsResponseMapper;
    private final ServerPermissionsCache serverPermissionsCache;
    private final CurrentUserFacade currentUserFacade;

    @Override
    public ConfigurationApiResponse getConfiguration() {
        ServerPermissionsDomain serverPermissionsDomain = this.serverPermissionsCache.get();

        CurrentUser currentUser = this.currentUserFacade.currentUser();

        List<ClusterModel> clusterModels = this.clusterDao.findAll();
        List<SchemaRegistryModel> schemaRegistryModels = this.schemaRegistryDao.findAll();
        List<KafkaConnectModel> kafkaConnectModels = this.kafkaConnectDao.findAll();
        List<KsqlDbModel> ksqlDbModels = this.ksqlDbDao.findAll();

        List<ClusterFeatureApiResponse> clusterFeatures =
                clusterModels.stream()
                        .map(
                                clusterModel -> {
                                    return this.responseMapper().clusterFeatureApiResponse(clusterModel);
                                })
                        .collect(Collectors.toList());
        List<SchemaRegistryFeatureApiResponse> schemaRegistryFeatures =
                schemaRegistryModels.stream()
                        .map(
                                schemaRegistryModel -> {
                                    return this.responseMapper()
                                            .schemaRegistryFeatureApiResponse(schemaRegistryModel);
                                })
                        .collect(Collectors.toList());
        List<KafkaConnectFeatureApiResponse> kafkaConnectFeatures =
                kafkaConnectModels.stream()
                        .map(
                                kafkaConnectModel -> {
                                    return this.responseMapper().kafkaConnectFeatureApiResponse(kafkaConnectModel);
                                })
                        .collect(Collectors.toList());
        List<KsqlDbFeatureApiResponse> ksqlDbFeatures =
                ksqlDbModels.stream()
                        .map(
                                ksqlDbModel -> {
                                    return this.responseMapper().ksqlDbFeatureApiResponse(ksqlDbModel);
                                })
                        .collect(Collectors.toList());

        return this.responseMapper()
                .configurationApiResponse(
                        currentUser,
                        serverPermissionsDomain,
                        clusterFeatures,
                        schemaRegistryFeatures,
                        kafkaConnectFeatures,
                        ksqlDbFeatures);
    }

    private ConfigurationResponseMapper responseMapper() {
        return this.settingsResponseMapper.configurationResponseMapper();
    }
}
