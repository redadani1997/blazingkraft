package com.redadani1997.blazingkraft.datamasking.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import com.redadani1997.blazingkraft.cache.domain.DataMaskingDomain;
import com.redadani1997.blazingkraft.common.enums.DataMaskingResult;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.datamasking.service.DataMasker;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class DataMaskerImpl implements DataMasker {

    @Override
    public String mask(String data, List<DataMaskingDomain> rules) {
        JsonNode maskedJsonNode = null;

        try {
            for (DataMaskingDomain rule : rules) {
                maskedJsonNode =
                        maskedJsonNode == null
                                ? maskJsonNode(CommonCastingUtils.toJsonNode(data), rule)
                                : maskJsonNode(maskedJsonNode, rule);
            }

            return CommonCastingUtils.toJsonString(maskedJsonNode);
        } catch (Exception ex) {
            return data;
        }
    }

    @Override
    public Map<String, Object> mask(Map<String, Object> data, List<DataMaskingDomain> rules) {
        JsonNode maskedJsonNode = null;

        try {
            for (DataMaskingDomain rule : rules) {
                maskedJsonNode =
                        maskedJsonNode == null
                                ? maskJsonNode(
                                        CommonCastingUtils.toJsonNode(CommonCastingUtils.toJsonString(data)), rule)
                                : maskJsonNode(maskedJsonNode, rule);
            }
            TypeReference<Map<String, Object>> typeRef = new TypeReference<>() {};
            return CommonCastingUtils.castWithTypeReference(maskedJsonNode, typeRef);
        } catch (Exception ex) {
            return data;
        }
    }

    private JsonNode maskJsonNode(JsonNode node, DataMaskingDomain rule) {
        if (node.isObject()) {
            ObjectNode objectNode = ((ObjectNode) node).objectNode();
            node.fields()
                    .forEachRemaining(
                            field -> {
                                String fieldName = field.getKey();
                                JsonNode fieldVal = field.getValue();
                                if (fieldName.equals(rule.getRule())) {
                                    doMask(objectNode, fieldName, rule.getResult());
                                } else {
                                    objectNode.set(fieldName, maskJsonNode(fieldVal, rule));
                                }
                            });
            return objectNode;
        } else if (node.isArray()) {
            ArrayNode arr = ((ArrayNode) node).arrayNode(node.size());
            node.elements().forEachRemaining(e -> arr.add(maskJsonNode(e, rule)));
            return arr;
        }
        return node;
    }

    private void doMask(ObjectNode objectNode, String fieldName, DataMaskingResult result) {
        switch (result) {
            case REMOVE -> {}
            case DASH -> {
                objectNode.set(fieldName, TextNode.valueOf("----"));
            }
            case STAR -> {
                objectNode.set(fieldName, TextNode.valueOf("****"));
            }
            case BLAZING_LABEL -> {
                objectNode.set(fieldName, TextNode.valueOf("---Blazing Mask---"));
            }
            default -> {
                objectNode.set(fieldName, TextNode.valueOf("Unknown Mask"));
            }
        }
    }
}
