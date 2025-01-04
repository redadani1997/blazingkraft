package com.redadani1997.blazingkraft.management.service.impl;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.cache.service.GroupCache;
import com.redadani1997.blazingkraft.common.util.CommonTimeUtils;
import com.redadani1997.blazingkraft.dao.dao.GroupDao;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.error.management.GroupException;
import com.redadani1997.blazingkraft.error.management.ManagementException;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDetailsRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupEditRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupApiResponse;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupMetaApiResponse;
import com.redadani1997.blazingkraft.management.mapper.out.ManagementResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.group.GroupResponseMapper;
import com.redadani1997.blazingkraft.management.service.GroupService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupDao dao;
    private final ManagementResponseMapper managementResponseMapper;
    private final GroupCache groupCache;
    private final CurrentUserFacade currentUserFacade;

    @Override
    public GroupMetaApiResponse createGroup(GroupCreateRequest request) {
        Long now = CommonTimeUtils.now();

        GroupModel groupModel = new GroupModel();
        groupModel.setCode(request.getCode());
        groupModel.setName(request.getName());
        groupModel.setDescription(request.getDescription());
        groupModel.setCreationTime(now);
        groupModel.setCreatedBy(this.currentUserFacade.currentUser().getIdentifier());
        groupModel.setUpdateTime(now);
        groupModel.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());
        groupModel.setClusterPermissions(request.getClusterPermissions());
        groupModel.setKafkaConnectPermissions(request.getKafkaConnectPermissions());
        groupModel.setSchemaRegistryPermissions(request.getSchemaRegistryPermissions());
        groupModel.setKsqlDbPermissions(request.getKsqlDbPermissions());
        groupModel.setManagementPermissions(request.getManagementPermissions());
        groupModel.setPlaygroundPermissions(request.getPlaygroundPermissions());

        GroupModel savedGroupModel = this.dao.create(groupModel);

        return this.groupResponseMapper().groupMetaApiResponse(savedGroupModel);
    }

    @Override
    public void deleteGroup(GroupDeleteRequest request) {
        this.groupCache.invalidate(request.getCode());
        GroupModel groupModel = this.dao.findByCode(request.getCode());
        List<UserModel> users = groupModel.getUsers();
        if (users != null && !users.isEmpty()) {
            throw new GroupException(String.format("Group with code '%s' has users.", request.getCode()));
        }
        this.groupCache.invalidate(request.getCode());
        this.dao.deleteById(groupModel.getId());
    }

    @Override
    public void deleteGroupWithUsers(GroupDeleteRequest request) {
        GroupModel groupModel = this.dao.findByCode(request.getCode());
        this.groupCache.invalidate(request.getCode());
        this.dao.deleteById(groupModel.getId());
    }

    @Override
    public GroupMetaApiResponse editGroup(GroupEditRequest request) {
        GroupModel groupModel = this.dao.findByCode(request.getExistingCode());
        this.groupCache.invalidate(request.getExistingCode());

        if (!request.getNewCode().equals(request.getExistingCode())) {
            Boolean newCodeExists = this.dao.existsByCode(request.getNewCode());
            if (newCodeExists) {
                throw new ManagementException(
                        String.format("Group with code '%s' already exists", request.getNewCode()));
            }
        }

        Long now = CommonTimeUtils.now();

        groupModel.setCode(request.getNewCode());
        groupModel.setName(request.getName());
        groupModel.setDescription(request.getDescription());
        groupModel.setUpdateTime(now);
        groupModel.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());
        groupModel.setClusterPermissions(request.getClusterPermissions());
        groupModel.setKafkaConnectPermissions(request.getKafkaConnectPermissions());
        groupModel.setSchemaRegistryPermissions(request.getSchemaRegistryPermissions());
        groupModel.setKsqlDbPermissions(request.getKsqlDbPermissions());
        groupModel.setManagementPermissions(request.getManagementPermissions());
        groupModel.setPlaygroundPermissions(request.getPlaygroundPermissions());

        GroupModel savedGroupModel = this.dao.update(groupModel);

        return this.groupResponseMapper().groupMetaApiResponse(savedGroupModel);
    }

    @Override
    public List<GroupMetaApiResponse> getAllGroups() {
        List<GroupModel> groupModels = this.dao.findAll();
        return this.groupResponseMapper().groupMetaApiResponses(groupModels);
    }

    @Override
    public GroupApiResponse getGroupDetails(GroupDetailsRequest request) {
        GroupModel groupModel = this.dao.findByCode(request.getCode());
        return this.groupResponseMapper().groupApiResponse(groupModel);
    }

    private GroupResponseMapper groupResponseMapper() {
        return this.managementResponseMapper.groupResponseMapper();
    }
}
