package com.redadani1997.blazingkraft.ksqldb.mapper.out.editor;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.cache.service.DataMaskingCache;
import com.redadani1997.blazingkraft.datamasking.service.DataMasker;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorStatementApiResponse;
import io.confluent.ksql.api.client.ExecuteStatementResult;
import io.confluent.ksql.api.client.Row;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbEditorResponseMapper {
    private final DataMasker dataMasker;
    private final DataMaskingCache dataMaskingCache;

    public List<KsqlDbEditorQueryApiResponse> ksqlDbEditorQueryApiResponses(List<Row> rows) {
        if (rows == null) {
            return Collections.emptyList();
        }
        int index = 0;
        List<KsqlDbEditorQueryApiResponse> responses = new ArrayList<>();

        for (Row row : rows) {
            responses.add(this.ksqlDbEditorQueryApiResponse(row, index++));
        }

        return responses;
    }

    public KsqlDbEditorQueryApiResponse ksqlDbEditorQueryApiResponse(Row row, int index) {
        if (row == null) {
            return null;
        }
        KsqlDbEditorQueryApiResponse response = new KsqlDbEditorQueryApiResponse();

        response.setId(index);
        response.setData(this.computeData(row));

        return response;
    }

    private Map<String, Object> computeData(Row row) {
        List<DataMaskingDomain> ksqlDbQueryRules = this.dataMaskingCache.getKsqlDbQueryRules();
        if (ksqlDbQueryRules.isEmpty()) {
            return row.asObject().getMap();
        }
        return this.dataMasker.mask(row.asObject().getMap(), ksqlDbQueryRules);
    }

    public KsqlDbEditorStatementApiResponse ksqlDbEditorStatementApiResponse(
            ExecuteStatementResult result) {
        KsqlDbEditorStatementApiResponse response = new KsqlDbEditorStatementApiResponse();

        response.setQueryId(result.queryId().orElse(null));

        return response;
    }
}
