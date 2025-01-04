package com.redadani1997.blazingkraft.ksqldb.mapper.out.table;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.model.KsqlDbTableApiResponse;
import io.confluent.ksql.api.client.TableInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbTableResponseMapper {
    public List<KsqlDbTableApiResponse> ksqlDbTableApiResponses(List<TableInfo> tableInfos) {
        if (tableInfos == null) {
            return Collections.emptyList();
        }
        return tableInfos.stream().map(this::ksqlDbTableApiResponse).toList();
    }

    public KsqlDbTableApiResponse ksqlDbTableApiResponse(TableInfo tableInfo) {
        if (tableInfo == null) {
            return null;
        }
        KsqlDbTableApiResponse response = new KsqlDbTableApiResponse();

        response.setName(tableInfo.getName());
        response.setTopic(tableInfo.getTopic());
        response.setFormat(tableInfo.getFormat());
        response.setIsWindowed(tableInfo.isWindowed());
        response.setKeyFormat(tableInfo.getKeyFormat());
        response.setValueFormat(tableInfo.getValueFormat());

        return response;
    }
}
