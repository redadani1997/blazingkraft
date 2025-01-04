package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.cluster.openapi.model.*;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterDetailsApiResponse;
import com.redadani1997.blazingkraft.admin.cluster.openapi.model.ClusterMetaApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.*;
import java.util.List;

public interface ClusterService {

    ClusterMetaApiResponse createCluster(ClusterCreateRequest clusterCreateRequest);

    List<ClusterMetaApiResponse> findAllClusters();

    void testClusterClientConnectivity(
            ClusterClientConnectivityRequest clusterClientConnectivityRequest);

    void testClusterJmxConnectivity(ClusterJmxConnectivityRequest clusterJmxConnectivityRequest);

    ClusterDescriptionApiResponse describeCluster();

    ClusterMetaApiResponse findClusterMeta(String clusterCode);

    void deleteCluster(ClusterDeleteRequest request);

    ClusterMetaApiResponse editCluster(ClusterEditRequest request);

    ClusterDetailsApiResponse getClusterDetails(ClusterDetailsRequest request);

    ClusterMonitoringApiResponse monitorCluster();

    List<ClusterBrokerDetailsApiResponse> getClusterBrokersDetails();

    ClusterBrokerConfigurationApiResponse getClusterBrokerConfiguration(
            ClusterBrokerConfigurationRequest request);
}
