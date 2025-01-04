package com.redadani1997.blazingkraft.management.service.impl;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.common.blazing_admin.BlazingAdmin;
import com.redadani1997.blazingkraft.common.encoder.CommonPasswordEncoder;
import com.redadani1997.blazingkraft.common.util.CommonTimeUtils;
import com.redadani1997.blazingkraft.dao.dao.GroupDao;
import com.redadani1997.blazingkraft.dao.dao.UserDao;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.error.management.UserException;
import com.redadani1997.blazingkraft.management.dto.in.user.*;
import com.redadani1997.blazingkraft.management.mapper.out.ManagementResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.user.UserResponseMapper;
import com.redadani1997.blazingkraft.management.service.UserService;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserApiResponse;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserMetaApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao dao;
    private final GroupDao groupDao;
    private final ManagementResponseMapper managementResponseMapper;
    private final CommonPasswordEncoder passwordEncoder;
    private final BlazingAdmin blazingAdmin;
    private final CurrentUserFacade currentUserFacade;

    @Override
    public UserMetaApiResponse createUser(UserCreateRequest request) {
        if (this.blazingAdmin.isBlazingAdmin(request.getEmail())) {
            throw new UserException(String.format("User '%s' already exists!", request.getEmail()));
        }

        GroupModel groupModel = this.groupDao.findByCode(request.getGroupCode());

        Long now = CommonTimeUtils.now();

        UserModel model = new UserModel();
        model.setGroupModel(groupModel);
        model.setEmail(request.getEmail());
        model.setPassword(this.passwordEncoder.encode(request.getPassword()));
        model.setFirstName(request.getFirstName());
        model.setLastName(request.getLastName());
        model.setCreationTime(now);
        model.setCreatedBy(this.currentUserFacade.currentUser().getIdentifier());
        model.setUpdateTime(now);
        model.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());

        UserModel savedModel = this.dao.create(model);

        return this.responseMapper().userMetaApiResponse(savedModel);
    }

    @Override
    public void deleteUser(UserDeleteRequest request) {
        UserModel userModel = this.dao.findByEmail(request.getEmail());
        this.dao.deleteById(userModel.getId());
    }

    @Override
    public UserMetaApiResponse editUser(UserEditRequest request) {
        if (this.blazingAdmin.isBlazingAdmin(request.getNewEmail())) {
            throw new UserException(String.format("User '%s' already exists!", request.getNewEmail()));
        }
        GroupModel groupModel = this.groupDao.findByCode(request.getGroupCode());

        UserModel model = this.dao.findByEmail(request.getCurrentEmail());

        if (!request.getNewEmail().equals(request.getCurrentEmail())) {
            Boolean newCodeExists = this.dao.existsByEmail(request.getNewEmail());
            if (newCodeExists) {
                throw new UserException(String.format("User '%s' already exists!", request.getNewEmail()));
            }
        }

        Long now = CommonTimeUtils.now();

        model.setGroupModel(groupModel);
        model.setEmail(request.getNewEmail());
        model.setFirstName(request.getFirstName());
        model.setLastName(request.getLastName());
        model.setUpdateTime(now);
        model.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());

        UserModel savedModel = this.dao.update(model);

        return this.responseMapper().userMetaApiResponse(savedModel);
    }

    @Override
    public UserMetaApiResponse editUserPassword(UserEditPasswordRequest request) {
        UserModel model = this.dao.findByEmail(request.getEmail());

        Long now = CommonTimeUtils.now();

        if (model.getPassword() != null
                && !this.passwordEncoder.matches(request.getCurrentPassword(), model.getPassword())) {
            throw new UserException(
                    String.format("Current password is invalid for email '%s'", request.getEmail()));
        }

        model.setPassword(this.passwordEncoder.encode(request.getPassword()));
        model.setUpdateTime(now);
        model.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());

        UserModel savedModel = this.dao.update(model);

        return this.responseMapper().userMetaApiResponse(savedModel);
    }

    @Override
    public UserMetaApiResponse editUserPasswordWithoutCurrent(
            UserEditPasswordWithoutCurrentRequest request) {
        UserModel model = this.dao.findByEmail(request.getEmail());

        Long now = CommonTimeUtils.now();

        model.setPassword(this.passwordEncoder.encode(request.getPassword()));
        model.setUpdateTime(now);
        model.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());

        UserModel savedModel = this.dao.update(model);

        return this.responseMapper().userMetaApiResponse(savedModel);
    }

    @Override
    public List<UserMetaApiResponse> getAllUsers() {
        List<UserModel> models = this.dao.findAll();
        return this.responseMapper().userMetaApiResponses(models);
    }

    @Override
    public UserApiResponse getUserDetails(UserDetailsRequest request) {
        UserModel model = this.dao.findByEmail(request.getEmail());
        return this.responseMapper().userApiResponse(model);
    }

    private UserResponseMapper responseMapper() {
        return this.managementResponseMapper.userResponseMapper();
    }
}
