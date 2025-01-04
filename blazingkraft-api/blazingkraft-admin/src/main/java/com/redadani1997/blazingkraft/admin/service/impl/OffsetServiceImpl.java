package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetsListRequest;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.offset.OffsetResponseMapper;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetApiResponse;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse;
import com.redadani1997.blazingkraft.admin.service.OffsetService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.DeleteConsumerGroupOffsetsResult;
import org.apache.kafka.clients.admin.ListConsumerGroupOffsetsOptions;
import org.apache.kafka.clients.admin.ListOffsetsOptions;
import org.apache.kafka.clients.admin.ListOffsetsResult;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OffsetServiceImpl implements OffsetService {

    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public void alterConsumerGroupOffsets(
            OffsetConsumerGroupAlterRequest offsetConsumerGroupAlterRequest) {
        KafkaFutureUtils.resolve(
                this.currentAdminClient()
                        .client()
                        .alterConsumerGroupOffsets(
                                offsetConsumerGroupAlterRequest.getGroupId(),
                                offsetConsumerGroupAlterRequest.getOffsetsByTopicPartition())
                        .all(),
                KafkaFutureMode.ADMIN);
    }

    @Override
    public List<OffsetInfoApiResponse> listTopicPartitionsOffsets(
            OffsetsListRequest offsetsListRequest) {
        ListOffsetsOptions listOffsetsOptions =
                new ListOffsetsOptions(offsetsListRequest.getIsolationLevel());

        Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> offsets =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient()
                                .client()
                                .listOffsets(offsetsListRequest.getTopicPartitionOffsets(), listOffsetsOptions)
                                .all(),
                        KafkaFutureMode.ADMIN);

        return this.offsetResponseMapper().offsetInfoApiResponses(offsets);
    }

    @Override
    public List<OffsetApiResponse> listConsumerGroupOffsets(String consumerGroup) {
        ListConsumerGroupOffsetsOptions listConsumerGroupOffsetsOptions =
                new ListConsumerGroupOffsetsOptions();
        Map<TopicPartition, OffsetAndMetadata> offsets =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient()
                                .client()
                                .listConsumerGroupOffsets(consumerGroup)
                                .partitionsToOffsetAndMetadata(),
                        KafkaFutureMode.ADMIN);
        return this.offsetResponseMapper().offsetApiResponses(offsets);
    }

    @Override
    public void deleteConsumerGroupOffsets(
            OffsetConsumerGroupDeleteRequest offsetConsumerGroupDeleteRequest) {
        DeleteConsumerGroupOffsetsResult deleteConsumerGroupOffsetsResult =
                this.currentAdminClient()
                        .client()
                        .deleteConsumerGroupOffsets(
                                offsetConsumerGroupDeleteRequest.getConsumerGroup(),
                                offsetConsumerGroupDeleteRequest.getTopicPartitions());
        KafkaFutureUtils.resolve(deleteConsumerGroupOffsetsResult.all(), KafkaFutureMode.ADMIN);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private OffsetResponseMapper offsetResponseMapper() {
        return this.adminResponseMapper.offsetResponseMapper();
    }
}
