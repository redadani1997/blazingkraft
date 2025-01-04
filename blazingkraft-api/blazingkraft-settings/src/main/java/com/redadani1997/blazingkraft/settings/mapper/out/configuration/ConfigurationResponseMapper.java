package com.redadani1997.blazingkraft.settings.mapper.out.configuration;

import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.settings.configuration.openapi.model.*;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ConfigurationResponseMapper {

    public ConfigurationApiResponse configurationApiResponse(
            CurrentUser currentUser,
            ServerPermissionsDomain serverPermissionsDomain,
            List<ClusterFeatureApiResponse> clusterFeatureApiResponses,
            List<SchemaRegistryFeatureApiResponse> schemaRegistryFeatureApiResponses,
            List<KafkaConnectFeatureApiResponse> kafkaConnectFeatures,
            List<KsqlDbFeatureApiResponse> ksqlDbFeatureApiResponses) {

        ConfigurationApiResponse response = new ConfigurationApiResponse();

        response.setServerPermissions(this.serverPermissionsApiResponse(serverPermissionsDomain));
        response.setUserPermissions(this.userPermissionsApiResponse(currentUser));

        this.setBlazingUserAttributes(response, currentUser);

        FeatureApiResponse featureApiResponse = new FeatureApiResponse();
        featureApiResponse.setClusterFeatures(clusterFeatureApiResponses);
        featureApiResponse.setSchemaRegistryFeatures(schemaRegistryFeatureApiResponses);
        featureApiResponse.setKafkaConnectFeatures(kafkaConnectFeatures);
        featureApiResponse.setKsqlDbFeatures(ksqlDbFeatureApiResponses);

        response.setFeatures(featureApiResponse);
        return response;
    }

    private void setBlazingUserAttributes(
            ConfigurationApiResponse response, CurrentUser currentUser) {
        ConnectedUserApiResponse connectedUserApiResponse = new ConnectedUserApiResponse();

        connectedUserApiResponse.setIdentifier(currentUser.getIdentifier());
        connectedUserApiResponse.setDisplayedName(currentUser.getDisplayedName());
        connectedUserApiResponse.setPicture(currentUser.getPicture());

        response.setIsBlazingAdmin(currentUser.getIsBlazingAdmin());
        response.setConnectedUser(connectedUserApiResponse);
    }

    private PermissionsConfigurationApiResponse userPermissionsApiResponse(CurrentUser currentUser) {
        if (currentUser.getIsBlazingAdmin() || !currentUser.getHasGroup()) {
            return null;
        }

        PermissionsConfigurationApiResponse apiResponse = new PermissionsConfigurationApiResponse();

        apiResponse.setClusterPermissions(currentUser.getClusterPermissions());
        apiResponse.setKafkaConnectPermissions(currentUser.getKafkaConnectPermissions());
        apiResponse.setSchemaRegistryPermissions(currentUser.getSchemaRegistryPermissions());
        apiResponse.setKsqlDbPermissions(currentUser.getKsqlDbPermissions());
        apiResponse.setManagementPermissions(currentUser.getManagementPermissions());
        apiResponse.setPlaygroundPermissions(currentUser.getPlaygroundPermissions());

        return apiResponse;
    }

    private PermissionsConfigurationApiResponse serverPermissionsApiResponse(
            ServerPermissionsDomain domain) {
        if (domain == null) {
            return null;
        }

        PermissionsConfigurationApiResponse apiResponse = new PermissionsConfigurationApiResponse();

        apiResponse.setClusterPermissions(domain.getClusterPermissions());
        apiResponse.setKafkaConnectPermissions(domain.getKafkaConnectPermissions());
        apiResponse.setSchemaRegistryPermissions(domain.getSchemaRegistryPermissions());
        apiResponse.setKsqlDbPermissions(domain.getKsqlDbPermissions());
        apiResponse.setManagementPermissions(domain.getManagementPermissions());
        apiResponse.setPlaygroundPermissions(domain.getPlaygroundPermissions());

        return apiResponse;
    }

    public ClusterFeatureApiResponse clusterFeatureApiResponse(ClusterModel clusterModel) {
        ClusterFeatureApiResponse clusterFeatureApiResponse = new ClusterFeatureApiResponse();
        clusterFeatureApiResponse.setName(clusterModel.getName());
        clusterFeatureApiResponse.setCode(clusterModel.getCode());
        clusterFeatureApiResponse.setColor(clusterModel.getColor());
        clusterFeatureApiResponse.setJmxEnabled(clusterModel.getJmxEnabled());

        clusterFeatureApiResponse.setSchemaRegistryCode(clusterModel.schemaRegistryCode());
        clusterFeatureApiResponse.setSchemaRegistryName(clusterModel.schemaRegistryName());

        return clusterFeatureApiResponse;
    }

    public SchemaRegistryFeatureApiResponse schemaRegistryFeatureApiResponse(
            SchemaRegistryModel schemaRegistryModel) {
        SchemaRegistryFeatureApiResponse schemaRegistryFeatureApiResponse =
                new SchemaRegistryFeatureApiResponse();
        schemaRegistryFeatureApiResponse.setName(schemaRegistryModel.getName());
        schemaRegistryFeatureApiResponse.setCode(schemaRegistryModel.getCode());
        schemaRegistryFeatureApiResponse.setColor(schemaRegistryModel.getColor());
        schemaRegistryFeatureApiResponse.setJmxEnabled(schemaRegistryModel.getJmxEnabled());
        return schemaRegistryFeatureApiResponse;
    }

    public KafkaConnectFeatureApiResponse kafkaConnectFeatureApiResponse(
            KafkaConnectModel kafkaConnectModel) {
        KafkaConnectFeatureApiResponse kafkaConnectFeatureApiResponse =
                new KafkaConnectFeatureApiResponse();

        kafkaConnectFeatureApiResponse.setName(kafkaConnectModel.getName());
        kafkaConnectFeatureApiResponse.setCode(kafkaConnectModel.getCode());
        kafkaConnectFeatureApiResponse.setColor(kafkaConnectModel.getColor());
        kafkaConnectFeatureApiResponse.setJmxEnabled(kafkaConnectModel.getJmxEnabled());

        ClusterModel clusterModel = kafkaConnectModel.getClusterModel();
        if (clusterModel != null) {
            kafkaConnectFeatureApiResponse.setClusterCode(clusterModel.getCode());
            kafkaConnectFeatureApiResponse.setClusterName(clusterModel.getName());
        }

        return kafkaConnectFeatureApiResponse;
    }

    public KsqlDbFeatureApiResponse ksqlDbFeatureApiResponse(KsqlDbModel ksqlDbModel) {
        KsqlDbFeatureApiResponse ksqlDbFeatureApiResponse = new KsqlDbFeatureApiResponse();

        ksqlDbFeatureApiResponse.setName(ksqlDbModel.getName());
        ksqlDbFeatureApiResponse.setCode(ksqlDbModel.getCode());
        ksqlDbFeatureApiResponse.setColor(ksqlDbModel.getColor());
        ksqlDbFeatureApiResponse.setJmxEnabled(ksqlDbModel.getJmxEnabled());

        return ksqlDbFeatureApiResponse;
    }
}
