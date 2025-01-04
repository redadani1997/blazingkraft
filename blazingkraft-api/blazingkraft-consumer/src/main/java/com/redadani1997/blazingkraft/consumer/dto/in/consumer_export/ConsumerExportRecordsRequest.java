package com.redadani1997.blazingkraft.consumer.dto.in.consumer_export;

import java.io.OutputStream;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ConsumerExportRecordsRequest {

    private ConsumerRecordsExportType exportType;

    private List<ConsumerExportRecordRequest> records;

    private OutputStream outputStream;
}
