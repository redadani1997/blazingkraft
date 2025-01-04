package com.redadani1997.blazingkraft.playground.dto.in.conversions;

import com.redadani1997.blazingkraft.common.enums.ContentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentConversionRequest {
    private ContentType providedType;
    private ContentType desiredType;
    private String content;
}
