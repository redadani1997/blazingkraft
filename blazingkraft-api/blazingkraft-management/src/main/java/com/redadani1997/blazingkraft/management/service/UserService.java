package com.redadani1997.blazingkraft.management.service;

import com.redadani1997.blazingkraft.management.dto.in.user.*;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserApiResponse;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserMetaApiResponse;
import java.util.List;

public interface UserService {
    UserMetaApiResponse createUser(UserCreateRequest request);

    void deleteUser(UserDeleteRequest request);

    UserMetaApiResponse editUser(UserEditRequest request);

    UserMetaApiResponse editUserPassword(UserEditPasswordRequest request);

    UserMetaApiResponse editUserPasswordWithoutCurrent(UserEditPasswordWithoutCurrentRequest request);

    List<UserMetaApiResponse> getAllUsers();

    UserApiResponse getUserDetails(UserDetailsRequest request);
}
