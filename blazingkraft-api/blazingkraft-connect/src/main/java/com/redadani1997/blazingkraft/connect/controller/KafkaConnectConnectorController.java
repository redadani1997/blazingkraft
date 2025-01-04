package com.redadani1997.blazingkraft.connect.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectClient;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectCode;
import com.redadani1997.blazingkraft.common.actions.kafka_connect.ConnectorActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.connect.connector.openapi.api.KafkaConnectConnectorApi;
import com.redadani1997.blazingkraft.connect.connector.openapi.model.*;
import com.redadani1997.blazingkraft.connect.dto.in.connect.*;
import com.redadani1997.blazingkraft.connect.mapper.in.KafkaConnectRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.connector.ConnectorRequestMapper;
import com.redadani1997.blazingkraft.connect.service.ConnectorService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KafkaConnectConnectorController implements KafkaConnectConnectorApi {
    private final ConnectorService connectorService;
    private final KafkaConnectRequestMapper kafkaConnectRequestMapper;

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.CREATE_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.CREATE_CONNECTOR,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> createConnector(CreateConnectorApiRequest apiRequest) {

        ConnectorCreateRequest request =
                this.connectorRequestMapper().connectorCreateRequest(apiRequest);

        this.connectorService.createConnector(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.DESTROY_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.HIGH)
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESTROY_CONNECTOR,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> destroyConnector(String connector) {

        ConnectorDestroyRequest request =
                this.connectorRequestMapper().connectorDestroyRequest(connector);

        this.connectorService.destroyConnector(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<ConnectorInfoApiResponse> getConnector(String connector) {

        ConnectorGetRequest request = this.connectorRequestMapper().connectorGetRequest(connector);

        ConnectorInfoApiResponse response = this.connectorService.getConnector(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> getConnectorActiveTopics(String connector) {

        ConnectorGetActiveTopicsRequest request =
                this.connectorRequestMapper().connectorGetActiveTopicsRequest(connector);

        this.connectorService.getConnectorActiveTopics(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Map<String, String>> getConnectorConfig(String connector) {

        ConnectorGetConfigRequest request =
                this.connectorRequestMapper().connectorGetConfigRequest(connector);

        Map<String, String> response = this.connectorService.getConnectorConfig(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<ConnectorStateInfoApiResponse> getConnectorStatus(String connector) {
        ConnectorGetStatusRequest request =
                this.connectorRequestMapper().connectorGetStatusRequest(connector);

        ConnectorStateInfoApiResponse response = this.connectorService.getConnectorStatus(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<String>> listConnectors() {
        List<String> responses = this.connectorService.listConnectors();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<ConnectorInfoWithExpandedInfoApiResponse>>
            listConnectorsWithExpandedInfo() {
        List<ConnectorInfoWithExpandedInfoApiResponse> responses =
                this.connectorService.listConnectorsWithExpandedInfo();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<ConnectorInfoWithExpandedInfoAndStatusApiResponse>>
            listConnectorsWithExpandedInfoAndStatus() {
        List<ConnectorInfoWithExpandedInfoAndStatusApiResponse> responses =
                this.connectorService.listConnectorsWithExpandedInfoAndStatus();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<ConnectorInfoWithExpandedStatusApiResponse>>
            listConnectorsWithExpandedStatus() {
        List<ConnectorInfoWithExpandedStatusApiResponse> responses =
                this.connectorService.listConnectorsWithExpandedStatus();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Map<String, ConnectorTaskMonitoringApiResponse>> monitorConnectorTasks(
            String connector, ConnectorTasksMonitoringApiRequest apiRequest) {

        ConnectorTasksMonitoringRequest request =
                this.connectorRequestMapper().connectorTasksMonitoringRequest(connector, apiRequest);

        Map<String, ConnectorTaskMonitoringApiResponse> response =
                this.connectorService.monitorConnectorTasks(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.PAUSE_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(permission = ConnectorActions.PAUSE_CONNECTOR, type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> pauseConnector(String connector) {

        ConnectorPauseRequest request = this.connectorRequestMapper().connectorPauseRequest(connector);

        this.connectorService.pauseConnector(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.EDIT_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(permission = ConnectorActions.EDIT_CONNECTOR, type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> putConnectorConfig(
            String connector, Map<String, String> requestBody) {

        ConnectorPutConfigRequest request =
                this.connectorRequestMapper().connectorPutConfigRequest(connector, requestBody);

        this.connectorService.putConnectorConfig(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.RESET_CONNECTOR_TOPICS,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.RESET_CONNECTOR_TOPICS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> resetConnectorActiveTopics(String connector) {

        ConnectorResetActiveTopicsRequest request =
                this.connectorRequestMapper().connectorResetActiveTopicsRequest(connector);

        this.connectorService.resetConnectorActiveTopics(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.RESTART_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.RESTART_CONNECTOR,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> restartConnector(
            String connector, Boolean includeTasks, Boolean onlyFailed) {

        ConnectorRestartRequest request =
                this.connectorRequestMapper().connectorRestartRequest(connector, includeTasks, onlyFailed);

        this.connectorService.restartConnector(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.RESUME_CONNECTOR,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.MEDIUM)
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.RESUME_CONNECTOR,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> resumeConnector(String connector) {

        ConnectorResumeRequest request =
                this.connectorRequestMapper().connectorResumeRequest(connector);

        this.connectorService.resumeConnector(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private ConnectorRequestMapper connectorRequestMapper() {
        return this.kafkaConnectRequestMapper.connectorRequestMapper();
    }
}
