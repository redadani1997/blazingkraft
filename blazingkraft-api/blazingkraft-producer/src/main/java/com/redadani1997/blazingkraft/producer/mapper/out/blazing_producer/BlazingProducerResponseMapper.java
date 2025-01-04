package com.redadani1997.blazingkraft.producer.mapper.out.blazing_producer;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.RecordDataApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.RecordMetadataApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.TopicPartitionApiResponse;
import java.util.Map;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.springframework.stereotype.Component;

@Component
public class BlazingProducerResponseMapper {
    public BlazingProductionApiResponse blazingProductionResponse(RecordMetadata recordMetadata) {
        BlazingProductionApiResponse response = new BlazingProductionApiResponse();

        RecordMetadataApiResponse recordMetadataApiResponse =
                this.recordMetadataApiResponse(recordMetadata);

        response.setRecordMetadata(recordMetadataApiResponse);

        return response;
    }

    public RecordMetadataApiResponse recordMetadataApiResponse(RecordMetadata recordMetadata) {
        RecordMetadataApiResponse recordMetadataApiResponse = new RecordMetadataApiResponse();

        recordMetadataApiResponse.setTimestamp(recordMetadata.timestamp());
        recordMetadataApiResponse.setSerializedKeySize(recordMetadata.serializedKeySize());
        recordMetadataApiResponse.setSerializedValueSize(recordMetadata.serializedValueSize());
        recordMetadataApiResponse.setOffset(recordMetadata.offset());

        TopicPartitionApiResponse topicPartitionApiResponse = new TopicPartitionApiResponse();
        topicPartitionApiResponse.setPartition(recordMetadata.partition());
        topicPartitionApiResponse.setTopic(recordMetadata.topic());

        recordMetadataApiResponse.setTopicPartition(topicPartitionApiResponse);

        return recordMetadataApiResponse;
    }

    public RecordDataApiResponse recordDataApiResponse(
            String key, String value, Map<String, Object> headers) {
        RecordDataApiResponse recordDataApiResponse = new RecordDataApiResponse();

        recordDataApiResponse.setKey(key);
        recordDataApiResponse.setValue(value);
        recordDataApiResponse.setHeaders(CommonCastingUtils.toJsonString(headers));

        return recordDataApiResponse;
    }
}
