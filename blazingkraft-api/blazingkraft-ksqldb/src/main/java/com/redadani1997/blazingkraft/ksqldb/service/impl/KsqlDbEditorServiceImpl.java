package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbEditorRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorStatementApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.editor.KsqlDbEditorResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbEditorService;
import io.confluent.ksql.api.client.ExecuteStatementResult;
import io.confluent.ksql.api.client.Row;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbEditorServiceImpl implements KsqlDbEditorService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbEditorQueryApiResponse> executeQuery(KsqlDbEditorRequest request) {
        try {
            List<Row> rows =
                    this.currentKsqlDbClient()
                            .client()
                            .executeQuery(request.getSql(), request.getProperties())
                            .get(5, TimeUnit.SECONDS);

            return this.ksqlDbEditorResponseMapper().ksqlDbEditorQueryApiResponses(rows);
        } catch (ExecutionException ex) {
            throw new KsqlDbEditorException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 5 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbEditorException(ex);
        }
    }

    @Override
    public KsqlDbEditorStatementApiResponse executeStatement(KsqlDbEditorRequest request) {
        try {
            ExecuteStatementResult result =
                    this.currentKsqlDbClient()
                            .client()
                            .executeStatement(request.getSql(), request.getProperties())
                            .get();

            return this.ksqlDbEditorResponseMapper().ksqlDbEditorStatementApiResponse(result);
        } catch (ExecutionException ex) {
            throw new KsqlDbEditorException(ex.getCause());
        } catch (Exception ex) {
            throw new KsqlDbEditorException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbEditorResponseMapper ksqlDbEditorResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbEditorResponseMapper();
    }
}
