package com.redadani1997.blazingkraft.schemaregistry.mapper.in;

import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_server.SchemaRegistryServerRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_subject.SchemaRegistrySubjectRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_validation.SchemaRegistryValidatorRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchemaRegistryRequestMapper {

    private final SchemaRegistryServerRequestMapper schemaRegistryServerRequestMapper;
    private final SchemaRegistrySubjectRequestMapper schemaRegistrySubjectRequestMapper;
    private final SchemaRegistryValidatorRequestMapper schemaRegistryValidatorRequestMapper;

    public SchemaRegistryValidatorRequestMapper schemaRegistryValidatorRequestMapper() {
        return this.schemaRegistryValidatorRequestMapper;
    }

    public SchemaRegistryServerRequestMapper schemaRegistryServerRequestMapper() {
        return this.schemaRegistryServerRequestMapper;
    }

    public SchemaRegistrySubjectRequestMapper schemaRegistrySubjectRequestMapper() {
        return this.schemaRegistrySubjectRequestMapper;
    }
}
