package com.redadani1997.blazingkraft.resourceserver.configuration;

import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.common.util.CommonOutputStreamUtils;
import com.redadani1997.blazingkraft.error.rest.ErrorCodes;
import com.redadani1997.blazingkraft.error.rest.RestError;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CommonAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        RestError restError = computeRestError(authException);

        CommonOutputStreamUtils.writeAndFlush(response.getOutputStream(), restError);
    }

    private RestError computeRestError(AuthenticationException authException) {
        String debugMessage =
                CommonLogUtils.getDebug(
                        String.format(
                                "Error occurred when trying to authenticate: %s", authException.getMessage()));
        log.debug(debugMessage);

        if (authException instanceof InsufficientAuthenticationException) {
            return new RestError(
                    ErrorCodes.ERROR_CODE_PREFIX + ErrorCodes.NO_TOKEN_PROVIDED_ERROR_CODE,
                    //                    authException.getMessage(),
                    "No token provided",
                    "No token provided");
        }

        return new RestError(
                ErrorCodes.ERROR_CODE_PREFIX + ErrorCodes.INVALID_TOKEN_ERROR_CODE,
                //                authException.getMessage(),
                "Invalid token",
                "Invalid token");
    }
}
