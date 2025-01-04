package com.redadani1997.blazingkraft.authorization.facade;

import com.redadani1997.blazingkraft.cache.domain.GroupDomain;
import com.redadani1997.blazingkraft.cache.service.GroupCache;
import com.redadani1997.blazingkraft.common.constant.CommonClaimConstants;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.error.common.CastingException;
import com.redadani1997.blazingkraft.error.management.GroupException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserFacadeImpl implements CurrentUserFacade {
    private ThreadLocal<CurrentUser> localCurrentUser = new ThreadLocal<>();
    private final GroupCache groupCache;

    @Override
    public CurrentUser currentUser() {
        CurrentUser currentUser = this.localCurrentUser.get();
        if (currentUser != null) {
            return currentUser;
        }
        JwtAuthenticationToken jwtAuthenticationToken =
                (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        currentUser = constructCurrentUser(jwtAuthenticationToken);

        this.localCurrentUser.set(currentUser);

        return currentUser;
    }

    @Override
    public CurrentUser constructCurrentUser(JwtAuthenticationToken authentication) {
        Map<String, Object> claims = authentication.getTokenAttributes();

        CurrentUser currentUser = new CurrentUser();

        String identifier = this.computeIdentifier(claims);
        currentUser.setIdentifier(identifier);
        currentUser.setDisplayedName(this.computeDisplayedName(claims, identifier));
        currentUser.setIssuer(this.getStringClaim(claims, CommonClaimConstants.ISSUER_CLAIM));
        currentUser.setPicture(this.getStringClaim(claims, CommonClaimConstants.PICTURE_CLAIM));

        currentUser.setIsBlazingAdmin(
                this.getBooleanClaim(claims, CommonClaimConstants.BLAZINGKRAFT_ADMIN_CLAIM));

        if (currentUser.getIsBlazingAdmin()) {
            currentUser.setHasGroup(false);
        } else {
            String blazingkraftGroup =
                    this.getStringClaim(claims, CommonClaimConstants.BLAZINGKRAFT_GROUP_CLAIM);
            if (blazingkraftGroup == null) {
                currentUser.setHasGroup(false);
            } else {
                currentUser.setHasGroup(true);
                currentUser.setGroup(blazingkraftGroup);
                this.setPermissions(blazingkraftGroup, currentUser);
            }
        }

        return currentUser;
    }

    @Override
    public void setCurrentWSUser(CurrentUser currentUser) {
        this.localCurrentUser.set(currentUser);
    }

    private String computeIdentifier(Map<String, Object> claims) {
        String email = this.getStringClaim(claims, CommonClaimConstants.EMAIL_CLAIM);
        if (email != null) {
            return email;
        }
        String mail = this.getStringClaim(claims, CommonClaimConstants.MAIL_CLAIM);
        if (mail != null) {
            return mail;
        }
        String preferredUsername =
                this.getStringClaim(claims, CommonClaimConstants.PREFERRED_USERNAME_CLAIM);
        if (preferredUsername != null) {
            return preferredUsername;
        }
        String id = this.getStringClaim(claims, CommonClaimConstants.ID_CLAIM);
        if (id != null) {
            return id;
        }
        String givenName = this.getStringClaim(claims, CommonClaimConstants.GIVEN_NAME_CLAIM);
        if (givenName != null) {
            return givenName;
        }
        String familyName = this.getStringClaim(claims, CommonClaimConstants.FAMILY_NAME_CLAIM);
        if (familyName != null) {
            return familyName;
        }
        String name = this.getStringClaim(claims, CommonClaimConstants.NAME_CLAIM);
        if (name != null) {
            return name;
        }
        return null;
    }

    private String computeDisplayedName(Map<String, Object> claims, String identifier) {
        String preferredUsername =
                this.getStringClaim(claims, CommonClaimConstants.PREFERRED_USERNAME_CLAIM);
        if (preferredUsername != null) {
            return preferredUsername;
        }

        String givenName = this.getStringClaim(claims, CommonClaimConstants.GIVEN_NAME_CLAIM);
        String familyName = this.getStringClaim(claims, CommonClaimConstants.FAMILY_NAME_CLAIM);

        if (givenName != null && familyName != null) {
            return givenName + " " + familyName;
        }

        if (givenName != null) {
            return givenName;
        }
        if (familyName != null) {
            return familyName;
        }
        String name = this.getStringClaim(claims, CommonClaimConstants.NAME_CLAIM);
        if (name != null) {
            return name;
        }
        return identifier;
    }

    private void setPermissions(String blazingkraftGroup, CurrentUser currentUser) {
        try {
            GroupDomain groupDomain = this.groupCache.get(blazingkraftGroup);

            currentUser.setClusterPermissions(groupDomain.getClusterPermissions());
            currentUser.setKafkaConnectPermissions(groupDomain.getKafkaConnectPermissions());
            currentUser.setSchemaRegistryPermissions(groupDomain.getSchemaRegistryPermissions());
            currentUser.setKsqlDbPermissions(groupDomain.getKsqlDbPermissions());
            currentUser.setManagementPermissions(groupDomain.getManagementPermissions());
            currentUser.setPlaygroundPermissions(groupDomain.getPlaygroundPermissions());

        } catch (CastingException | GroupException ex) {
            // TODO: handle exception
        }
    }

    private String getStringClaim(Map<String, Object> claims, String claim) {
        Object claimObject = claims.get(claim);
        if (claimObject == null) {
            return null;
        }
        return claimObject.toString();
    }

    private Boolean getBooleanClaim(Map<String, Object> claims, String claim) {
        Object claimObject = claims.get(claim);
        if (claimObject == null) {
            return false;
        }
        try {
            return Boolean.valueOf(claimObject.toString());
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public void cleanUp() {
        this.localCurrentUser.remove();
    }
}
