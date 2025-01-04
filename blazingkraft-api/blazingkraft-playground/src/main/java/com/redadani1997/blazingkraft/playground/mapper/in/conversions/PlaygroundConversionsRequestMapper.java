package com.redadani1997.blazingkraft.playground.mapper.in.conversions;

import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.playground.ConversionsException;
import com.redadani1997.blazingkraft.playground.dto.in.conversions.ContentConversionRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ContentConversionApiRequest;
import org.springframework.stereotype.Component;

@Component
public class PlaygroundConversionsRequestMapper {

    public ContentConversionRequest contentConversionRequest(ContentConversionApiRequest apiRequest) {

        CommonValidator.assertNotBlank(apiRequest.getDesiredType(), "Desired type");
        CommonValidator.assertNotBlank(apiRequest.getProvidedType(), "Provided type");
        CommonValidator.assertNotNull(apiRequest.getContent(), "Content");

        if (apiRequest.getDesiredType().equals(apiRequest.getProvidedType())) {
            throw new ConversionsException("Provided and Desired types cannot be the same");
        }

        return ContentConversionRequest.builder()
                .content(apiRequest.getContent())
                .providedType(EnumUtils.fromName(ContentType.class, apiRequest.getProvidedType()))
                .desiredType(EnumUtils.fromName(ContentType.class, apiRequest.getDesiredType()))
                .build();
    }
}
