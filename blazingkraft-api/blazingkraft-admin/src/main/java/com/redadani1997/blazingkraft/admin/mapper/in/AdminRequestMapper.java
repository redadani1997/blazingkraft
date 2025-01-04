package com.redadani1997.blazingkraft.admin.mapper.in;

import com.redadani1997.blazingkraft.admin.mapper.in.acl.AclBindingRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.cluster.ClusterRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.consumer_group.ConsumerGroupRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.delegation_token.DelegationTokenRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.export_import_cluster.ExportImportClusterRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.offset.OffsetRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.quota.QuotaRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.topic.TopicRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminRequestMapper {
    private final AclBindingRequestMapper aclRequestMapper;
    private final TopicRequestMapper topicRequestMapper;
    private final ConsumerGroupRequestMapper consumerGroupRequestMapper;
    private final OffsetRequestMapper offsetRequestMapper;
    private final ClusterRequestMapper clusterRequestMapper;
    private final DelegationTokenRequestMapper delegationTokenRequestMapper;
    private final QuotaRequestMapper quotaRequestMapper;
    private final ExportImportClusterRequestMapper exportImportClusterRequestMapper;

    public AclBindingRequestMapper aclBindingRequestMapper() {
        return this.aclRequestMapper;
    }

    public TopicRequestMapper topicRequestMapper() {
        return this.topicRequestMapper;
    }

    public ConsumerGroupRequestMapper consumerGroupRequestMapper() {
        return this.consumerGroupRequestMapper;
    }

    public OffsetRequestMapper offsetRequestMapper() {
        return this.offsetRequestMapper;
    }

    public ClusterRequestMapper clusterRequestMapper() {
        return this.clusterRequestMapper;
    }

    public DelegationTokenRequestMapper delegationTokenRequestMapper() {
        return this.delegationTokenRequestMapper;
    }

    public QuotaRequestMapper quotaRequestMapper() {
        return this.quotaRequestMapper;
    }

    public ExportImportClusterRequestMapper exportImportClusterRequestMapper() {
        return this.exportImportClusterRequestMapper;
    }
}
