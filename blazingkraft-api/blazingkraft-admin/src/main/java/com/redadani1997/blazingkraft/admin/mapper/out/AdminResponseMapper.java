package com.redadani1997.blazingkraft.admin.mapper.out;

import com.redadani1997.blazingkraft.admin.mapper.out.acl.AclBindingResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.cluster.ClusterResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.consumer_group.ConsumerGroupResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.delegation_token.DelegationTokenResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.export_import_cluster.cluster.ExportImportClusterResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.offset.OffsetResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.quota.QuotaResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.topic.TopicResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminResponseMapper {
    private final AclBindingResponseMapper aclBindingResponseMapper;

    private final TopicResponseMapper topicResponseMapper;

    private final ConsumerGroupResponseMapper consumerGroupResponseMapper;

    private final OffsetResponseMapper offsetResponseMapper;

    private final ClusterResponseMapper clusterResponseMapper;

    private final DelegationTokenResponseMapper delegationTokenResponseMapper;
    private final QuotaResponseMapper quotaResponseMapper;
    private final ExportImportClusterResponseMapper exportImportClusterResponseMapper;

    public AclBindingResponseMapper aclBindingResponseMapper() {
        return this.aclBindingResponseMapper;
    }

    public TopicResponseMapper topicResponseMapper() {
        return this.topicResponseMapper;
    }

    public ConsumerGroupResponseMapper consumerGroupResponseMapper() {
        return this.consumerGroupResponseMapper;
    }

    public OffsetResponseMapper offsetResponseMapper() {
        return this.offsetResponseMapper;
    }

    public ClusterResponseMapper clusterResponseMapper() {
        return this.clusterResponseMapper;
    }

    public DelegationTokenResponseMapper delegationTokenResponseMapper() {
        return this.delegationTokenResponseMapper;
    }

    public QuotaResponseMapper quotaResponseMapper() {
        return this.quotaResponseMapper;
    }

    public ExportImportClusterResponseMapper exportImportClusterResponseMapper() {
        return this.exportImportClusterResponseMapper;
    }
}
