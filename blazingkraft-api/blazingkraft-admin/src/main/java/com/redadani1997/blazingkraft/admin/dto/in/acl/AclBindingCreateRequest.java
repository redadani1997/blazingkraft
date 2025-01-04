package com.redadani1997.blazingkraft.admin.dto.in.acl;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.acl.AccessControlEntry;
import org.apache.kafka.common.resource.ResourcePattern;

@NoArgsConstructor
@Data
public class AclBindingCreateRequest {
    private ResourcePattern pattern;
    private AccessControlEntry entry;
}
