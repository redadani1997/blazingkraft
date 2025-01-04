package com.redadani1997.blazingkraft.cache.service.impl;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.cache.mapper.OIDCProviderDomainMapper;
import com.redadani1997.blazingkraft.cache.service.OIDCProviderCache;
import com.redadani1997.blazingkraft.cache.system.SystemOIDCProviderConfiguration;
import com.redadani1997.blazingkraft.common.application_event.OIDCProviderCacheInvalidatedApplicationEvent;
import com.redadani1997.blazingkraft.dao.dao.OIDCProviderDao;
import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OIDCProviderCacheImpl implements OIDCProviderCache {

    private final OIDCProviderDao dao;
    private final OIDCProviderDomainMapper domainMapper;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final SystemOIDCProviderConfiguration systemOIDCProviderConfiguration;
    private List<OIDCProviderDomain> cache;

    @Override
    public List<OIDCProviderDomain> get() {
        if (this.cache == null) {
            List<OIDCProviderModel> models = this.dao.findAll();
            this.cache = this.domainMapper.oidcProviderDomains(models);

            OIDCProviderDomain systemOIDCProviderDomain = this.getSystem();

            if (systemOIDCProviderDomain != null) {
                this.cache.add(systemOIDCProviderDomain);
            }
        }
        return this.cache;
    }

    @Override
    public OIDCProviderDomain getSystem() {
        return this.systemOIDCProviderConfiguration.getSystemOIDCProviderDomain();
    }

    @Override
    public void invalidate() {
        this.cache = null;

        OIDCProviderCacheInvalidatedApplicationEvent event =
                new OIDCProviderCacheInvalidatedApplicationEvent();
        this.applicationEventPublisher.publishEvent(event);
    }
}
