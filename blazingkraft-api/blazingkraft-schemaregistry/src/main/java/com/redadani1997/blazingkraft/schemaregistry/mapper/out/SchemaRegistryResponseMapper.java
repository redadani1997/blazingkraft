package com.redadani1997.blazingkraft.schemaregistry.mapper.out;

import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_server.SchemaRegistryServerResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_subject.SchemaRegistrySubjectResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_validator.SchemaRegistryValidatorResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchemaRegistryResponseMapper {
    private final SchemaRegistrySubjectResponseMapper schemaRegistrySubjectResponseMapper;
    private final SchemaRegistryValidatorResponseMapper schemaRegistryValidatorResponseMapper;
    private final SchemaRegistryServerResponseMapper schemaRegistryServerResponseMapper;

    public SchemaRegistrySubjectResponseMapper schemaRegistrySubjectResponseMapper() {
        return this.schemaRegistrySubjectResponseMapper;
    }

    public SchemaRegistryValidatorResponseMapper schemaRegistryValidatorResponseMapper() {
        return this.schemaRegistryValidatorResponseMapper;
    }

    public SchemaRegistryServerResponseMapper schemaRegistryServerResponseMapper() {
        return this.schemaRegistryServerResponseMapper;
    }
}
