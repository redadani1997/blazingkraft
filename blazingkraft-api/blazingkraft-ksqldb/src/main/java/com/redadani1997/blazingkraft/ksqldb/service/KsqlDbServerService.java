package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.dto.in.server.*;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDetailsApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMetaApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMonitoringApiResponse;
import java.util.List;

public interface KsqlDbServerService {
    KsqlDbServerMetaApiResponse createKsqlDbServer(KsqlDbServerCreateRequest request);

    KsqlDbServerDescriptionApiResponse describeKsqlDbServer();

    List<KsqlDbServerDescriptionApiResponse> describeKsqlDbServers();

    List<KsqlDbServerMetaApiResponse> getAllKsqlDbServersMeta();

    KsqlDbServerMetaApiResponse getKsqlDbServerMeta();

    void testKsqlDbServerClientConnectivity(KsqlDbServerClientConnectivityRequest request);

    void testKsqlDbServerJmxConnectivity(KsqlDbServerJmxConnectivityRequest request);

    void deleteKsqlDbServer(KsqlDbServerDeleteRequest request);

    KsqlDbServerMetaApiResponse editKsqlDbServer(KsqlDbServerEditRequest request);

    KsqlDbServerDetailsApiResponse getKsqlDbServerDetails(KsqlDbServerDetailsRequest request);

    KsqlDbServerMonitoringApiResponse monitorKsqlDbServerDetails();
}
