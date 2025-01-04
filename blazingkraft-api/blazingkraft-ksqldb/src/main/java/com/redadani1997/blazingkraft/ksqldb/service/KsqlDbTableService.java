package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.model.KsqlDbTableApiResponse;
import java.util.List;

public interface KsqlDbTableService {

    List<KsqlDbTableApiResponse> getAllKsqlDbTables();
}
