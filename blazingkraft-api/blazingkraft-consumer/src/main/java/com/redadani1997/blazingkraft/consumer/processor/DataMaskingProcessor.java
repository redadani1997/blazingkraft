package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.cache.service.DataMaskingCache;
import com.redadani1997.blazingkraft.common.enums.DataMaskingTopicType;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import com.redadani1997.blazingkraft.datamasking.service.DataMasker;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DataMaskingProcessor implements ConsumerProcessor {
    private final DataMasker dataMasker;
    private List<DataMaskingDomain> keyRules;
    private List<DataMaskingDomain> valueRules;
    private Map<String, List<DataMaskingDomain>> keyRulesByTopic = new HashMap<>();
    private Map<String, List<DataMaskingDomain>> valueRulesByTopic = new HashMap<>();
    private final Boolean passThroughKey;
    private final Boolean passThroughValue;

    public DataMaskingProcessor(DataMaskingCache dataMaskingCache, DataMasker dataMasker) {
        List<DataMaskingDomain> consumerKeyRules = dataMaskingCache.getConsumerKeyRules();
        List<DataMaskingDomain> consumerValueRules = dataMaskingCache.getConsumerValueRules();

        this.dataMasker = dataMasker;

        this.passThroughKey = this.shouldPassThrough(consumerKeyRules);
        this.passThroughValue = this.shouldPassThrough(consumerValueRules);

        if (!this.passThroughKey) {
            this.keyRules = consumerKeyRules;
        }
        if (!this.passThroughValue) {
            this.valueRules = consumerValueRules;
        }
    }

    @Override
    public Boolean doProcess(BlazingConsumptionResponse response) {
        if (this.passThroughKey && this.passThroughValue) {
            return true;
        }

        String topic = response.getMetadata().getTopic();

        if (!this.passThroughKey && response.getKey().getSucceeded()) {
            List<DataMaskingDomain> dataMaskingDomains =
                    this.computeOrGetRules(topic, this.keyRules, this.keyRulesByTopic);
            if (!dataMaskingDomains.isEmpty()) {
                String maskedKey = this.dataMasker.mask(response.getKey().getPayload(), dataMaskingDomains);
                response.getKey().setPayload(maskedKey);
            }
        }
        if (!this.passThroughValue && response.getValue().getSucceeded()) {
            List<DataMaskingDomain> dataMaskingDomains =
                    this.computeOrGetRules(topic, this.valueRules, this.valueRulesByTopic);
            if (!dataMaskingDomains.isEmpty()) {
                String maskedValue =
                        this.dataMasker.mask(response.getValue().getPayload(), dataMaskingDomains);
                response.getValue().setPayload(maskedValue);
            }
        }
        return true;
    }

    private List<DataMaskingDomain> computeOrGetRules(
            String topic,
            List<DataMaskingDomain> rules,
            Map<String, List<DataMaskingDomain>> rulesByTopic) {
        List<DataMaskingDomain> dataMaskingDomains = rulesByTopic.get(topic);
        if (dataMaskingDomains != null) {
            return dataMaskingDomains;
        }
        dataMaskingDomains = rules.stream().filter(rule -> this.isEligible(rule, topic)).toList();
        rulesByTopic.put(topic, dataMaskingDomains);
        return dataMaskingDomains;
    }

    private Boolean shouldPassThrough(List<DataMaskingDomain> rules) {
        return rules.isEmpty();
    }

    private boolean isEligible(DataMaskingDomain rule, String topic) {
        if (DataMaskingTopicType.EQUALS.equals(rule.getTopicType())) {
            return topic.equals(rule.getTopic());
        }
        if (DataMaskingTopicType.REGEX.equals(rule.getTopicType())) {
            return topic.matches(rule.getTopic());
        }
        return false;
    }
}
