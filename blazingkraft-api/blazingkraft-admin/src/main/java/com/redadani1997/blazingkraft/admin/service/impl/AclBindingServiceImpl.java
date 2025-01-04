package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingGetRequest;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.acl.AclBindingResponseMapper;
import com.redadani1997.blazingkraft.admin.service.AclBindingService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.CreateAclsResult;
import org.apache.kafka.clients.admin.DescribeAclsResult;
import org.apache.kafka.common.acl.AclBinding;
import org.apache.kafka.common.acl.AclBindingFilter;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AclBindingServiceImpl implements AclBindingService {

    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public AclBindingApiResponse createAclBinding(AclBindingCreateRequest request) {
        AclBinding aclBinding = new AclBinding(request.getPattern(), request.getEntry());

        CreateAclsResult createAclsResult =
                this.currentAdminClient().client().createAcls(Collections.singleton(aclBinding));
        KafkaFutureUtils.resolve(createAclsResult.all(), KafkaFutureMode.ADMIN);

        return this.aclBindingResponseMapper().aclBindingApiResponse(aclBinding);
    }

    @Override
    public List<AclBindingApiResponse> getAclBindings(AclBindingGetRequest request) {
        AclBindingFilter aclBindingFilter =
                new AclBindingFilter(
                        request.getResourcePatternFilter(), request.getAccessControlEntryFilter());
        DescribeAclsResult describeAclsResult =
                this.currentAdminClient().client().describeAcls(aclBindingFilter);
        Collection<AclBinding> aclBindings =
                KafkaFutureUtils.resolve(describeAclsResult.values(), KafkaFutureMode.ADMIN);
        return this.aclBindingResponseMapper().aclBindingApiResponses(aclBindings);
    }

    @Override
    public void deleteAclBinding(AclBindingDeleteRequest aclBindingDeleteRequest) {
        AclBindingFilter aclBindingFilter =
                new AclBindingFilter(
                        aclBindingDeleteRequest.getResourcePatternFilter(),
                        aclBindingDeleteRequest.getAccessControlEntryFilter());
        this.currentAdminClient().client().deleteAcls(Collections.singleton(aclBindingFilter));
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private AclBindingResponseMapper aclBindingResponseMapper() {
        return this.adminResponseMapper.aclBindingResponseMapper();
    }
}
