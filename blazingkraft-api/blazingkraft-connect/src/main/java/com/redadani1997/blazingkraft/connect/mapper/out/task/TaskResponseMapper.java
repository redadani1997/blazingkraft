package com.redadani1997.blazingkraft.connect.mapper.out.task;

import com.fasterxml.jackson.core.type.TypeReference;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskInfoApiResponse;
import com.redadani1997.blazingkraft.connect.task.openapi.model.TaskStateApiResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TaskResponseMapper {
    public List<TaskInfoApiResponse> taskInfoApiResponses(String json) {
        TaskInfoApiResponse[] responses = CommonCastingUtils.cast(json, TaskInfoApiResponse[].class);

        return Arrays.asList(responses);
    }

    public TaskStateApiResponse taskStateApiResponse(String json) {
        return CommonCastingUtils.cast(json, TaskStateApiResponse.class);
    }

    public Map<String, Map<String, String>> tasksConfigApiResponse(String json) {
        TypeReference<Map<String, Map<String, String>>> typeRef = new TypeReference<>() {};

        return CommonCastingUtils.castWithTypeReference(json, typeRef);
    }
}
