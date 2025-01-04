package com.redadani1997.blazingkraft.playground.service;

import com.redadani1997.blazingkraft.playground.dto.in.conversions.ContentConversionRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ContentConversionApiResponse;

public interface PlaygroundConversionsService {

    ContentConversionApiResponse convertContent(ContentConversionRequest request);
}
