package com.redadani1997.blazingkraft.cache.mapper;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.common.enums.*;
import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class DataMaskingDomainMapper {

    public List<DataMaskingDomain> dataMaskingDomains(List<DataMaskingModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::dataMaskingDomain).toList();
    }

    public DataMaskingDomain dataMaskingDomain(DataMaskingModel model) {
        if (model == null) {
            return null;
        }

        DataMaskingDomain domain = new DataMaskingDomain();

        DataMaskingType dataMaskingType =
                EnumUtils.fromName(DataMaskingType.class, model.getDataMaskingType());
        DataMaskingRuleType dataMaskingRuleType =
                EnumUtils.fromName(DataMaskingRuleType.class, model.getRuleType());
        DataMaskingResult dataMaskingResult =
                EnumUtils.fromName(DataMaskingResult.class, model.getResult());
        DataMaskingTopicType dataMaskingTopicType =
                EnumUtils.fromName(DataMaskingTopicType.class, model.getTopicType());

        domain.setCode(model.getCode());
        domain.setName(model.getName());
        domain.setDataMaskingType(dataMaskingType);
        domain.setRule(model.getRule());
        domain.setRuleType(dataMaskingRuleType);
        domain.setResult(dataMaskingResult);
        domain.setTopicType(dataMaskingTopicType);
        domain.setTopic(model.getTopic());

        return domain;
    }
}
