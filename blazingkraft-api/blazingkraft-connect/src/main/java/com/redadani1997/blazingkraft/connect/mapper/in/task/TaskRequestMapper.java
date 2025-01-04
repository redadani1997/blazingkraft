package com.redadani1997.blazingkraft.connect.mapper.in.task;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetConfigsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetStatusRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskGetTasksConfigRequest;
import com.redadani1997.blazingkraft.connect.dto.in.task.TaskRestartRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TaskRequestMapper {
    private final AuditLogService auditLogService;

    public TaskGetConfigsRequest taskGetConfigsRequest(String connector) {
        CommonValidator.assertNotNull("Connector Name", connector);
        return TaskGetConfigsRequest.builder().connector(connector).build();
    }

    public TaskGetStatusRequest taskGetStatusRequest(String connector, Integer task) {
        CommonValidator.assertNotNull("Connector Name", connector);
        CommonValidator.assertNotNull("Task", task);
        return TaskGetStatusRequest.builder().connector(connector).task(task).build();
    }

    public TaskGetTasksConfigRequest taskGetTasksConfigRequest(String connector) {
        CommonValidator.assertNotNull("Connector Name", connector);
        return TaskGetTasksConfigRequest.builder().connector(connector).build();
    }

    public TaskRestartRequest taskRestartRequest(String connector, Integer task) {
        String subject = String.format("Connector: '%s', Task: '%d'", connector, task);
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotNull("Connector Name", connector);
        CommonValidator.assertNotNull("Task", task);
        return TaskRestartRequest.builder().connector(connector).task(task).build();
    }
}
