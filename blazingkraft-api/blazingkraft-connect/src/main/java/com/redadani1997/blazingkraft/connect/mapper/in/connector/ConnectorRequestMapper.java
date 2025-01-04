package com.redadani1997.blazingkraft.connect.mapper.in.connector;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.connect.connector.openapi.model.ConnectorTasksMonitoringApiRequest;
import com.redadani1997.blazingkraft.connect.connector.openapi.model.CreateConnectorApiRequest;
import com.redadani1997.blazingkraft.connect.dto.in.connect.*;
import com.redadani1997.blazingkraft.connect.enums.ConnectorType;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConnectorRequestMapper {
    private final AuditLogService auditLogService;

    public ConnectorCreateRequest connectorCreateRequest(CreateConnectorApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getName());

        CommonValidator.assertNotBlank("Connector Name", apiRequest.getName());
        return ConnectorCreateRequest.builder()
                .config(apiRequest.getConfig())
                .name(apiRequest.getName())
                .build();
    }

    public ConnectorDestroyRequest connectorDestroyRequest(String connector) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorDestroyRequest.builder().connector(connector).build();
    }

    public ConnectorGetRequest connectorGetRequest(String connector) {
        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorGetRequest.builder().connector(connector).build();
    }

    public ConnectorGetActiveTopicsRequest connectorGetActiveTopicsRequest(String connector) {
        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorGetActiveTopicsRequest.builder().connector(connector).build();
    }

    public ConnectorGetConfigRequest connectorGetConfigRequest(String connector) {
        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorGetConfigRequest.builder().connector(connector).build();
    }

    public ConnectorGetStatusRequest connectorGetStatusRequest(String connector) {
        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorGetStatusRequest.builder().connector(connector).build();
    }

    public ConnectorPauseRequest connectorPauseRequest(String connector) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorPauseRequest.builder().connector(connector).build();
    }

    public ConnectorPutConfigRequest connectorPutConfigRequest(
            String connector, Map<String, String> requestBody) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorPutConfigRequest.builder()
                .connector(connector)
                .requestBody(requestBody)
                .build();
    }

    public ConnectorResetActiveTopicsRequest connectorResetActiveTopicsRequest(String connector) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorResetActiveTopicsRequest.builder().connector(connector).build();
    }

    public ConnectorRestartRequest connectorRestartRequest(
            String connector, Boolean includeTasks, Boolean onlyFailed) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);

        return ConnectorRestartRequest.builder()
                .connector(connector)
                .includeTasks(includeTasks)
                .onlyFailed(onlyFailed)
                .build();
    }

    public ConnectorResumeRequest connectorResumeRequest(String connector) {
        this.auditLogService.setSubject(connector);

        CommonValidator.assertNotBlank("Connector Name", connector);
        return ConnectorResumeRequest.builder().connector(connector).build();
    }

    public ConnectorTasksMonitoringRequest connectorTasksMonitoringRequest(
            String connector, ConnectorTasksMonitoringApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Connector Name", connector);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Connector Type", apiRequest.getConnectorType());
        CommonValidator.assertNotNull("Connector Tasks", apiRequest.getTasks());

        ConnectorType connectorType =
                EnumUtils.fromName(ConnectorType.class, apiRequest.getConnectorType());

        return ConnectorTasksMonitoringRequest.builder()
                .connector(connector)
                .connectorType(connectorType)
                .tasks(apiRequest.getTasks())
                .build();
    }
}
