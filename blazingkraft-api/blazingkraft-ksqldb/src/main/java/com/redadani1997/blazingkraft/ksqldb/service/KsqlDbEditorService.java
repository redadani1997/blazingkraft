package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbEditorRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorStatementApiResponse;
import java.util.List;

public interface KsqlDbEditorService {
    List<KsqlDbEditorQueryApiResponse> executeQuery(KsqlDbEditorRequest request);

    KsqlDbEditorStatementApiResponse executeStatement(KsqlDbEditorRequest request);
}
