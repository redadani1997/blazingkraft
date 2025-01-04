package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.model.KsqlDbStreamApiResponse;
import java.util.List;

public interface KsqlDbStreamService {

    List<KsqlDbStreamApiResponse> getAllKsqlDbStreams();
}
