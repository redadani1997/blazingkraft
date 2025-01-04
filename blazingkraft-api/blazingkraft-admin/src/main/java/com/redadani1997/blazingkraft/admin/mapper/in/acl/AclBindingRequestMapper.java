package com.redadani1997.blazingkraft.admin.mapper.in.acl;

import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingCreateApiRequest;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingDeleteApiRequest;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingListingApiRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingGetRequest;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.acl.AccessControlEntry;
import org.apache.kafka.common.acl.AccessControlEntryFilter;
import org.apache.kafka.common.acl.AclOperation;
import org.apache.kafka.common.acl.AclPermissionType;
import org.apache.kafka.common.resource.PatternType;
import org.apache.kafka.common.resource.ResourcePattern;
import org.apache.kafka.common.resource.ResourcePatternFilter;
import org.apache.kafka.common.resource.ResourceType;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AclBindingRequestMapper {
    private final AuditLogService auditLogService;

    public AclBindingGetRequest aclBindingGetRequest(AclBindingListingApiRequest apiRequest) {
        CommonValidator.assertNotNull("AclBindingListingApiRequest", apiRequest);

        CommonValidator.assertNotEmpty("Permission Type", apiRequest.getPermissionType());
        CommonValidator.assertNotEmpty("Resource Type", apiRequest.getResourceType());
        CommonValidator.assertNotEmpty("Pattern Type", apiRequest.getPatternType());
        CommonValidator.assertNotEmpty("Operation", apiRequest.getOperation());

        AccessControlEntryFilter accessControlEntryFilter =
                new AccessControlEntryFilter(
                        apiRequest.getPrincipal(),
                        apiRequest.getHost(),
                        EnumUtils.fromName(AclOperation.class, apiRequest.getOperation()),
                        EnumUtils.fromName(AclPermissionType.class, apiRequest.getPermissionType()));

        ResourcePatternFilter resourcePatternFilter =
                new ResourcePatternFilter(
                        EnumUtils.fromName(ResourceType.class, apiRequest.getResourceType()),
                        apiRequest.getResourceName(),
                        EnumUtils.fromName(PatternType.class, apiRequest.getPatternType()));

        return AclBindingGetRequest.builder()
                .accessControlEntryFilter(accessControlEntryFilter)
                .resourcePatternFilter(resourcePatternFilter)
                .build();
    }

    public AclBindingDeleteRequest aclBindingDeleteRequest(AclBindingDeleteApiRequest apiRequest) {
        CommonValidator.assertNotNull("AclBindingDeleteApiRequest", apiRequest);

        this.handleSubject(
                apiRequest.getPrincipal(),
                apiRequest.getHost(),
                apiRequest.getOperation(),
                apiRequest.getPermissionType(),
                apiRequest.getResourceType(),
                apiRequest.getResourceName(),
                apiRequest.getPatternType());

        CommonValidator.assertNotEmpty("Permission Type", apiRequest.getPermissionType());
        CommonValidator.assertNotEmpty("Resource Type", apiRequest.getResourceType());
        CommonValidator.assertNotEmpty("Pattern Type", apiRequest.getPatternType());
        CommonValidator.assertNotEmpty("Operation", apiRequest.getOperation());

        AccessControlEntryFilter accessControlEntryFilter =
                new AccessControlEntryFilter(
                        apiRequest.getPrincipal(),
                        apiRequest.getHost(),
                        EnumUtils.fromName(AclOperation.class, apiRequest.getOperation()),
                        EnumUtils.fromName(AclPermissionType.class, apiRequest.getPermissionType()));

        ResourcePatternFilter resourcePatternFilter =
                new ResourcePatternFilter(
                        EnumUtils.fromName(ResourceType.class, apiRequest.getResourceType()),
                        apiRequest.getResourceName(),
                        EnumUtils.fromName(PatternType.class, apiRequest.getPatternType()));

        return AclBindingDeleteRequest.builder()
                .accessControlEntryFilter(accessControlEntryFilter)
                .resourcePatternFilter(resourcePatternFilter)
                .build();
    }

    public AclBindingCreateRequest aclBindingCreateRequest(AclBindingCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("AclBindingCreateApiRequest", apiRequest);

        this.handleSubject(
                apiRequest.getPrincipal(),
                apiRequest.getHost(),
                apiRequest.getOperation(),
                apiRequest.getPermissionType(),
                apiRequest.getResourceType(),
                apiRequest.getResourceName(),
                apiRequest.getPatternType());

        CommonValidator.assertNotEmpty("Principal", apiRequest.getPrincipal());
        CommonValidator.assertNotEmpty("Permission Type", apiRequest.getPermissionType());
        CommonValidator.assertNotEmpty("Resource Type", apiRequest.getResourceType());
        CommonValidator.assertNotEmpty("Pattern Type", apiRequest.getPatternType());
        CommonValidator.assertNotEmpty("Host", apiRequest.getHost());
        CommonValidator.assertNotEmpty("Resource Name", apiRequest.getResourceName());
        CommonValidator.assertNotEmpty("Operation", apiRequest.getOperation());

        AccessControlEntry accessControlEntry =
                new AccessControlEntry(
                        apiRequest.getPrincipal(),
                        apiRequest.getHost(),
                        EnumUtils.fromName(AclOperation.class, apiRequest.getOperation()),
                        EnumUtils.fromName(AclPermissionType.class, apiRequest.getPermissionType()));

        ResourcePattern resourcePattern =
                new ResourcePattern(
                        EnumUtils.fromName(ResourceType.class, apiRequest.getResourceType()),
                        apiRequest.getResourceName(),
                        EnumUtils.fromName(PatternType.class, apiRequest.getPatternType()));

        AclBindingCreateRequest computedAclBindingCreateRequest = new AclBindingCreateRequest();
        computedAclBindingCreateRequest.setEntry(accessControlEntry);
        computedAclBindingCreateRequest.setPattern(resourcePattern);

        return computedAclBindingCreateRequest;
    }

    private void handleSubject(
            String principal,
            String host,
            String operation,
            String permissionType,
            String resourceType,
            String resourceName,
            String patternType) {
        String subject =
                String.format(
                        "Principal: '%s', Host: '%s', Operation: '%s', Permission Type: '%s', Resource Type: '%s', Resource Name: '%s', Pattern Type: '%s'",
                        principal, host, operation, permissionType, resourceType, resourceName, patternType);
        this.auditLogService.setSubject(subject);
    }
}
