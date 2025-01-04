package com.redadani1997.blazingkraft.common.encoder;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CommonPasswordEncoder {

    private final PasswordEncoder passwordEncoder;

    public CommonPasswordEncoder() {
        this.passwordEncoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A, 10);
    }

    public String encode(String password) {
        return this.passwordEncoder.encode(password);
    }

    public boolean matches(String rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword.isEmpty()) {
            return false;
        }
        return this.passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
