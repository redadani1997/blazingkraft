package com.redadani1997.blazingkraft.connect.dto.in.connect;

import com.redadani1997.blazingkraft.connect.enums.ConnectorType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConnectorTasksMonitoringRequest {

    private String connector;

    private ConnectorType connectorType;

    private List<Integer> tasks;
}
