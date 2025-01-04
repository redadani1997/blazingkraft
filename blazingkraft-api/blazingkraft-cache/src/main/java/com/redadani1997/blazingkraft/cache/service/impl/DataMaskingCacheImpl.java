package com.redadani1997.blazingkraft.cache.service.impl;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.cache.mapper.DataMaskingDomainMapper;
import com.redadani1997.blazingkraft.cache.service.DataMaskingCache;
import com.redadani1997.blazingkraft.common.enums.DataMaskingType;
import com.redadani1997.blazingkraft.dao.dao.DataMaskingDao;
import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataMaskingCacheImpl implements DataMaskingCache {

    private final DataMaskingDao dao;
    private final DataMaskingDomainMapper domainMapper;
    private List<DataMaskingDomain> consumerKeyRulesCache;
    private List<DataMaskingDomain> consumerValueRulesCache;
    private List<DataMaskingDomain> ksqlDbQueryRulesCache;

    @Override
    public List<DataMaskingDomain> getConsumerKeyRules() {
        if (this.consumerKeyRulesCache == null) {
            List<DataMaskingModel> models = this.dao.findAll();

            this.consumerKeyRulesCache =
                    this.domainMapper.dataMaskingDomains(models).stream()
                            .filter(domain -> DataMaskingType.CONSUMER_KEY.equals(domain.getDataMaskingType()))
                            .toList();
        }
        return this.consumerKeyRulesCache;
    }

    @Override
    public List<DataMaskingDomain> getConsumerValueRules() {
        if (this.consumerValueRulesCache == null) {
            List<DataMaskingModel> models = this.dao.findAll();

            this.consumerValueRulesCache =
                    this.domainMapper.dataMaskingDomains(models).stream()
                            .filter(domain -> DataMaskingType.CONSUMER_VALUE.equals(domain.getDataMaskingType()))
                            .toList();
        }
        return this.consumerValueRulesCache;
    }

    @Override
    public List<DataMaskingDomain> getKsqlDbQueryRules() {
        if (this.ksqlDbQueryRulesCache == null) {
            List<DataMaskingModel> models = this.dao.findAll();

            this.ksqlDbQueryRulesCache =
                    this.domainMapper.dataMaskingDomains(models).stream()
                            .filter(domain -> DataMaskingType.KSQLDB_QUERY.equals(domain.getDataMaskingType()))
                            .toList();
        }
        return this.ksqlDbQueryRulesCache;
    }

    @Override
    public void invalidate() {
        this.consumerKeyRulesCache = null;
        this.consumerValueRulesCache = null;
        this.ksqlDbQueryRulesCache = null;
    }
}
