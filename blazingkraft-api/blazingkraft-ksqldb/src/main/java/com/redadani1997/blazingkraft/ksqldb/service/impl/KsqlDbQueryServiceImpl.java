package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbQueryException;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.model.KsqlDbQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.query.KsqlDbQueryResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbQueryService;
import io.confluent.ksql.api.client.QueryInfo;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbQueryServiceImpl implements KsqlDbQueryService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbQueryApiResponse> getAllKsqlDbQueries() {
        try {
            List<QueryInfo> queryInfos =
                    this.currentKsqlDbClient().client().listQueries().get(7, TimeUnit.SECONDS);
            return this.ksqlDbQueryResponseMapper().ksqlDbQueryApiResponses(queryInfos);
        } catch (ExecutionException ex) {
            throw new KsqlDbQueryException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbQueryException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbQueryResponseMapper ksqlDbQueryResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbQueryResponseMapper();
    }
}
