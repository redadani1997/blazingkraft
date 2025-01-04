package com.redadani1997.blazingkraft.cache.service.impl;

import com.redadani1997.blazingkraft.cache.domain.GroupDomain;
import com.redadani1997.blazingkraft.cache.mapper.GroupDomainMapper;
import com.redadani1997.blazingkraft.cache.service.GroupCache;
import com.redadani1997.blazingkraft.dao.dao.GroupDao;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupCacheImpl implements GroupCache {

    private final GroupDao dao;
    private final GroupDomainMapper domainMapper;
    private Map<String, GroupDomain> cache = new HashMap<>();

    @Override
    public GroupDomain get(String code) {
        if (this.cache.containsKey(code)) {
            return this.cache.get(code);
        }

        GroupModel groupModel = this.dao.findByCode(code);

        GroupDomain domain = this.domainMapper.groupDomain(groupModel);
        this.cache.put(code, domain);

        return domain;
    }

    @Override
    public void invalidate(String code) {
        this.cache.remove(code);
    }
}
