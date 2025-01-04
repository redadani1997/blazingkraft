package com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_validation;

import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryCompatibilityRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryContentRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryDefinitionRequest;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.CustomSchemaReference;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryCompatibilityApiRequest;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryContentApiRequest;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryDefinitionApiRequest;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistryValidatorRequestMapper {

    public ValidateSchemaRegistryDefinitionRequest validateSchemaDefinitionRequest(
            ValidateSchemaRegistryDefinitionApiRequest apiRequest) {

        EnumUtils.validateName(SchemaType.class, apiRequest.getSchemaType());

        return ValidateSchemaRegistryDefinitionRequest.builder()
                .schema(apiRequest.getSchema())
                .schemaReferences(this.schemaReferences(apiRequest.getReferences()))
                .schemaType(apiRequest.getSchemaType())
                .build();
    }

    public ValidateSchemaRegistryContentRequest validateSchemaRegistryContentRequest(
            ValidateSchemaRegistryContentApiRequest apiRequest) {
        CommonValidator.assertNotBlank("content", apiRequest.getContent());

        SchemaType schemaType = EnumUtils.fromName(SchemaType.class, apiRequest.getSchemaType());

        return ValidateSchemaRegistryContentRequest.builder()
                .schema(apiRequest.getSchema())
                .schemaReferences(this.schemaReferences(apiRequest.getReferences()))
                .schemaType(schemaType)
                .content(apiRequest.getContent())
                .build();
    }

    public ValidateSchemaRegistryCompatibilityRequest validateSchemaCompatibilityRequest(
            ValidateSchemaRegistryCompatibilityApiRequest apiRequest) {

        EnumUtils.validateName(SchemaType.class, apiRequest.getSchemaType());

        return ValidateSchemaRegistryCompatibilityRequest.builder()
                .schema(apiRequest.getSchema())
                .schemaReferences(this.schemaReferences(apiRequest.getReferences()))
                .schemaType(apiRequest.getSchemaType())
                .subject(apiRequest.getSubject())
                .build();
    }

    private List<SchemaReference> schemaReferences(List<CustomSchemaReference> references) {
        if (references == null) {
            return Collections.emptyList();
        }
        return references.stream().map(this::schemaReference).collect(Collectors.toList());
    }

    private SchemaReference schemaReference(CustomSchemaReference customSchemaReference) {
        return new SchemaReference(
                customSchemaReference.getName(),
                customSchemaReference.getSubject(),
                customSchemaReference.getVersion());
    }
}
