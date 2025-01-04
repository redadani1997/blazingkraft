package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingGetRequest;
import java.util.List;

public interface AclBindingService {

    AclBindingApiResponse createAclBinding(AclBindingCreateRequest aclBindingCreateRequest);

    List<AclBindingApiResponse> getAclBindings(AclBindingGetRequest aclBindingGetRequest);

    void deleteAclBinding(AclBindingDeleteRequest aclBindingDeleteRequest);
}
