package com.redadani1997.blazingkraft.connect.service;

import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetConfigsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetStatusRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetTasksConfigRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskRestartRequest;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskInfoApiResponse;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskStateApiResponse;
import java.util.List;
import java.util.Map;

public interface TaskService {
    List<TaskInfoApiResponse> getTaskConfigs(TaskGetConfigsRequest request);

    TaskStateApiResponse getTaskStatus(TaskGetStatusRequest request);

    Map<String, Map<String, String>> getTasksConfig(TaskGetTasksConfigRequest request);

    void restartTask(TaskRestartRequest request);
}
