package com.redadani1997.blazingkraft.admin.mapper.out.offset;

import com.redadani1997.blazingkraft.admin.mapper.out.partition.PartitionResponseMapper;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetApiResponse;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.kafka.clients.admin.ListOffsetsResult;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Component;

@Component
public class OffsetResponseMapper {

    private final PartitionResponseMapper partitionResponseMapper;

    public OffsetResponseMapper(PartitionResponseMapper partitionResponseMapper) {
        this.partitionResponseMapper = partitionResponseMapper;
    }

    public List<OffsetApiResponse> offsetApiResponses(
            Map<TopicPartition, OffsetAndMetadata> offsets) {
        if (offsets == null) {
            return null;
        }
        List<OffsetApiResponse> responses = new ArrayList<>();

        offsets
                .keySet()
                .forEach(
                        topicPartition -> {
                            OffsetAndMetadata offsetAndMetadata = offsets.get(topicPartition);
                            OffsetApiResponse offsetApiResponse = new OffsetApiResponse();
                            offsetApiResponse.setTopic(topicPartition.topic());
                            offsetApiResponse.setPartition(topicPartition.partition());
                            offsetApiResponse.setLeaderEpoch(offsetAndMetadata.leaderEpoch().orElse(0));
                            offsetApiResponse.setMetadata(offsetAndMetadata.metadata());
                            offsetApiResponse.setOffset(offsetAndMetadata.offset());
                            responses.add(offsetApiResponse);
                        });
        return responses;
    }

    public List<OffsetInfoApiResponse> offsetInfoApiResponses(
            Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> offsets) {
        if (offsets == null) {
            return null;
        }
        List<OffsetInfoApiResponse> responses = new ArrayList<>();

        offsets
                .keySet()
                .forEach(
                        topicPartition -> {
                            ListOffsetsResult.ListOffsetsResultInfo offset = offsets.get(topicPartition);
                            OffsetInfoApiResponse offsetInfoApiResponse = new OffsetInfoApiResponse();
                            offsetInfoApiResponse.setTopic(topicPartition.topic());
                            offsetInfoApiResponse.setPartition(topicPartition.partition());
                            offsetInfoApiResponse.setLeaderEpoch(offset.leaderEpoch().orElse(0));
                            offsetInfoApiResponse.setTimestamp(offset.timestamp());
                            offsetInfoApiResponse.setOffset(offset.offset());
                            responses.add(offsetInfoApiResponse);
                        });
        return responses;
    }
}
