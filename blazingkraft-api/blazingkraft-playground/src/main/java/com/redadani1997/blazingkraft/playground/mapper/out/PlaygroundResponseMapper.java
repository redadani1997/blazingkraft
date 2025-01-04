package com.redadani1997.blazingkraft.playground.mapper.out;

import com.redadani1997.blazingkraft.playground.mapper.out.conversions.ContentConversionResponseMapper;
import com.redadani1997.blazingkraft.playground.mapper.out.schema_validator.SchemaValidatorResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlaygroundResponseMapper {
    private final SchemaValidatorResponseMapper schemaValidatorResponseMapper;
    private final ContentConversionResponseMapper contentConversionResponseMapper;

    public SchemaValidatorResponseMapper schemaValidatorResponseMapper() {
        return this.schemaValidatorResponseMapper;
    }

    public ContentConversionResponseMapper contentConversionResponseMapper() {
        return this.contentConversionResponseMapper;
    }
}
