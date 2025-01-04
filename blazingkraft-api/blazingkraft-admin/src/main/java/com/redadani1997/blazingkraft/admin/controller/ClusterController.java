package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.cluster.openapi.api.ClusterApi;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.*;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.*;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.cluster.ClusterRequestMapper;
import com.redadani1997.blazingkraft.admin.service.ClusterService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.ClusterDashboardActions;
import com.redadani1997.blazingkraft.common.actions.management.ManagementClusterActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ClusterController implements ClusterApi {

    private final AdminRequestMapper adminRequestMapper;
    private final ClusterService clusterService;

    @WithCleanUp
    @WithAudit(
            action = ManagementClusterActions.MANAGEMENT_CREATE_CLUSTER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.LOW)
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_CREATE_CLUSTER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ClusterMetaApiResponse> createCluster(ClusterCreateApiRequest apiRequest) {
        ClusterCreateRequest request = this.clusterRequestMapper().clusterCreateRequest(apiRequest);

        ClusterMetaApiResponse response = this.clusterService.createCluster(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementClusterActions.MANAGEMENT_DELETE_CLUSTER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DELETE_CLUSTER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteCluster(String clusterCode) {
        ClusterDeleteRequest request = this.clusterRequestMapper().clusterDeleteRequest(clusterCode);

        this.clusterService.deleteCluster(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DESCRIBE_CLUSTERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ClusterDescriptionApiResponse> describeCluster() {
        ClusterDescriptionApiResponse response = this.clusterService.describeCluster();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DESCRIBE_CLUSTERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<ClusterDescriptionApiResponse>> describeClusters() {
        return null;
    }

    @WithCleanUp
    @WithAudit(
            action = ManagementClusterActions.MANAGEMENT_EDIT_CLUSTER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_EDIT_CLUSTER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ClusterMetaApiResponse> editCluster(
            String clusterCode, ClusterEditApiRequest clusterEditApiRequest) {
        ClusterEditRequest request =
                this.clusterRequestMapper().clusterEditRequest(clusterCode, clusterEditApiRequest);

        ClusterMetaApiResponse response = this.clusterService.editCluster(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DESCRIBE_CLUSTERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<ClusterMetaApiResponse>> getAllClustersMeta() {
        List<ClusterMetaApiResponse> responses = this.clusterService.findAllClusters();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ClusterDashboardActions.VIEW_CLUSTER_DASHBOARD,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ClusterBrokerConfigurationApiResponse> getClusterBrokerConfiguration(
            Integer id) {
        ClusterBrokerConfigurationRequest request =
                this.clusterRequestMapper().clusterBrokerConfigurationRequest(id);

        ClusterBrokerConfigurationApiResponse response =
                this.clusterService.getClusterBrokerConfiguration(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ClusterDashboardActions.VIEW_CLUSTER_DASHBOARD,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<ClusterBrokerDetailsApiResponse>> getClusterBrokersDetails() {
        List<ClusterBrokerDetailsApiResponse> responses =
                this.clusterService.getClusterBrokersDetails();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DESCRIBE_CLUSTERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ClusterDetailsApiResponse> getClusterDetails(String clusterCode) {
        ClusterDetailsRequest request =
                this.clusterRequestMapper().clusterConfigurationRequest(clusterCode);
        ClusterDetailsApiResponse response = this.clusterService.getClusterDetails(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_DESCRIBE_CLUSTERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ClusterMetaApiResponse> getClusterMeta(String clusterCode) {
        ClusterMetaApiResponse response = this.clusterService.findClusterMeta(clusterCode);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ClusterDashboardActions.VIEW_CLUSTER_DASHBOARD,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ClusterMonitoringApiResponse> monitorCluster() {
        ClusterMonitoringApiResponse response = this.clusterService.monitorCluster();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_TEST_CLUSTER_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testClusterClientConnectivity(
            ClusterClientConnectivityApiRequest apiRequest) {
        ClusterClientConnectivityRequest request =
                this.clusterRequestMapper().testClusterClientConnectivity(apiRequest);

        this.clusterService.testClusterClientConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ManagementClusterActions.MANAGEMENT_TEST_CLUSTER_CONNECTIVITY,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testClusterJmxConnectivity(
            ClusterJmxConnectivityApiRequest apiRequest) {
        ClusterJmxConnectivityRequest request =
                this.clusterRequestMapper().testClusterJmxConnectivity(apiRequest);

        this.clusterService.testClusterJmxConnectivity(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private ClusterRequestMapper clusterRequestMapper() {
        return this.adminRequestMapper.clusterRequestMapper();
    }
}
