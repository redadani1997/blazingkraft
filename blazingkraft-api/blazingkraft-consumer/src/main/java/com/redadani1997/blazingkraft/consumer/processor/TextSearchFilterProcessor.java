package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TextSearchFilterProcessor implements ConsumerProcessor {

    private final Boolean disabled;
    private String keySearch;
    private ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType keySearchType;
    private String valueSearch;
    private ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType valueSearchType;
    private String headersSearch;
    private ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType headersSearchType;
    private String metadataSearch;
    private ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType metadataSearchType;

    public TextSearchFilterProcessor(
            ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest) {
        ConsumerAdditionalFiltersRequest.TextSearchFilter textSearchFilter =
                consumerAdditionalFiltersRequest.getTextSearchFilter();

        this.disabled =
                isTypeDisabled(textSearchFilter.getKeyType())
                        && isTypeDisabled(textSearchFilter.getValueType())
                        && isTypeDisabled(textSearchFilter.getHeadersType())
                        && isTypeDisabled(textSearchFilter.getMetadataType());

        if (!this.disabled) {
            this.keySearch = textSearchFilter.getKey();
            this.keySearchType = textSearchFilter.getKeyType();
            this.valueSearch = textSearchFilter.getValue();
            this.valueSearchType = textSearchFilter.getValueType();
            this.headersSearch = textSearchFilter.getHeaders();
            this.headersSearchType = textSearchFilter.getHeadersType();
            this.metadataSearch = textSearchFilter.getMetadata();
            this.metadataSearchType = textSearchFilter.getMetadataType();
        }
    }

    @Override
    public Boolean doProcess(BlazingConsumptionResponse response) {
        if (this.disabled) {
            return true;
        }
        boolean keyMatch = true;
        boolean valueMatch = true;
        boolean headersMatch = true;
        boolean metadataMatch = true;

        if (!isTypeDisabled(this.keySearchType)) {
            if (!response.getKey().getSucceeded()) {
                keyMatch = false;
            } else {
                String key = response.getKey().getPayload();
                keyMatch = this.doSearch(key, this.keySearch, this.keySearchType);
            }
        }

        if (!isTypeDisabled(this.valueSearchType)) {
            if (!response.getValue().getSucceeded()) {
                valueMatch = false;
            } else {
                String value = response.getValue().getPayload();
                valueMatch = this.doSearch(value, this.valueSearch, this.valueSearchType);
            }
        }

        if (!isTypeDisabled(this.headersSearchType)) {
            String headers = CommonTextUtils.mapToString(response.getHeaders());
            headersMatch = this.doSearch(headers, this.headersSearch, this.headersSearchType);
        }

        if (!isTypeDisabled(this.metadataSearchType)) {
            String metadata = CommonCastingUtils.toJsonString(response.getMetadata());
            metadataMatch = this.doSearch(metadata, this.metadataSearch, this.metadataSearchType);
        }

        return keyMatch && valueMatch && headersMatch && metadataMatch;
    }

    private boolean doSearch(
            String value,
            String search,
            ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType searchType) {
        if (value == null) {
            return false;
        }

        return switch (searchType) {
            case CONTAINS -> value.contains(search);
            case EQUALS -> value.equals(search);
            case STARTS_WITH -> value.startsWith(search);
            case ENDS_WITH -> value.endsWith(search);
            case REGEX -> value.matches(search);
            case NOT_CONTAINS -> !value.contains(search);
            case NOT_EQUALS -> !value.equals(search);
            case NOT_STARTS_WITH -> !value.startsWith(search);
            case NOT_ENDS_WITH -> !value.endsWith(search);
            case NOT_REGEX -> !value.matches(search);
            default -> {
                log.error(CommonLogUtils.getError("Unknown text search type: {}"), searchType);
                yield false;
            }
        };
    }

    private boolean isTypeDisabled(
            ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType textSearchFilterType) {
        return textSearchFilterType == null
                || ConsumerAdditionalFiltersRequest.TextSearchFilter.TextSearchFilterType.DISABLED.equals(
                        textSearchFilterType);
    }
}
