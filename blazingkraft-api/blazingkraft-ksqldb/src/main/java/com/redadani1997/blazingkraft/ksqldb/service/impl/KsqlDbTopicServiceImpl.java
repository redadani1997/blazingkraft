package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbTopicException;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.model.KsqlDbTopicApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.topic.KsqlDbTopicResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbTopicService;
import io.confluent.ksql.api.client.TopicInfo;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbTopicServiceImpl implements KsqlDbTopicService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<KsqlDbTopicApiResponse> getAllKsqlDbTopics() {
        try {
            List<TopicInfo> topicInfos =
                    this.currentKsqlDbClient().client().listTopics().get(7, TimeUnit.SECONDS);
            return this.ksqlDbTopicResponseMapper().ksqlDbTopicApiResponses(topicInfos);
        } catch (ExecutionException ex) {
            throw new KsqlDbTopicException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbTopicException(ex);
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbTopicResponseMapper ksqlDbTopicResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbTopicResponseMapper();
    }
}
