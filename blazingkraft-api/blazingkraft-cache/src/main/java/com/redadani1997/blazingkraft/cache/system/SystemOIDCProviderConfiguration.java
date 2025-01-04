package com.redadani1997.blazingkraft.cache.system;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.common.constant.CommonEnvConstants;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.error.management.OIDCProviderException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Getter
@Component
@Slf4j
public class SystemOIDCProviderConfiguration {
    private final OIDCProviderDomain systemOIDCProviderDomain;

    public SystemOIDCProviderConfiguration(Environment environment) {

        String code = code(environment);

        if (code == null) {
            systemOIDCProviderDomain = null;
            return;
        }

        String name = this.name(environment, code);

        String issuer = issuer(environment);

        boolean pkceEnabled = pkceEnabled(environment);

        String clientId = clientId(environment);

        String clientSecret = clientSecret(environment);

        String providerType = providerType(environment);

        List<String> scopes = scopes(environment);

        this.systemOIDCProviderDomain = new OIDCProviderDomain();

        this.systemOIDCProviderDomain.setCode(code);
        this.systemOIDCProviderDomain.setName(name);
        this.systemOIDCProviderDomain.setIssuer(issuer);
        this.systemOIDCProviderDomain.setClientId(clientId);
        this.systemOIDCProviderDomain.setClientSecret(clientSecret);
        this.systemOIDCProviderDomain.setPkceEnabled(pkceEnabled);
        this.systemOIDCProviderDomain.setProviderType(providerType);
        this.systemOIDCProviderDomain.setScopes(scopes);
        this.systemOIDCProviderDomain.setSystem(true);

        log.info(
                CommonLogUtils.getInfo(
                        String.format(
                                "Successfully configured System OpenID Connect Provider with Code => '%s'.",
                                code)));
    }

    private String code(Environment environment) {
        String code = environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_CODE);
        if (code == null) {
            return null;
        }

        if (code.equalsIgnoreCase("blazingkraft")) {
            String error = "System OpenID Connect Provider Code cannot be 'blazingkraft'";
            log.error(CommonLogUtils.getError(error));
            throw new OIDCProviderException(error);
        }

        String expression = "^[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(code);
        boolean matchFound = matcher.find();

        if (!matchFound) {
            String error =
                    String.format(
                            "System OpenID Connect Provider Code => '%s' should match pattern '^[a-zA-Z0-9]+$'",
                            code);
            log.error(CommonLogUtils.getError(error));
            throw new OIDCProviderException(error);
        }

        log.info(
                CommonLogUtils.getInfo(
                        String.format(
                                "Found System OpenID Connect Provider with Code => '%s', Continuing Configuration...",
                                code)));
        return code;
    }

    private String name(Environment environment, String code) {
        String name = environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_NAME, code);

        log.info(String.format("System OpenID Connect Provider Name set to => '%s'", name));

        return name;
    }

    private String issuer(Environment environment) {
        String issuer = environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_ISSUER);

        if (issuer == null) {
            String error =
                    "System OpenID Connect Provider is missing the 'BLAZINGKRAFT_OIDC_PROVIDER_ISSUER' property.";
            log.error(CommonLogUtils.getError(error));
            throw new OIDCProviderException(error);
        }

        return issuer;
    }

    private boolean pkceEnabled(Environment environment) {
        String pkceEnabledStr =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_PKCE_ENABLED);
        boolean pkceEnabled = false;

        if (pkceEnabledStr == null) {
            log.info("System OpenID Connect Provider PKCE Enabled is not set, defaulting to false");
        } else {
            try {
                pkceEnabled = Boolean.parseBoolean(pkceEnabledStr);
            } catch (Exception ex) {
                String error =
                        String.format(
                                "System OpenID Connect Provider PKCE Enabled is set to '%s' which is not a valid boolean value.",
                                pkceEnabledStr);
                log.error(CommonLogUtils.getError(error));
                throw new OIDCProviderException(error);
            }
            log.info(
                    String.format("System OpenID Connect Provider PKCE Enabled set to => '%s'", pkceEnabled));
        }
        return pkceEnabled;
    }

    private String clientId(Environment environment) {
        String clientId =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_CLIENT_ID);

        if (clientId == null) {
            String error =
                    "System OpenID Connect Provider is missing the 'BLAZINGKRAFT_OIDC_PROVIDER_CLIENT_ID' property.";
            log.error(CommonLogUtils.getError(error));
            throw new OIDCProviderException(error);
        }

        log.info(String.format("System OpenID Connect Provider Client ID set to => '%s'", clientId));

        return clientId;
    }

    private String clientSecret(Environment environment) {
        String clientSecret =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_CLIENT_SECRET);

        if (clientSecret != null) {
            log.info("System OpenID Connect Provider Client Secret is set");
        }

        return clientSecret;
    }

    private String providerType(Environment environment) {
        String providerType =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_PROVIDER_TYPE);

        if (providerType != null) {
            log.info(String.format("System OpenID Connect Provider Type set to => '%s'", providerType));
        }

        return providerType;
    }

    private List<String> scopes(Environment environment) {
        String scopesStr =
                environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_OIDC_PROVIDER_SCOPES);

        if (scopesStr == null) {
            log.info(
                    "System OpenID Connect Provider Scopes are not set, defaulting to [ openid, offline_access ]");
            return List.of("openid", "offline_access");
        }

        String[] scopesArray = scopesStr.split(";;;");

        List<String> readOnlyScopes = Arrays.asList(scopesArray);
        ArrayList<String> scopes = new ArrayList<>(readOnlyScopes);

        if (!scopes.contains("openid")) {
            log.info("System OpenID Connect Provider Scopes do not contain 'openid', adding it..");
            scopes.add("openid");
        }

        if (!scopes.contains("offline_access")) {
            log.info(
                    "System OpenID Connect Provider Scopes do not contain 'offline_access', adding it..");
            scopes.add("offline_access");
        }

        log.info(String.format("System OpenID Connect Provider Scopes set to => '%s'", scopes));
        return scopes;
    }
}
