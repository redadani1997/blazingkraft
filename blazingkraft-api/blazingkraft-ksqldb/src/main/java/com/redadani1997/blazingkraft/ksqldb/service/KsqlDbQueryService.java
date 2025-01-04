package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.model.KsqlDbQueryApiResponse;
import java.util.List;

public interface KsqlDbQueryService {

    List<KsqlDbQueryApiResponse> getAllKsqlDbQueries();
}
