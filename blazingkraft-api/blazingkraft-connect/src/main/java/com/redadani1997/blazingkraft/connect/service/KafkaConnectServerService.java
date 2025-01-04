package com.redadani1997.blazingkraft.connect.service;

import com.redadani1997.blazingkraft.connect.dto.in.server.*;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDetailsApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMetaApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMonitoringApiResponse;
import java.util.List;

public interface KafkaConnectServerService {
    KafkaConnectServerMetaApiResponse createKafkaConnectServer(
            KafkaConnectServerCreateRequest request);

    KafkaConnectServerDescriptionApiResponse describeKafkaConnectServer();

    List<KafkaConnectServerDescriptionApiResponse> describeKafkaConnectServers();

    List<KafkaConnectServerMetaApiResponse> getAllKafkaConnectServersMeta();

    KafkaConnectServerMetaApiResponse getKafkaConnectServerMeta();

    void testKafkaConnectServerClientConnectivity(
            KafkaConnectServerClientConnectivityRequest request);

    void testKafkaConnectServerJmxConnectivity(KafkaConnectServerJmxConnectivityRequest request);

    void deleteKafkaConnectServer(KafkaConnectServerDeleteRequest request);

    KafkaConnectServerMetaApiResponse editKafkaConnectServer(KafkaConnectServerEditRequest request);

    KafkaConnectServerDetailsApiResponse getKafkaConnectServerDetails(
            KafkaConnectServerDetailsRequest request);

    KafkaConnectServerMonitoringApiResponse monitorKafkaConnectServerDetails();
}
