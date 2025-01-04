package com.redadani1997.blazingkraft.ksqldb.mapper.out.stream;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.model.KsqlDbStreamApiResponse;
import io.confluent.ksql.api.client.StreamInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbStreamResponseMapper {
    public List<KsqlDbStreamApiResponse> ksqlDbStreamApiResponses(List<StreamInfo> streamInfos) {
        if (streamInfos == null) {
            return Collections.emptyList();
        }
        return streamInfos.stream().map(this::ksqlDbStreamApiResponse).toList();
    }

    public KsqlDbStreamApiResponse ksqlDbStreamApiResponse(StreamInfo streamInfo) {
        if (streamInfo == null) {
            return null;
        }
        KsqlDbStreamApiResponse response = new KsqlDbStreamApiResponse();

        response.setName(streamInfo.getName());
        response.setTopic(streamInfo.getTopic());
        response.setFormat(streamInfo.getFormat());
        response.setIsWindowed(streamInfo.isWindowed());
        response.setKeyFormat(streamInfo.getKeyFormat());
        response.setValueFormat(streamInfo.getValueFormat());

        return response;
    }
}
