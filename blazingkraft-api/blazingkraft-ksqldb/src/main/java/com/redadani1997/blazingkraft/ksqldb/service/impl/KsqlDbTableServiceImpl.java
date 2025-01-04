package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbTableException;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.model.KsqlDbTableApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.table.KsqlDbTableResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbTableService;
import io.confluent.ksql.api.client.TableInfo;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbTableServiceImpl implements KsqlDbTableService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbTableApiResponse> getAllKsqlDbTables() {
        try {
            List<TableInfo> tableInfos =
                    this.currentKsqlDbClient().client().listTables().get(7, TimeUnit.SECONDS);
            return this.ksqlDbTableResponseMapper().ksqlDbTableApiResponses(tableInfos);
        } catch (ExecutionException ex) {
            throw new KsqlDbTableException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbTableException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbTableResponseMapper ksqlDbTableResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbTableResponseMapper();
    }
}
