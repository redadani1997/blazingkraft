package com.redadani1997.blazingkraft.connect.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetConfigsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetStatusRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetTasksConfigRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskRestartRequest;
import com.redadani1997.blazingkraft.connect.mapper.out.KafkaConnectResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.task.TaskResponseMapper;
import com.redadani1997.blazingkraft.connect.service.TaskService;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskInfoApiResponse;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskStateApiResponse;
import com.redadani1997.blazingkraft.error.connect.TaskException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final KafkaConnectResponseMapper kafkaConnectResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public List<TaskInfoApiResponse> getTaskConfigs(TaskGetConfigsRequest request) {
        try {
            String url = "/connectors/{connector}/tasks";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(url, String.class, params)
                            .getBody();

            return this.taskResponseMapper().taskInfoApiResponses(json);
        } catch (Exception ex) {
            throw new TaskException(ex);
        }
    }

    @Override
    public TaskStateApiResponse getTaskStatus(TaskGetStatusRequest request) {
        try {
            String url = "/connectors/{connector}/tasks/{task}/status";

            Map<String, Object> params = new HashMap<>();
            params.put("connector", request.getConnector());
            params.put("task", request.getTask());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(url, String.class, params)
                            .getBody();

            return this.taskResponseMapper().taskStateApiResponse(json);
        } catch (Exception ex) {
            throw new TaskException(ex);
        }
    }

    @Override
    public Map<String, Map<String, String>> getTasksConfig(TaskGetTasksConfigRequest request) {
        try {
            String url = "/connectors/{connector}/tasks-config";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(url, String.class, params)
                            .getBody();

            return this.taskResponseMapper().tasksConfigApiResponse(json);
        } catch (Exception ex) {
            throw new TaskException(ex);
        }
    }

    @Override
    public void restartTask(TaskRestartRequest request) {
        try {
            String url = "/connectors/{connector}/tasks/{task}/restart";

            Map<String, Object> params = new HashMap<>();
            params.put("connector", request.getConnector());
            params.put("task", request.getTask());

            HttpEntity<HashMap> httpEntity = new HttpEntity<>(new HashMap());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.POST, httpEntity, Void.class, params);
        } catch (Exception ex) {
            throw new TaskException(ex);
        }
    }

    private CommonKafkaConnectClient currentKafkaConnectClient() {
        return this.clientsFactory.currentKafkaConnectClient();
    }

    private TaskResponseMapper taskResponseMapper() {
        return this.kafkaConnectResponseMapper.taskResponseMapper();
    }
}
