package com.redadani1997.blazingkraft.connect.dto.in.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskGetConfigsRequest {
    private String connector;
}
