package com.redadani1997.blazingkraft.admin.mapper.in.quota;

import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaDescribeRequest;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.*;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.quota.ClientQuotaAlteration;
import org.apache.kafka.common.quota.ClientQuotaEntity;
import org.apache.kafka.common.quota.ClientQuotaFilter;
import org.apache.kafka.common.quota.ClientQuotaFilterComponent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuotaRequestMapper {
    private final AuditLogService auditLogService;

    public QuotaAlterRequest quotaAlterRequest(QuotaAlterApiRequest apiRequest) {
        CommonValidator.assertNotNull("QuotaAlterApiRequest", apiRequest);

        CommonValidator.assertNotNull("Entities", apiRequest.getEntities());

        String subject =
                String.join(
                        ";",
                        apiRequest.getEntities().stream()
                                .map(e -> e.getEntityType() + ":" + e.getEntityName())
                                .toList());
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotNull("Operations", apiRequest.getOperations());

        List<QuotaEntityApiRequest> entities = apiRequest.getEntities();
        List<QuotaOperationApiRequest> operations = apiRequest.getOperations();

        Map<String, String> entries =
                entities.stream()
                        .collect(
                                Collectors.toMap(
                                        entry -> {
                                            CommonValidator.assertNotNull("Entity Type", entry.getEntityType());
                                            return entry.getEntityType();
                                        },
                                        entry -> {
                                            CommonValidator.assertNotNull("Entity Name", entry.getEntityName());
                                            return entry.getEntityName();
                                        }));
        ClientQuotaEntity clientQuotaEntity = new ClientQuotaEntity(entries);

        Collection<ClientQuotaAlteration.Op> ops =
                operations.stream()
                        .map(
                                apiOperation -> {
                                    CommonValidator.assertNotNull("Operation Key", apiOperation.getKey());
                                    return new ClientQuotaAlteration.Op(
                                            apiOperation.getKey(), apiOperation.getValue());
                                })
                        .toList();

        ClientQuotaAlteration entry = new ClientQuotaAlteration(clientQuotaEntity, ops);

        return QuotaAlterRequest.builder()
                .validateOnly(apiRequest.getValidateOnly())
                .entries(List.of(entry))
                .build();
    }

    public QuotaDescribeRequest quotaDescribeRequest(QuotaDescribeApiRequest apiRequest) {
        CommonValidator.assertNotNull("QuotaDescribeApiRequest", apiRequest);
        CommonValidator.assertNotNull("Strict", apiRequest.getStrict());
        CommonValidator.assertNotNull("Components", apiRequest.getComponents());

        Collection<ClientQuotaFilterComponent> components =
                apiRequest.getComponents().stream().map(this::clientQuotaFilterComponent).toList();

        ClientQuotaFilter filter =
                apiRequest.getStrict()
                        ? ClientQuotaFilter.containsOnly(components)
                        : ClientQuotaFilter.contains(components);

        return QuotaDescribeRequest.builder().filter(filter).build();
    }

    private ClientQuotaFilterComponent clientQuotaFilterComponent(
            QuotaFilterComponentApiRequest apiComponent) {
        CommonValidator.assertNotNull("Component", apiComponent);
        Integer matchType = apiComponent.getMatchType();

        CommonValidator.assertNotNull("Component Type", apiComponent.getEntityType());
        CommonValidator.assertNotNull("Component Value", matchType);

        if (matchType == 0) {
            CommonValidator.assertNotNull("Component Match", apiComponent.getMatch());
            return ClientQuotaFilterComponent.ofEntity(
                    apiComponent.getEntityType(), apiComponent.getMatch());
        } else if (matchType == 1) {
            return ClientQuotaFilterComponent.ofDefaultEntity(apiComponent.getEntityType());
        } else {
            return ClientQuotaFilterComponent.ofEntityType(apiComponent.getEntityType());
        }
    }
}
