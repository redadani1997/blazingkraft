package com.redadani1997.blazingkraft.cache.service;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import java.util.List;

public interface DataMaskingCache {
    List<DataMaskingDomain> getConsumerKeyRules();

    List<DataMaskingDomain> getConsumerValueRules();

    List<DataMaskingDomain> getKsqlDbQueryRules();

    void invalidate();
}
