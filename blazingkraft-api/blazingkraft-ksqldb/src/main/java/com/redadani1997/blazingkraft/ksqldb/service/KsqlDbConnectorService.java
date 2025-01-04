package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorCreateRequest;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorDeleteRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorApiResponse;
import java.util.List;

public interface KsqlDbConnectorService {
    List<KsqlDbConnectorApiResponse> getAllKsqlDbConnectors();

    void createKsqlDbConnector(KsqlDbConnectorCreateRequest request);

    void deleteKsqlDbConnector(KsqlDbConnectorDeleteRequest request);
}
