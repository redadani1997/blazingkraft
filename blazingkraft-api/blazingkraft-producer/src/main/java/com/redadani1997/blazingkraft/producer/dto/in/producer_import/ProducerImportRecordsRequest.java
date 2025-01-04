package com.redadani1997.blazingkraft.producer.dto.in.producer_import;

import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.ProducerAdditionalConfigurationRequest;
import java.io.InputStream;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProducerImportRecordsRequest {
    private InputStream inputStream;
    private Boolean failFast;
    private Boolean async;
    private String keySchema;
    private String valueSchema;

    private ProducerAdditionalConfigurationRequest producerAdditionalConfigurationRequest;
}
