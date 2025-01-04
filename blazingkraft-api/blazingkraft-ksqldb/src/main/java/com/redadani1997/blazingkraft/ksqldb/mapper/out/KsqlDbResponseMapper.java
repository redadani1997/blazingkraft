package com.redadani1997.blazingkraft.ksqldb.mapper.out;

import com.redadani1997.blazingkraft.ksqldb.mapper.out.connector.KsqlDbConnectorResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.editor.KsqlDbEditorResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.query.KsqlDbQueryResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.server.KsqlDbServerResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.stream.KsqlDbStreamResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.table.KsqlDbTableResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.topic.KsqlDbTopicResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbResponseMapper {
    private final KsqlDbServerResponseMapper ksqlDbServerResponseMapper;
    private final KsqlDbConnectorResponseMapper ksqlDbConnectorResponseMapper;
    private final KsqlDbTopicResponseMapper ksqlDbTopicResponseMapper;
    private final KsqlDbStreamResponseMapper ksqlDbStreamResponseMapper;
    private final KsqlDbTableResponseMapper ksqlDbTableResponseMapper;
    private final KsqlDbQueryResponseMapper ksqlDbQueryResponseMapper;
    private final KsqlDbEditorResponseMapper ksqlDbEditorResponseMapper;

    public KsqlDbServerResponseMapper ksqlDbServerResponseMapper() {
        return this.ksqlDbServerResponseMapper;
    }

    public KsqlDbConnectorResponseMapper ksqlDbConnectorResponseMapper() {
        return this.ksqlDbConnectorResponseMapper;
    }

    public KsqlDbTopicResponseMapper ksqlDbTopicResponseMapper() {
        return this.ksqlDbTopicResponseMapper;
    }

    public KsqlDbStreamResponseMapper ksqlDbStreamResponseMapper() {
        return this.ksqlDbStreamResponseMapper;
    }

    public KsqlDbTableResponseMapper ksqlDbTableResponseMapper() {
        return this.ksqlDbTableResponseMapper;
    }

    public KsqlDbQueryResponseMapper ksqlDbQueryResponseMapper() {
        return this.ksqlDbQueryResponseMapper;
    }

    public KsqlDbEditorResponseMapper ksqlDbEditorResponseMapper() {
        return this.ksqlDbEditorResponseMapper;
    }
}
