package com.redadani1997.blazingkraft.playground.service.impl;

import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.error.playground.ConversionsException;
import com.redadani1997.blazingkraft.playground.dto.in.conversions.ContentConversionRequest;
import com.redadani1997.blazingkraft.playground.mapper.out.PlaygroundResponseMapper;
import com.redadani1997.blazingkraft.playground.mapper.out.conversions.ContentConversionResponseMapper;
import com.redadani1997.blazingkraft.playground.openapi.model.ContentConversionApiResponse;
import com.redadani1997.blazingkraft.playground.service.PlaygroundConversionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaygroundConversionsServiceImpl implements PlaygroundConversionsService {
    private final PlaygroundResponseMapper playgroundResponseMapper;

    @Override
    public ContentConversionApiResponse convertContent(ContentConversionRequest request) {
        String content = request.getContent();
        ContentType providedType = request.getProvidedType();
        ContentType desiredType = request.getDesiredType();

        if (ContentType.JSON.equals(providedType) && ContentType.YAML.equals(desiredType)) {
            String result = CommonCastingUtils.jsonStringToYamlString(content);
            return this.contentConversionResponseMapper().contentConversionApiResponse(result);
        } else if (ContentType.YAML.equals(providedType) && ContentType.JSON.equals(desiredType)) {
            String result = CommonCastingUtils.yamlStringToJsonString(content);
            return this.contentConversionResponseMapper().contentConversionApiResponse(result);
        } else {
            throw new ConversionsException("Provided type or desired type is not supported.");
        }
    }

    public ContentConversionResponseMapper contentConversionResponseMapper() {
        return this.playgroundResponseMapper.contentConversionResponseMapper();
    }
}
