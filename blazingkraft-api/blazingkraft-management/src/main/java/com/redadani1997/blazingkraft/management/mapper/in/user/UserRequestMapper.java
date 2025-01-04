package com.redadani1997.blazingkraft.management.mapper.in.user;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.management.dto.in.user.*;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserCreateApiRequest;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserEditApiRequest;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserEditPasswordApiRequest;
import com.redadani1997.blazingkraft.management.user.openapi.model.UserEditPasswordWithoutCurrentApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRequestMapper {
    private final AuditLogService auditLogService;

    public UserCreateRequest userCreateRequest(UserCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getEmail());

        CommonValidator.assertNotBlank("Email", apiRequest.getEmail());
        CommonValidator.assertNotBlank("First Name", apiRequest.getFirstName());
        CommonValidator.assertNotBlank("Last Name", apiRequest.getLastName());
        CommonValidator.assertNotBlank("Group Code", apiRequest.getGroupCode());
        CommonValidator.assertNotBlank("Password", apiRequest.getPassword());
        CommonValidator.assertNotBlank("Password Confirm", apiRequest.getPasswordConfirm());
        CommonValidator.assertTwoWayEquals(
                "Password", "Password Confirm", apiRequest.getPassword(), apiRequest.getPasswordConfirm());

        UserCreateRequest request = new UserCreateRequest();
        request.setEmail(apiRequest.getEmail());
        request.setFirstName(apiRequest.getFirstName());
        request.setLastName(apiRequest.getLastName());
        request.setGroupCode(apiRequest.getGroupCode());
        request.setPassword(apiRequest.getPassword());
        request.setPasswordConfirm(apiRequest.getPasswordConfirm());
        return request;
    }

    public UserDeleteRequest userDeleteRequest(String email) {
        this.auditLogService.setSubject(email);

        CommonValidator.assertNotBlank("Email", email);
        UserDeleteRequest request = new UserDeleteRequest();
        request.setEmail(email);
        return request;
    }

    public UserEditRequest userEditRequest(String email, UserEditApiRequest apiRequest) {
        this.auditLogService.setSubject(email);

        CommonValidator.assertNotBlank("Current Email", email);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("New Email", apiRequest.getEmail());
        CommonValidator.assertNotBlank("First Name", apiRequest.getFirstName());
        CommonValidator.assertNotBlank("Last Name", apiRequest.getLastName());
        CommonValidator.assertNotBlank("Group Code", apiRequest.getGroupCode());

        UserEditRequest request = new UserEditRequest();
        request.setCurrentEmail(email);
        request.setNewEmail(apiRequest.getEmail());
        request.setFirstName(apiRequest.getFirstName());
        request.setLastName(apiRequest.getLastName());
        request.setGroupCode(apiRequest.getGroupCode());
        return request;
    }

    public UserEditPasswordRequest userEditPasswordRequest(
            String email, UserEditPasswordApiRequest apiRequest) {
        this.auditLogService.setSubject(email);

        CommonValidator.assertNotBlank("Email", email);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Current Password", apiRequest.getCurrentPassword());
        CommonValidator.assertNotBlank("New Password", apiRequest.getPassword());
        CommonValidator.assertNotBlank("New Password Confirm", apiRequest.getPasswordConfirm());
        CommonValidator.assertTwoWayEquals(
                "Password", "Password Confirm", apiRequest.getPassword(), apiRequest.getPasswordConfirm());

        UserEditPasswordRequest request = new UserEditPasswordRequest();
        request.setEmail(email);
        request.setCurrentPassword(apiRequest.getCurrentPassword());
        request.setPassword(apiRequest.getPassword());
        request.setPasswordConfirm(apiRequest.getPasswordConfirm());
        return request;
    }

    public UserEditPasswordWithoutCurrentRequest userEditPasswordWithoutCurrentRequest(
            String email, UserEditPasswordWithoutCurrentApiRequest apiRequest) {
        this.auditLogService.setSubject(email);

        CommonValidator.assertNotBlank("Email", email);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("New Password", apiRequest.getPassword());
        CommonValidator.assertNotBlank("New Password Confirm", apiRequest.getPasswordConfirm());
        CommonValidator.assertTwoWayEquals(
                "Password", "Password Confirm", apiRequest.getPassword(), apiRequest.getPasswordConfirm());

        UserEditPasswordWithoutCurrentRequest request = new UserEditPasswordWithoutCurrentRequest();
        request.setEmail(email);
        request.setPassword(apiRequest.getPassword());
        request.setPasswordConfirm(apiRequest.getPasswordConfirm());
        return request;
    }

    public UserDetailsRequest userDetailsRequest(String email) {
        CommonValidator.assertNotBlank("Email", email);
        UserDetailsRequest request = new UserDetailsRequest();
        request.setEmail(email);
        return request;
    }
}
