package com.redadani1997.blazingkraft.ksqldb.mapper.in.connector;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorCreateRequest;
import com.redadani1997.blazingkraft.ksqldb.dto.in.connector.KsqlDbConnectorDeleteRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorCreateApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbConnectorRequestMapper {
    private final AuditLogService auditLogService;

    public KsqlDbConnectorCreateRequest ksqlDbConnectorCreateRequest(
            KsqlDbConnectorCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getConnectorName());

        CommonValidator.assertNotBlank("Connector Name", apiRequest.getConnectorName());

        return KsqlDbConnectorCreateRequest.builder()
                .connectorName(apiRequest.getConnectorName())
                .isSource(apiRequest.getIsSource() != null && apiRequest.getIsSource())
                .properties(apiRequest.getProperties())
                .build();
    }

    public KsqlDbConnectorDeleteRequest ksqlDbConnectorDeleteRequest(String connectorName) {
        this.auditLogService.setSubject(connectorName);

        CommonValidator.assertNotBlank("Connector Name", connectorName);

        return KsqlDbConnectorDeleteRequest.builder().connectorName(connectorName).build();
    }
}
