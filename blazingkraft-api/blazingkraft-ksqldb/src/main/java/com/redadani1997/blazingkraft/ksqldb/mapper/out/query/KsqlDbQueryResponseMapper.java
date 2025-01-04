package com.redadani1997.blazingkraft.ksqldb.mapper.out.query;

import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.model.KsqlDbQueryApiResponse;
import io.confluent.ksql.api.client.QueryInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbQueryResponseMapper {
    public List<KsqlDbQueryApiResponse> ksqlDbQueryApiResponses(List<QueryInfo> queryInfos) {
        if (queryInfos == null) {
            return Collections.emptyList();
        }
        return queryInfos.stream().map(this::ksqlDbQueryApiResponse).toList();
    }

    public KsqlDbQueryApiResponse ksqlDbQueryApiResponse(QueryInfo queryInfo) {
        if (queryInfo == null) {
            return null;
        }
        KsqlDbQueryApiResponse response = new KsqlDbQueryApiResponse();

        response.setQueryType(EnumUtils.getNameOrNull(queryInfo.getQueryType()));
        response.setId(queryInfo.getId());
        response.setSink(queryInfo.getSink().orElse(null));
        response.setSql(queryInfo.getSql());
        response.setSinkTopic(queryInfo.getSinkTopic().orElse(null));

        return response;
    }
}
