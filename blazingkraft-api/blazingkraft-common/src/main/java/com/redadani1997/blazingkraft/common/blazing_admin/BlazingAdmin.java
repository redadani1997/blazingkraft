package com.redadani1997.blazingkraft.common.blazing_admin;

import com.redadani1997.blazingkraft.common.constant.CommonEnvConstants;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class BlazingAdmin {
    private String email;
    private String password;

    public BlazingAdmin(Environment environment) {
        this.email = environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_ADMIN_EMAIL, "admin");
        this.password =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_ADMIN_PASSWORD, "admin");
    }

    public boolean isBlazingAdmin(String email, String password) {
        return this.email.equals(email) && this.password.equals(password);
    }

    public boolean isBlazingAdmin(String email) {
        return this.email.equals(email);
    }
}
