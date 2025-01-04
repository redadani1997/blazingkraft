package com.redadani1997.blazingkraft.authserver.controller;

import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginApiRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.RefreshTokenRequest;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.JwksKeysApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.OpenIDConfigurationApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.TokensApiResponse;
import com.redadani1997.blazingkraft.authserver.mapper.in.authserver.AuthServerRequestMapper;
import com.redadani1997.blazingkraft.authserver.service.AuthServerService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/oauth2")
public class AuthServerController {
    private final AuthServerService authServerService;
    private final AuthServerRequestMapper authServerRequestMapper;

    @PostMapping("/token")
    public ResponseEntity<TokensApiResponse> login(
            @RequestBody LoginApiRequest apiRequest, HttpServletResponse httpServletResponse)
            throws IOException {
        LoginRequest request = this.authServerRequestMapper().loginRequest(apiRequest);

        TokensApiResponse response = this.authServerService.login(request);

        Cookie cookie = new Cookie("blazingkraft_refresh_token", response.getRefresh_token());
        cookie.setHttpOnly(true);
        cookie.setMaxAge(response.getRefresh_expires_in());

        httpServletResponse.addCookie(cookie);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<TokensApiResponse> refreshToken(
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
            throws IOException {
        Cookie[] cookies = httpServletRequest.getCookies();

        String blazingKafkaRefreshToken =
                cookies != null
                        ? Arrays.stream(cookies)
                                .filter(
                                        cookie -> {
                                            return cookie.getName().equals("blazingkraft_refresh_token");
                                        })
                                .map(Cookie::getValue)
                                .findFirst()
                                .orElse(null)
                        : null;

        RefreshTokenRequest request =
                this.authServerRequestMapper().refreshTokenRequest(blazingKafkaRefreshToken);

        try {
            TokensApiResponse response = this.authServerService.refreshToken(request);

            Cookie cookie = new Cookie("blazingkraft_refresh_token", response.getRefresh_token());
            cookie.setHttpOnly(true);
            cookie.setMaxAge(response.getRefresh_expires_in());

            httpServletResponse.addCookie(cookie);

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            httpServletResponse.addCookie(new Cookie("blazingkraft_refresh_token", null));
            throw ex;
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
            throws IOException {
        httpServletResponse.addCookie(new Cookie("blazingkraft_refresh_token", null));

        return ResponseEntity.ok("LOGGED_OUT");
    }

    @GetMapping("/jwks")
    public ResponseEntity<JwksKeysApiResponse> getJwks() {
        JwksKeysApiResponse response = this.authServerService.getJwks();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/.well-known/openid-configuration")
    public ResponseEntity<OpenIDConfigurationApiResponse> getOpenIdConfiguration() {
        OpenIDConfigurationApiResponse response = this.authServerService.getOpenIdConfiguration();

        return ResponseEntity.ok(response);
    }

    private AuthServerRequestMapper authServerRequestMapper() {
        return this.authServerRequestMapper;
    }
}
