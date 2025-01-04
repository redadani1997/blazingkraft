package com.redadani1997.blazingkraft.management.mapper.out.user;

import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserApiResponse;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserMetaApiResponse;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserResponseMapper {
    public List<UserMetaApiResponse> userMetaApiResponses(List<UserModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::userMetaApiResponse).toList();
    }

    public UserMetaApiResponse userMetaApiResponse(UserModel model) {
        UserMetaApiResponse response = new UserMetaApiResponse();
        response.setEmail(model.getEmail());
        response.setFirstName(model.getFirstName());
        response.setLastName(model.getLastName());
        response.setGroupCode(model.getGroupModel() != null ? model.getGroupModel().getCode() : null);
        response.setGroupName(model.getGroupModel() != null ? model.getGroupModel().getName() : null);
        return response;
    }

    public UserApiResponse userApiResponse(UserModel model) {
        UserApiResponse response = new UserApiResponse();
        response.setEmail(model.getEmail());
        response.setFirstName(model.getFirstName());
        response.setLastName(model.getLastName());
        response.setCreatedBy(model.getCreatedBy());
        response.setCreationTime(model.getCreationTime());
        response.setUpdatedBy(model.getUpdatedBy());
        response.setUpdateTime(model.getUpdateTime());
        response.setGroupCode(model.getGroupModel() != null ? model.getGroupModel().getCode() : null);
        response.setGroupName(model.getGroupModel() != null ? model.getGroupModel().getName() : null);
        return response;
    }
}
