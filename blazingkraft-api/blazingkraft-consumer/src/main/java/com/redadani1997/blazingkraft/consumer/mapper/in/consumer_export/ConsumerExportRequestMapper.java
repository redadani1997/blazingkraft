package com.redadani1997.blazingkraft.consumer.mapper.in.consumer_export;

import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonResponseUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordsRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerRecordsExportType;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerExportRecordApiRequest;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerExportRecordsApiRequest;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import jakarta.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerExportRequestMapper {

    public ConsumerExportRecordsRequest consumerExportRecordsRequest(
            ConsumerExportRecordsApiRequest apiRequest) {
        CommonValidator.assertNotNull("apiRequest", apiRequest);
        CommonValidator.assertNotBlank("exportType", apiRequest.getExportType());
        CommonValidator.assertNotNull("records", apiRequest.getRecords());
        CommonValidator.assertListSizeLessThanOrEquals("records", apiRequest.getRecords(), 10000L);

        ConsumerRecordsExportType consumerRecordsExportType =
                EnumUtils.fromName(ConsumerRecordsExportType.class, apiRequest.getExportType());

        List<ConsumerExportRecordRequest> records =
                apiRequest.getRecords().stream()
                        .map(record -> consumerExportRecordRecordRequest(record, consumerRecordsExportType))
                        .toList();

        OutputStream outputStream = this.getOutputStream();

        return ConsumerExportRecordsRequest.builder()
                .exportType(consumerRecordsExportType)
                .records(records)
                .outputStream(outputStream)
                .build();
    }

    private OutputStream getOutputStream() {
        try {
            HttpServletResponse response = CommonResponseUtils.getHttpServletResponse();

            return response.getOutputStream();
        } catch (Exception ex) {
            throw new ConsumerException(
                    String.format(
                            "Failed to extract output stream from response, error => '%s'", ex.getMessage()));
        }
    }

    private ConsumerExportRecordRequest consumerExportRecordRecordRequest(
            ConsumerExportRecordApiRequest consumerExportRecordApiRequest,
            ConsumerRecordsExportType consumerRecordsExportType) {
        CommonValidator.assertNotNull("Record", consumerExportRecordApiRequest);

        Object key =
                ConsumerRecordsExportType.JSON.equals(consumerRecordsExportType)
                        ? CommonCastingUtils.toJsonNodeOrGet(
                                consumerExportRecordApiRequest.getKey().getPayload())
                        : consumerExportRecordApiRequest.getKey().getPayload();
        Object value =
                ConsumerRecordsExportType.JSON.equals(consumerRecordsExportType)
                        ? CommonCastingUtils.toJsonNodeOrGet(
                                consumerExportRecordApiRequest.getValue().getPayload())
                        : consumerExportRecordApiRequest.getValue().getPayload();

        return ConsumerExportRecordRequest.builder()
                .key(key)
                .value(value)
                .headers(consumerExportRecordApiRequest.getHeaders())
                .metadata(consumerExportRecordApiRequest.getMetadata())
                .build();
    }
}
