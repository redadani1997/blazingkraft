package com.redadani1997.blazingkraft.authserver.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.LoginRequest;
import com.redadani1997.blazingkraft.authserver.dto.in.authserver.RefreshTokenRequest;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.JwksKeysApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.OpenIDConfigurationApiResponse;
import com.redadani1997.blazingkraft.authserver.dto.out.authserver.TokensApiResponse;
import com.redadani1997.blazingkraft.authserver.mapper.out.authserver.AuthServerResponseMapper;
import com.redadani1997.blazingkraft.authserver.service.AuthServerService;
import com.redadani1997.blazingkraft.common.blazing_admin.BlazingAdmin;
import com.redadani1997.blazingkraft.common.constant.CommonClaimConstants;
import com.redadani1997.blazingkraft.common.encoder.CommonPasswordEncoder;
import com.redadani1997.blazingkraft.common.util.CommonRequestUtils;
import com.redadani1997.blazingkraft.dao.dao.UserDao;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.error.authserver.LoginException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class AuthServerServiceImpl implements AuthServerService {
    private final AuthServerResponseMapper authServerResponseMapper;
    private final UserDao userDao;
    private final CommonPasswordEncoder passwordEncoder;
    private final RSAKey rsaKey;
    private final BlazingAdmin blazingAdmin;

    public AuthServerServiceImpl(
            AuthServerResponseMapper authServerResponseMapper,
            UserDao userDao,
            CommonPasswordEncoder passwordEncoder,
            @Qualifier("authServerRSAKey") RSAKey rsaKey,
            BlazingAdmin blazingAdmin) {
        this.authServerResponseMapper = authServerResponseMapper;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.rsaKey = rsaKey;
        this.blazingAdmin = blazingAdmin;
    }

    @Override
    public TokensApiResponse login(LoginRequest request) {
        try {
            String email = request.getEmail();
            String password = request.getPassword();

            JWTClaimsSet idTokenClaims = null;

            if (this.blazingAdmin.isBlazingAdmin(email, password)) {
                idTokenClaims = this.blazingAdminIdTokenClaims(email);
            } else {
                UserModel userModel = this.userDao.findByEmail(email);

                if (!this.passwordEncoder.matches(password, userModel.getPassword())) {
                    throw new LoginException("Invalid password");
                }

                idTokenClaims = this.normalIdTokenClaims(userModel);
            }

            Date now = new Date();
            Long idTokenExpiration = 2 * 24 * 60 * 60 * 1000L;
            Long refreshTokenExpiration = 4 * 24 * 60 * 60 * 1000L;

            String idToken = this.generateToken(now, idTokenExpiration, idTokenClaims);

            String refreshToken =
                    this.generateToken(now, refreshTokenExpiration, this.refreshTokenClaims(email));

            return this.authServerResponseMapper()
                    .tokensApiResponse(idToken, refreshToken, idTokenExpiration, refreshTokenExpiration);
        } catch (Exception ex) {
            throw new LoginException(ex, "Invalid Credentials");
        }
    }

    @Override
    public TokensApiResponse refreshToken(RefreshTokenRequest refreshToken) {
        try {
            JWSVerifier verifier = new RSASSAVerifier(this.rsaKey);

            SignedJWT signedJWT = SignedJWT.parse(refreshToken.getRefreshToken());

            boolean refreshTokenValid = signedJWT.verify(verifier);

            if (!refreshTokenValid) {
                throw new LoginException("Invalid refresh token");
            }

            JWTClaimsSet idTokenClaims = null;

            String email =
                    this.claimAsString(signedJWT.getJWTClaimsSet(), CommonClaimConstants.EMAIL_CLAIM);

            if (this.blazingAdmin.isBlazingAdmin(email)) {
                idTokenClaims = this.blazingAdminIdTokenClaims(email);
            } else {
                UserModel userModel = this.userDao.findByEmail(email);
                idTokenClaims = this.normalIdTokenClaims(userModel);
            }

            Long idTokenExpiration = 2 * 24 * 60 * 60 * 1000L;
            Long refreshTokenExpiration = 4 * 24 * 60 * 60 * 1000L;

            Date now = new Date();

            String idToken = this.generateToken(now, idTokenExpiration, idTokenClaims);

            String newRefreshToken =
                    this.generateToken(now, refreshTokenExpiration, this.refreshTokenClaims(email));

            return this.authServerResponseMapper()
                    .tokensApiResponse(idToken, newRefreshToken, idTokenExpiration, refreshTokenExpiration);

        } catch (Exception ex) {
            throw new LoginException(ex, "Error while refreshing token");
        }
    }

    private String claimAsString(JWTClaimsSet jwtClaimsSet, String claim) {
        Object claimValue = jwtClaimsSet.getClaim(claim);
        if (claimValue == null) {
            return null;
        }
        try {
            return String.valueOf(claimValue);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public JwksKeysApiResponse getJwks() {
        return this.authServerResponseMapper().jwksKeysApiResponse();
    }

    @Override
    public OpenIDConfigurationApiResponse getOpenIdConfiguration() {
        return this.authServerResponseMapper().openIDConfigurationApiResponse();
    }

    private String generateToken(Date now, Long tokenExpiration, JWTClaimsSet claims)
            throws Exception {
        JWSSigner signer = new RSASSASigner(this.rsaKey);

        String currentPath = CommonRequestUtils.currentPath();

        JWTClaimsSet claimsSet =
                new JWTClaimsSet.Builder(claims)
                        .issuer(currentPath + "/v1/oauth2")
                        .expirationTime(new Date(now.getTime() + tokenExpiration))
                        .issueTime(new Date())
                        .build();

        SignedJWT signedJWT =
                new SignedJWT(
                        new JWSHeader.Builder(JWSAlgorithm.RS256)
                                .type(JOSEObjectType.JWT)
                                .keyID(this.rsaKey.getKeyID())
                                .build(),
                        claimsSet);

        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    private JWTClaimsSet normalIdTokenClaims(UserModel userModel) {
        GroupModel groupModel = userModel.getGroupModel();

        return new JWTClaimsSet.Builder()
                .subject(userModel.getEmail())
                .claim(CommonClaimConstants.EMAIL_CLAIM, userModel.getEmail())
                .claim(CommonClaimConstants.GIVEN_NAME_CLAIM, userModel.getFirstName())
                .claim(CommonClaimConstants.FAMILY_NAME_CLAIM, userModel.getLastName())
                .claim(
                        CommonClaimConstants.BLAZINGKRAFT_GROUP_CLAIM,
                        groupModel != null ? groupModel.getCode() : null)
                .build();
    }

    private JWTClaimsSet blazingAdminIdTokenClaims(String email) {

        return new JWTClaimsSet.Builder()
                .subject(email)
                .claim(CommonClaimConstants.EMAIL_CLAIM, email)
                .claim(CommonClaimConstants.GIVEN_NAME_CLAIM, "Blazing KRaft")
                .claim(CommonClaimConstants.FAMILY_NAME_CLAIM, "Admin")
                .claim(CommonClaimConstants.BLAZINGKRAFT_ADMIN_CLAIM, true)
                .build();
    }

    private JWTClaimsSet refreshTokenClaims(String email) {
        return new JWTClaimsSet.Builder().subject(email).claim("email", email).build();
    }

    private AuthServerResponseMapper authServerResponseMapper() {
        return this.authServerResponseMapper;
    }
}
