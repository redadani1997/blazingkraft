package com.redadani1997.blazingkraft.management.mapper.out.data_masking;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingApiResponse;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataMaskingResponseMapper {

    public DataMaskingApiResponse dataMaskingApiResponse(DataMaskingModel model) {
        if (model == null) {
            return null;
        }

        DataMaskingApiResponse response = new DataMaskingApiResponse();

        response.setCode(model.getCode());
        response.setName(model.getName());
        response.setDataMaskingType(model.getDataMaskingType());
        response.setRule(model.getRule());
        response.setRuleType(model.getRuleType());
        response.setResult(model.getResult());
        response.setTopicType(model.getTopicType());
        response.setTopic(model.getTopic());

        return response;
    }

    public List<DataMaskingApiResponse> dataMaskingApiResponses(List<DataMaskingModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::dataMaskingApiResponse).toList();
    }

    public List<DataMaskingApiResponse> dataMaskingApiResponsesFromCache(
            List<DataMaskingDomain> domains) {
        if (domains == null) {
            return Collections.emptyList();
        }
        return domains.stream().map(this::dataMaskingApiResponseFromCache).toList();
    }

    public DataMaskingApiResponse dataMaskingApiResponseFromCache(DataMaskingDomain domain) {
        if (domain == null) {
            return null;
        }

        DataMaskingApiResponse response = new DataMaskingApiResponse();

        response.setCode(domain.getCode());
        response.setName(domain.getName());
        response.setDataMaskingType(EnumUtils.toName(domain.getDataMaskingType()));
        response.setRule(domain.getRule());
        response.setRuleType(EnumUtils.toName(domain.getRuleType()));
        response.setResult(EnumUtils.toName(domain.getResult()));
        response.setTopicType(EnumUtils.toName(domain.getTopicType()));
        response.setTopic(domain.getTopic());

        return response;
    }
}
