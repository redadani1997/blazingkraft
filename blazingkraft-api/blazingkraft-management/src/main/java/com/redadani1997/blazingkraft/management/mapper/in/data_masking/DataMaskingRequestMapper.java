package com.redadani1997.blazingkraft.management.mapper.in.data_masking;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.*;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingCreateApiRequest;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingEditApiRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingEditRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataMaskingRequestMapper {

    private final AuditLogService auditLogService;

    public DataMaskingCreateRequest dataMaskingCreateRequest(DataMaskingCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertNotBlank("Name", apiRequest.getCode());
        CommonValidator.assertNotBlank("Data Masking Type", apiRequest.getDataMaskingType());

        DataMaskingType dataMaskingType =
                EnumUtils.fromNameNotNull(DataMaskingType.class, apiRequest.getDataMaskingType());

        CommonValidator.assertNotBlank("Rule", apiRequest.getRule());
        CommonValidator.assertNotBlank("Rule Type", apiRequest.getRuleType());
        EnumUtils.fromNameNotNull(DataMaskingRuleType.class, apiRequest.getRuleType());

        CommonValidator.assertNotBlank("Result", apiRequest.getResult());
        EnumUtils.fromNameNotNull(DataMaskingResult.class, apiRequest.getResult());

        DataMaskingCreateRequest request =
                DataMaskingCreateRequest.builder()
                        .code(apiRequest.getCode())
                        .name(apiRequest.getName())
                        .dataMaskingType(apiRequest.getDataMaskingType())
                        .rule(apiRequest.getRule())
                        .ruleType(apiRequest.getRuleType())
                        .result(apiRequest.getResult())
                        .build();

        if (dataMaskingType.equals(DataMaskingType.CONSUMER_VALUE)
                || dataMaskingType.equals(DataMaskingType.CONSUMER_KEY)) {
            CommonValidator.assertNotBlank("Topic Type", apiRequest.getTopicType());
            EnumUtils.fromNameNotNull(DataMaskingTopicType.class, apiRequest.getTopicType());
            CommonValidator.assertNotBlank("Topic", apiRequest.getTopic());

            request.setTopicType(apiRequest.getTopicType());
            request.setTopic(apiRequest.getTopic());
        }

        return request;
    }

    public DataMaskingDeleteRequest dataMaskingDeleteRequest(String code) {
        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Code", code);

        return DataMaskingDeleteRequest.builder().code(code).build();
    }

    public DataMaskingEditRequest dataMaskingEditRequest(
            String code, DataMaskingEditApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Existing Code", code);
        CommonValidator.assertNotBlank("New Code", apiRequest.getCode());
        CommonValidator.assertNotBlank("Name", apiRequest.getCode());
        CommonValidator.assertNotBlank("Data Masking Type", apiRequest.getDataMaskingType());

        DataMaskingType dataMaskingType =
                EnumUtils.fromNameNotNull(DataMaskingType.class, apiRequest.getDataMaskingType());

        CommonValidator.assertNotBlank("Rule", apiRequest.getRule());
        CommonValidator.assertNotBlank("Rule Type", apiRequest.getRuleType());
        EnumUtils.fromNameNotNull(DataMaskingRuleType.class, apiRequest.getRuleType());

        CommonValidator.assertNotBlank("Result", apiRequest.getResult());
        EnumUtils.fromNameNotNull(DataMaskingResult.class, apiRequest.getResult());

        DataMaskingEditRequest request =
                DataMaskingEditRequest.builder()
                        .existingCode(code)
                        .newCode(apiRequest.getCode())
                        .name(apiRequest.getName())
                        .dataMaskingType(apiRequest.getDataMaskingType())
                        .rule(apiRequest.getRule())
                        .ruleType(apiRequest.getRuleType())
                        .result(apiRequest.getResult())
                        .build();

        if (dataMaskingType.equals(DataMaskingType.CONSUMER_VALUE)
                || dataMaskingType.equals(DataMaskingType.CONSUMER_KEY)) {
            CommonValidator.assertNotBlank("Topic Type", apiRequest.getTopicType());
            EnumUtils.fromNameNotNull(DataMaskingTopicType.class, apiRequest.getTopicType());
            CommonValidator.assertNotBlank("Topic", apiRequest.getTopic());

            request.setTopicType(apiRequest.getTopicType());
            request.setTopic(apiRequest.getTopic());
        } else {
            request.setTopicType(null);
            request.setTopic(null);
        }

        return request;
    }
}
