package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbStreamException;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.model.KsqlDbStreamApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.stream.KsqlDbStreamResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbStreamService;
import io.confluent.ksql.api.client.StreamInfo;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbStreamServiceImpl implements KsqlDbStreamService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbStreamApiResponse> getAllKsqlDbStreams() {
        try {
            List<StreamInfo> streamInfos =
                    this.currentKsqlDbClient().client().listStreams().get(7, TimeUnit.SECONDS);
            return this.ksqlDbStreamResponseMapper().ksqlDbStreamApiResponses(streamInfos);
        } catch (ExecutionException ex) {
            throw new KsqlDbStreamException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbStreamException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbStreamResponseMapper ksqlDbStreamResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbStreamResponseMapper();
    }
}
