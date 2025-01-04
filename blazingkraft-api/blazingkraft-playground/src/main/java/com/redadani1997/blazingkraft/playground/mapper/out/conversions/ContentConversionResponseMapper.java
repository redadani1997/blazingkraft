package com.redadani1997.blazingkraft.playground.mapper.out.conversions;

import com.redadani1997.blazingkraft.playground.openapi.model.ContentConversionApiResponse;
import org.springframework.stereotype.Component;

@Component
public class ContentConversionResponseMapper {
    public ContentConversionApiResponse contentConversionApiResponse(String content) {
        ContentConversionApiResponse response = new ContentConversionApiResponse();
        response.setResult(content);
        return response;
    }
}
