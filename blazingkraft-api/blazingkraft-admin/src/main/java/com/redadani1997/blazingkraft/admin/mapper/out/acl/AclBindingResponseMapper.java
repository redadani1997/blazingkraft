package com.redadani1997.blazingkraft.admin.mapper.out.acl;

import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingApiResponse;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.common.acl.AccessControlEntry;
import org.apache.kafka.common.acl.AclBinding;
import org.apache.kafka.common.resource.ResourcePattern;
import org.springframework.stereotype.Component;

@Component
public class AclBindingResponseMapper {

    public AclBindingApiResponse aclBindingApiResponse(AclBinding aclBinding) {
        if (aclBinding == null) {
            return null;
        }

        ResourcePattern resourcePattern = aclBinding.pattern();
        AccessControlEntry accessControlEntry = aclBinding.entry();

        AclBindingApiResponse response = new AclBindingApiResponse();
        response.setResourceName(resourcePattern.name());
        response.setResourceType(EnumUtils.toName(resourcePattern.resourceType()));
        response.setPatternType(EnumUtils.toName(resourcePattern.patternType()));
        response.setPrincipal(accessControlEntry.principal());
        response.setHost(accessControlEntry.host());
        response.setOperation(EnumUtils.toName(accessControlEntry.operation()));
        response.setPermissionType(EnumUtils.toName(accessControlEntry.permissionType()));

        return response;
    }

    public List<AclBindingApiResponse> aclBindingApiResponses(Collection<AclBinding> aclBindings) {
        if (aclBindings == null) {
            return Collections.emptyList();
        }
        return aclBindings.stream().map(this::aclBindingApiResponse).collect(Collectors.toList());
    }
}
