package com.redadani1997.blazingkraft.consumer.service;

import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordsRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerRecordsExportType;

public interface ConsumerExportRecordsService {

    void exportRecords(ConsumerExportRecordsRequest request);

    String exportRecordsFileName(ConsumerRecordsExportType exportType);
}
