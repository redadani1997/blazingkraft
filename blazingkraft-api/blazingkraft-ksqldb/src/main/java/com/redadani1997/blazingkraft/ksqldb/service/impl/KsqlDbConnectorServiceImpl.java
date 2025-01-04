package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbConnectorException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorCreateRequest;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorDeleteRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.connector.KsqlDbConnectorResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbConnectorService;
import io.confluent.ksql.api.client.ConnectorInfo;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbConnectorServiceImpl implements KsqlDbConnectorService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbConnectorApiResponse> getAllKsqlDbConnectors() {
        try {
            List<ConnectorInfo> connectorInfos =
                    this.currentKsqlDbClient().client().listConnectors().get(7, TimeUnit.SECONDS);
            return this.ksqlDbConnectorResponseMapper().ksqlDbConnectorApiResponses(connectorInfos);
        } catch (ExecutionException ex) {
            throw new KsqlDbConnectorException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbConnectorException(ex);
        }
    }

    @Override
    public void createKsqlDbConnector(KsqlDbConnectorCreateRequest request) {
        try {
            this.currentKsqlDbClient()
                    .client()
                    .createConnector(
                            request.getConnectorName(), request.getIsSource(), request.getProperties())
                    .get(7, TimeUnit.SECONDS);
        } catch (ExecutionException ex) {
            throw new KsqlDbConnectorException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbConnectorException(ex);
        }
    }

    @Override
    public void deleteKsqlDbConnector(KsqlDbConnectorDeleteRequest request) {
        try {
            this.currentKsqlDbClient()
                    .client()
                    .dropConnector(request.getConnectorName())
                    .get(7, TimeUnit.SECONDS);
        } catch (ExecutionException ex) {
            throw new KsqlDbConnectorException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbConnectorException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbConnectorResponseMapper ksqlDbConnectorResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbConnectorResponseMapper();
    }
}
