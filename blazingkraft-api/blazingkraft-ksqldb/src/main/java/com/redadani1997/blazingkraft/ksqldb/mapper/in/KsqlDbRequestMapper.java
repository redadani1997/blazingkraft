package com.redadani1997.blazingkraft.ksqldb.mapper.in;

import com.redadani1997.blazingkraft.ksqldb.mapper.in.connector.KsqlDbConnectorRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.editor.KsqlDbEditorRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.server.KsqlDbServerRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbRequestMapper {
    private final KsqlDbServerRequestMapper ksqlDbServerRequestMapper;
    private final KsqlDbConnectorRequestMapper ksqlDbConnectorRequestMapper;
    private final KsqlDbEditorRequestMapper ksqlDbEditorRequestMapper;

    public KsqlDbServerRequestMapper ksqlDbServerRequestMapper() {
        return this.ksqlDbServerRequestMapper;
    }

    public KsqlDbConnectorRequestMapper ksqlDbConnectorRequestMapper() {
        return this.ksqlDbConnectorRequestMapper;
    }

    public KsqlDbEditorRequestMapper ksqlDbEditorRequestMapper() {
        return this.ksqlDbEditorRequestMapper;
    }
}
