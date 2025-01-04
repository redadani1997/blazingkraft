package com.redadani1997.blazingkraft.management.mapper.out.group;

import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupApiResponse;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupMetaApiResponse;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupUserMetaApiResponse;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GroupResponseMapper {
    public List<GroupMetaApiResponse> groupMetaApiResponses(List<GroupModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::groupMetaApiResponse).toList();
    }

    public GroupMetaApiResponse groupMetaApiResponse(GroupModel model) {
        Long numberOfUsers = model.getUsers() != null ? (long) model.getUsers().size() : 0;
        Long numberOfPermissions =
                (long)
                        (CommonPermissionUtils.constructPermissions(model.getClusterPermissions()).size()
                                + CommonPermissionUtils.constructPermissions(model.getKafkaConnectPermissions())
                                        .size()
                                + CommonPermissionUtils.constructPermissions(model.getSchemaRegistryPermissions())
                                        .size()
                                + CommonPermissionUtils.constructPermissions(model.getKsqlDbPermissions()).size()
                                + CommonPermissionUtils.constructPermissions(model.getManagementPermissions())
                                        .size()
                                + CommonPermissionUtils.constructPermissions(model.getPlaygroundPermissions())
                                        .size());

        GroupMetaApiResponse response = new GroupMetaApiResponse();

        response.setCode(model.getCode());
        response.setName(model.getName());
        response.setDescription(model.getDescription());
        response.setNumberOfUsers(numberOfUsers);
        response.setNumberOfPermissions(numberOfPermissions);

        return response;
    }

    public GroupApiResponse groupApiResponse(GroupModel model) {
        GroupApiResponse response = new GroupApiResponse();

        response.setCode(model.getCode());
        response.setName(model.getName());
        response.setDescription(model.getDescription());
        response.setClusterPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getClusterPermissions()));
        response.setKafkaConnectPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKafkaConnectPermissions()));
        response.setSchemaRegistryPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getSchemaRegistryPermissions()));
        response.setKsqlDbPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKsqlDbPermissions()));
        response.setManagementPermissions(
                CommonPermissionUtils.constructPermissions(model.getManagementPermissions()));
        response.setPlaygroundPermissions(
                CommonPermissionUtils.constructPermissions(model.getPlaygroundPermissions()));

        response.setUsersMeta(this.userMetaApiResponses(model.getUsers()));

        return response;
    }

    private GroupUserMetaApiResponse userMetaApiResponse(UserModel model) {
        GroupUserMetaApiResponse response = new GroupUserMetaApiResponse();
        response.setEmail(model.getEmail());
        response.setCreatedBy(model.getCreatedBy());
        response.setCreationTime(model.getCreationTime());
        response.setUpdatedBy(model.getUpdatedBy());
        response.setUpdateTime(model.getUpdateTime());
        return response;
    }

    private List<GroupUserMetaApiResponse> userMetaApiResponses(List<UserModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::userMetaApiResponse).toList();
    }
}
