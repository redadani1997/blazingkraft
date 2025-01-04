package com.redadani1997.blazingkraft.ksqldb.mapper.out.connector;

import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model.KsqlDbConnectorApiResponse;
import io.confluent.ksql.api.client.ConnectorInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbConnectorResponseMapper {
    public List<KsqlDbConnectorApiResponse> ksqlDbConnectorApiResponses(
            List<ConnectorInfo> connectorInfos) {
        if (connectorInfos == null) {
            return Collections.emptyList();
        }
        return connectorInfos.stream().map(this::ksqlDbConnectorApiResponse).toList();
    }

    public KsqlDbConnectorApiResponse ksqlDbConnectorApiResponse(ConnectorInfo connectorInfo) {
        if (connectorInfo == null) {
            return null;
        }
        KsqlDbConnectorApiResponse response = new KsqlDbConnectorApiResponse();

        response.setName(connectorInfo.name());
        response.setClassName(connectorInfo.className());
        response.setState(connectorInfo.state());
        String type =
                connectorInfo.type() == null
                        ? null
                        : EnumUtils.getNameOrNull(connectorInfo.type().getType());
        response.setType(type);

        return response;
    }
}
