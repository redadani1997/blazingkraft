package com.redadani1997.blazingkraft.resourceserver.listener;

import com.redadani1997.blazingkraft.common.application_event.OIDCProviderCacheInvalidatedApplicationEvent;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.resourceserver.configuration.CommonAuthenticationManagerResolver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResourceServerApplicationListener {

    private final CommonAuthenticationManagerResolver commonAuthenticationManagerResolver;

    @EventListener
    public void oidcProviderCacheInvalidatedApplicationEvent(
            OIDCProviderCacheInvalidatedApplicationEvent event) {
        log.info(
                CommonLogUtils.getInfo(
                        "OIDC Providers updated, invalidating issuers in resource server ..."));
        this.commonAuthenticationManagerResolver.invalidateIssuers();
    }
}
