package com.redadani1997.blazingkraft.connect.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectClient;
import com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectCode;
import com.redadani1997.blazingkraft.common.actions.kafka_connect.ConnectorActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetConfigsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetStatusRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetTasksConfigRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskRestartRequest;
import com.redadani1997.blazingkraft.connect.mapper.in.KafkaConnectRequestMapper;
import com.redadani1997.blazingkraft.connect.mapper.in.task.TaskRequestMapper;
import com.redadani1997.blazingkraft.connect.service.TaskService;
import com.redadani1997.blazingkraft.connect.task.openapi.api.KafkaConnectTaskApi;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskInfoApiResponse;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskStateApiResponse;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KafkaConnectTaskController implements KafkaConnectTaskApi {
    private final TaskService taskService;
    private final KafkaConnectRequestMapper kafkaConnectRequestMapper;

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<List<TaskInfoApiResponse>> getTaskConfigs(String connector) {

        TaskGetConfigsRequest request = this.taskRequestMapper().taskGetConfigsRequest(connector);

        List<TaskInfoApiResponse> responses = this.taskService.getTaskConfigs(request);

        return ResponseEntity.ok(responses);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<TaskStateApiResponse> getTaskStatus(String connector, Integer task) {

        TaskGetStatusRequest request = this.taskRequestMapper().taskGetStatusRequest(connector, task);

        TaskStateApiResponse response = this.taskService.getTaskStatus(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithKafkaConnectClient
    @WithAuthorization(
            permission = ConnectorActions.DESCRIBE_CONNECTORS,
            type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Map<String, Map<String, String>>> getTasksConfig(String connector) {

        TaskGetTasksConfigRequest request =
                this.taskRequestMapper().taskGetTasksConfigRequest(connector);

        Map<String, Map<String, String>> response = this.taskService.getTasksConfig(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @WithKafkaConnectCode
    @WithAudit(
            action = ConnectorActions.RESTART_TASK,
            type = EntityType.KAFKA_CONNECT,
            severity = AuditSeverity.LOW)
    @WithKafkaConnectClient
    @WithAuthorization(permission = ConnectorActions.RESTART_TASK, type = EntityType.KAFKA_CONNECT)
    @Override
    public ResponseEntity<Void> restartTask(String connector, Integer task) {

        TaskRestartRequest request = this.taskRequestMapper().taskRestartRequest(connector, task);

        this.taskService.restartTask(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    public TaskRequestMapper taskRequestMapper() {
        return this.kafkaConnectRequestMapper.taskRequestMapper();
    }
}
