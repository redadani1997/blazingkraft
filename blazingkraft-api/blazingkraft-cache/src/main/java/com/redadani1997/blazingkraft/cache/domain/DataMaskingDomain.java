package com.redadani1997.blazingkraft.cache.domain;

import com.redadani1997.blazingkraft.common.enums.DataMaskingResult;
import com.redadani1997.blazingkraft.common.enums.DataMaskingRuleType;
import com.redadani1997.blazingkraft.common.enums.DataMaskingTopicType;
import com.redadani1997.blazingkraft.common.enums.DataMaskingType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DataMaskingDomain {

    private String code;

    private String name;

    private DataMaskingType dataMaskingType;

    private String rule;

    private DataMaskingRuleType ruleType;

    private DataMaskingResult result;

    private DataMaskingTopicType topicType;

    private String topic;
}
