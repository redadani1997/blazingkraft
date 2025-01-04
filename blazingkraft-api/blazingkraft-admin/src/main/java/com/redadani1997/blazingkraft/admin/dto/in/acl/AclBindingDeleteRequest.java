package com.redadani1997.blazingkraft.admin.dto.in.acl;

import lombok.Builder;
import lombok.Getter;
import org.apache.kafka.common.acl.AccessControlEntryFilter;
import org.apache.kafka.common.resource.ResourcePatternFilter;

@Builder
@Getter
public class AclBindingDeleteRequest {

    private AccessControlEntryFilter accessControlEntryFilter;

    private ResourcePatternFilter resourcePatternFilter;
}
