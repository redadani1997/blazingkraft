package com.redadani1997.blazingkraft.consumer.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordsRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerRecordsExportType;
import com.redadani1997.blazingkraft.consumer.service.ConsumerExportRecordsService;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportCsvOutputStreamRequest;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportJsonOutputStreamRequest;
import com.redadani1997.blazingkraft.io.service.IOExportFileService;
import com.redadani1997.blazingkraft.io.utils.CommonFileNameGenerator;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsumerExportRecordsImpl implements ConsumerExportRecordsService {
    private final ClientsFactory clientsFactory;
    private final IOExportFileService ioExportFileService;

    @Override
    public String exportRecordsFileName(ConsumerRecordsExportType exportType) {
        String extension = ConsumerRecordsExportType.JSON.equals(exportType) ? "json" : "csv";
        String fileBaseName =
                String.format("Consumer_Records_%s", this.currentConsumerClient().clusterCode());
        return CommonFileNameGenerator.generateFileName(fileBaseName, extension);
    }

    @Override
    public void exportRecords(ConsumerExportRecordsRequest request) {
        if (ConsumerRecordsExportType.JSON.equals(request.getExportType())) {
            IOExportJsonOutputStreamRequest ioRequest = this.generateJsonIORequest(request);

            this.ioExportFileService.exportJsonFileOutputStream(ioRequest);
        } else if (ConsumerRecordsExportType.CSV.equals(request.getExportType())) {
            IOExportCsvOutputStreamRequest ioRequest = this.generateCsvIORequest(request);

            this.ioExportFileService.exportCsvFileOutputStream(ioRequest);
        }
    }

    private IOExportCsvOutputStreamRequest generateCsvIORequest(
            ConsumerExportRecordsRequest request) {
        IOExportCsvOutputStreamRequest ioRequest = new IOExportCsvOutputStreamRequest();

        List<String> headers =
                List.of(
                        "key",
                        "value",
                        "headers",
                        "topic",
                        "partition",
                        "offset",
                        "timestamp",
                        "timestampType",
                        "serializedKeySize",
                        "serializedValueSize",
                        "leaderEpoch");

        List<List<? extends Object>> contents = new ArrayList<>();

        for (ConsumerExportRecordRequest record : request.getRecords()) {

            List content = new ArrayList();

            content.add(record.getKey());
            content.add(record.getValue());
            content.add(record.getHeaders());
            content.add(record.getMetadata().get("topic"));
            content.add(record.getMetadata().get("partition"));
            content.add(record.getMetadata().get("offset"));
            content.add(record.getMetadata().get("timestamp"));
            content.add(record.getMetadata().get("timestampType"));
            content.add(record.getMetadata().get("serializedKeySize"));
            content.add(record.getMetadata().get("serializedValueSize"));
            content.add(record.getMetadata().get("leaderEpoch"));

            contents.add(content);
        }

        ioRequest.setHeaders(headers);
        ioRequest.setContents(contents);
        ioRequest.setOutputStream(request.getOutputStream());

        return ioRequest;
    }

    private IOExportJsonOutputStreamRequest generateJsonIORequest(
            ConsumerExportRecordsRequest request) {
        IOExportJsonOutputStreamRequest ioRequest = new IOExportJsonOutputStreamRequest();

        ioRequest.setContents(request.getRecords());
        ioRequest.setOutputStream(request.getOutputStream());

        return ioRequest;
    }

    private CommonConsumerClient currentConsumerClient() {
        return this.clientsFactory.currentConsumerClient();
    }
}
