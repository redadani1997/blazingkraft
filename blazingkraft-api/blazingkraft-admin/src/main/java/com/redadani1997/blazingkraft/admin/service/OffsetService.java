package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetsListRequest;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetApiResponse;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse;
import java.util.List;

public interface OffsetService {
    void alterConsumerGroupOffsets(OffsetConsumerGroupAlterRequest offsetConsumerGroupAlterRequest);

    List<OffsetInfoApiResponse> listTopicPartitionsOffsets(OffsetsListRequest offsetsListRequest);

    List<OffsetApiResponse> listConsumerGroupOffsets(String consumerGroup);

    void deleteConsumerGroupOffsets(
            OffsetConsumerGroupDeleteRequest offsetConsumerGroupDeleteRequest);
}
