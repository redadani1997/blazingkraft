package com.redadani1997.blazingkraft.datamasking.service;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import java.util.List;
import java.util.Map;

public interface DataMasker {

    String mask(String data, List<DataMaskingDomain> rules);

    Map<String, Object> mask(Map<String, Object> data, List<DataMaskingDomain> rules);
}
