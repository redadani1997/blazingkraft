package com.redadani1997.blazingkraft.admin.mapper.out.quota;

import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaApiResponse;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaDescribeApiResponse;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaEntityApiResponse;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.quota.ClientQuotaEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuotaResponseMapper {
    public List<QuotaDescribeApiResponse> quotaDescribeApiResponses(
            Map<ClientQuotaEntity, Map<String, Double>> entities) {
        if (entities == null) {
            return Collections.emptyList();
        }
        return entities.entrySet().stream()
                .map(entry -> this.quotaDescribeApiResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

    public QuotaDescribeApiResponse quotaDescribeApiResponse(
            ClientQuotaEntity entity, Map<String, Double> quotas) {
        QuotaDescribeApiResponse response = new QuotaDescribeApiResponse();

        List<QuotaEntityApiResponse> entityApiResponses =
                entity.entries().entrySet().stream()
                        .map(
                                entry -> {
                                    QuotaEntityApiResponse entityResponse = new QuotaEntityApiResponse();
                                    entityResponse.setEntityType(entry.getKey());
                                    entityResponse.setEntityName(entry.getValue());
                                    return entityResponse;
                                })
                        .toList();
        List<QuotaApiResponse> quotasApiResponse =
                quotas.entrySet().stream()
                        .map(
                                entry -> {
                                    QuotaApiResponse quotaResponse = new QuotaApiResponse();
                                    quotaResponse.setKey(entry.getKey());
                                    quotaResponse.setValue(entry.getValue());
                                    return quotaResponse;
                                })
                        .toList();

        response.setEntities(entityApiResponses);
        response.setQuotas(quotasApiResponse);

        return response;
    }
}
