package com.redadani1997.blazingkraft.admin.dto.in.consumer_group;

import lombok.Builder;
import lombok.Getter;
import org.apache.kafka.clients.admin.MemberToRemove;

@Builder
@Getter
public class ConsumerGroupRemoveMemberRequest {
    private String consumerGroup;

    private MemberToRemove member;

    private String reason;
}
