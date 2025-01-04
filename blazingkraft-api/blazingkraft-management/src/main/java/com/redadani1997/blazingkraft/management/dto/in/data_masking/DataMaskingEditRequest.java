package com.redadani1997.blazingkraft.management.dto.in.data_masking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataMaskingEditRequest {
    private String name;
    private String existingCode;
    private String newCode;

    private String dataMaskingType;
    private String rule;
    private String ruleType;
    private String result;
    private String topicType;
    private String topic;
}
