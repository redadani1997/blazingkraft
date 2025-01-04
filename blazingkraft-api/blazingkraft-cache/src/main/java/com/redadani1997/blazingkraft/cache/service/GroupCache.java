package com.redadani1997.blazingkraft.cache.service;

import com.redadani1997.blazingkraft.cache.domain.GroupDomain;

public interface GroupCache {
    GroupDomain get(String code);

    void invalidate(String code);
}
