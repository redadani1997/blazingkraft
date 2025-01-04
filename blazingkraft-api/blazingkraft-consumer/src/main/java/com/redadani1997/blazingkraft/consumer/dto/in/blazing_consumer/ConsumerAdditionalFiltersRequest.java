package com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ConsumerAdditionalFiltersRequest {
    private TimeFilter timeFilter;

    private Map<String, List<Integer>> partitionFilter;

    private OffsetFilter offsetFilter;

    private String groupIdFilter;

    private JavascriptFilter javascriptFilter;

    private TextSearchFilter textSearchFilter;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class TimeFilter {
        private Boolean disabled;
        private Boolean earliest;
        private Boolean latest;
        private Boolean liveConsumption;
        private Long start;
        private Long end;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class OffsetFilter {
        private Boolean disabled;
        private Map<String, Long> offsets;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class JavascriptFilter {
        private Boolean disabled;

        private String code;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class TextSearchFilter {
        public enum TextSearchFilterType {
            DISABLED,
            CONTAINS,
            STARTS_WITH,
            ENDS_WITH,
            EQUALS,
            REGEX,
            NOT_CONTAINS,
            NOT_STARTS_WITH,
            NOT_ENDS_WITH,
            NOT_EQUALS,
            NOT_REGEX
        }

        private String key;
        private String value;
        private String headers;
        private String metadata;
        private TextSearchFilterType keyType;
        private TextSearchFilterType valueType;
        private TextSearchFilterType headersType;
        private TextSearchFilterType metadataType;
    }
}
