package com.redadani1997.blazingkraft.cache.service;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import java.util.List;

public interface OIDCProviderCache {
    List<OIDCProviderDomain> get();

    OIDCProviderDomain getSystem();

    void invalidate();
}
