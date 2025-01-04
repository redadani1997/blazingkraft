package com.redadani1997.blazingkraft.consumer.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.client.decorator.WithConsumerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ConsumerActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.common.util.CommonResponseUtils;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_export.ConsumerExportRecordsRequest;
import com.redadani1997.blazingkraft.consumer.mapper.in.ConsumerRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.in.consumer_export.ConsumerExportRequestMapper;
import com.redadani1997.blazingkraft.consumer.openapi.api.ConsumerExportRecordsApi;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerExportRecordsApiRequest;
import com.redadani1997.blazingkraft.consumer.service.ConsumerExportRecordsService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsumerExportRecordsController implements ConsumerExportRecordsApi {
    private final ConsumerExportRecordsService service;
    private final ConsumerRequestMapper consumerRequestMapper;

    @WithCleanUp
    @WithClusterCode
    @WithConsumerClient
    @WithAuthorization(permission = ConsumerActions.CONSUME, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> exportConsumerRecords(ConsumerExportRecordsApiRequest apiRequest) {
        ConsumerExportRecordsRequest request =
                this.consumerExportRequestMapper().consumerExportRecordsRequest(apiRequest);

        HttpServletResponse httpServletResponse = CommonResponseUtils.getHttpServletResponse();

        String fileName = this.service.exportRecordsFileName(request.getExportType());

        httpServletResponse.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        httpServletResponse.setHeader(HttpHeaders.CONTENT_ENCODING, MediaType.APPLICATION_JSON_VALUE);
        httpServletResponse.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        this.service.exportRecords(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private ConsumerExportRequestMapper consumerExportRequestMapper() {
        return this.consumerRequestMapper.consumerExportRequestMapper();
    }
}
