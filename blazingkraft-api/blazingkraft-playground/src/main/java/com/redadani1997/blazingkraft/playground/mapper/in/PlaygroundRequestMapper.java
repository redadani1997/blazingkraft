package com.redadani1997.blazingkraft.playground.mapper.in;

import com.redadani1997.blazingkraft.playground.mapper.in.conversions.PlaygroundConversionsRequestMapper;
import com.redadani1997.blazingkraft.playground.mapper.in.schema_validator.SchemaValidatorRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlaygroundRequestMapper {
    private final SchemaValidatorRequestMapper schemaRegistryRequestMapper;
    private final PlaygroundConversionsRequestMapper playgroundConversionsRequestMapper;

    public SchemaValidatorRequestMapper schemaValidatorRequestMapper() {
        return this.schemaRegistryRequestMapper;
    }

    public PlaygroundConversionsRequestMapper playgroundConversionsRequestMapper() {
        return this.playgroundConversionsRequestMapper;
    }
}
