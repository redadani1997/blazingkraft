package com.redadani1997.blazingkraft.ksqldb.mapper.out.topic;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.model.KsqlDbTopicApiResponse;
import io.confluent.ksql.api.client.TopicInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbTopicResponseMapper {
    public List<KsqlDbTopicApiResponse> ksqlDbTopicApiResponses(List<TopicInfo> topicInfos) {
        if (topicInfos == null) {
            return Collections.emptyList();
        }
        return topicInfos.stream().map(this::ksqlDbTopicApiResponse).toList();
    }

    public KsqlDbTopicApiResponse ksqlDbTopicApiResponse(TopicInfo topicInfo) {
        if (topicInfo == null) {
            return null;
        }
        KsqlDbTopicApiResponse response = new KsqlDbTopicApiResponse();

        response.setName(topicInfo.getName());
        response.setPartitions(topicInfo.getPartitions());
        Integer replicas =
                topicInfo.getReplicasPerPartition() != null
                        ? topicInfo.getReplicasPerPartition().stream().reduce(0, Integer::sum)
                        : 0;
        response.setReplicas(replicas);

        return response;
    }
}
