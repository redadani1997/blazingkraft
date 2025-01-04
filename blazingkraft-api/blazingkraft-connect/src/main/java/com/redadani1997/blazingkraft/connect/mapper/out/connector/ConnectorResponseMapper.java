package com.redadani1997.blazingkraft.connect.mapper.out.connector;

import com.fasterxml.jackson.core.type.TypeReference;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.connect.connector.openapi.model.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConnectorResponseMapper {
    public List<String> allConnectorResponses(String json) {
        String[] responses = CommonCastingUtils.cast(json, String[].class);

        return Arrays.asList(responses);
    }

    public List<ConnectorInfoWithExpandedInfoApiResponse> connectorInfoWithExpandedInfoApiResponses(
            String json) {
        TypeReference<Map<String, ConnectorInfoWithExpandedInfoApiResponse>> typeRef =
                new TypeReference<>() {};
        Map<String, ConnectorInfoWithExpandedInfoApiResponse> responseMap =
                CommonCastingUtils.castWithTypeReference(json, typeRef);
        return new ArrayList<>(responseMap.values());
    }

    public List<ConnectorInfoWithExpandedStatusApiResponse>
            connectorInfoWithExpandedStatusApiResponses(String json) {
        TypeReference<Map<String, ConnectorInfoWithExpandedStatusApiResponse>> typeRef =
                new TypeReference<>() {};
        Map<String, ConnectorInfoWithExpandedStatusApiResponse> responseMap =
                CommonCastingUtils.castWithTypeReference(json, typeRef);
        return new ArrayList<>(responseMap.values());
    }

    public List<ConnectorInfoWithExpandedInfoAndStatusApiResponse>
            connectorInfoWithExpandedInfoAndStatusApiResponses(String json) {
        TypeReference<Map<String, ConnectorInfoWithExpandedInfoAndStatusApiResponse>> typeRef =
                new TypeReference<>() {};
        Map<String, ConnectorInfoWithExpandedInfoAndStatusApiResponse> responseMap =
                CommonCastingUtils.castWithTypeReference(json, typeRef);
        return new ArrayList<>(responseMap.values());
    }

    public ConnectorInfoApiResponse connectorInfoApiResponse(String json) {
        return CommonCastingUtils.cast(json, ConnectorInfoApiResponse.class);
    }

    public Map<String, String> connectorConfigApiResponse(String json) {
        TypeReference<Map<String, String>> typeRef = new TypeReference<>() {};
        return CommonCastingUtils.castWithTypeReference(json, typeRef);
    }

    public ConnectorStateInfoApiResponse connectorStateInfoApiResponse(String json) {
        return CommonCastingUtils.cast(json, ConnectorStateInfoApiResponse.class);
    }

    public ConnectorTaskMonitoringApiResponse connectorTaskMonitoringApiResponse(
            String totalRecordErrors,
            String totalRecordFailures,
            String totalRecordsSkipped,
            String sourceRecordPollTotal,
            String sourceRecordPollRate,
            String sourceRecordWriteTotal,
            String sourceRecordWriteRate,
            String pollBatchAvgTimeMs,
            String sinkRecordReadRate,
            String sinkRecordReadTotal,
            String sinkRecordSendRate,
            String sinkRecordSendTotal,
            String partitionCount,
            String putBatchAvgTimeMs,
            String runningRatio,
            String pauseRatio,
            String batchSizeAvg) {
        ConnectorTaskMonitoringApiResponse response = new ConnectorTaskMonitoringApiResponse();
        response.setTotalRecordErrors(totalRecordErrors);
        response.setTotalRecordFailures(totalRecordFailures);
        response.setTotalRecordsSkipped(totalRecordsSkipped);
        response.setSourceRecordPollTotal(sourceRecordPollTotal);
        response.setSourceRecordPollRate(sourceRecordPollRate);
        response.setSourceRecordWriteTotal(sourceRecordWriteTotal);
        response.setSourceRecordWriteRate(sourceRecordWriteRate);
        response.setPollBatchAvgTimeMs(pollBatchAvgTimeMs);
        response.setSinkRecordReadRate(sinkRecordReadRate);
        response.setSinkRecordReadTotal(sinkRecordReadTotal);
        response.setSinkRecordSendRate(sinkRecordSendRate);
        response.setSinkRecordSendTotal(sinkRecordSendTotal);
        response.setPartitionCount(partitionCount);
        response.setPutBatchAvgTimeMs(putBatchAvgTimeMs);
        response.setRunningRatio(runningRatio);
        response.setPauseRatio(pauseRatio);
        response.setBatchSizeAvg(batchSizeAvg);
        return response;
    }
}
