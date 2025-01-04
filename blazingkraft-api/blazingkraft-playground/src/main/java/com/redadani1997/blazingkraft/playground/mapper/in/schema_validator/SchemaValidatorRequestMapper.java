package com.redadani1997.blazingkraft.playground.mapper.in.schema_validator;

import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaDefinitionRequest;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiRequest;
import org.springframework.stereotype.Component;

@Component
public class SchemaValidatorRequestMapper {

    public ValidateSchemaDefinitionRequest validateSchemaDefinitionRequest(
            ValidateSchemaDefinitionApiRequest apiRequest) {

        EnumUtils.fromName(SchemaType.class, apiRequest.getSchemaType(), SchemaType.JSON);

        return ValidateSchemaDefinitionRequest.builder()
                .schema(apiRequest.getSchema())
                .schemaType(apiRequest.getSchemaType())
                .build();
    }

    public ValidateSchemaRequest validateSchemaRequest(ValidateSchemaContentApiRequest apiRequest) {
        CommonValidator.assertNotBlank("content", apiRequest.getContent());
        EnumUtils.fromName(SchemaType.class, apiRequest.getSchemaType(), SchemaType.JSON);
        EnumUtils.fromName(ContentType.class, apiRequest.getContentType(), ContentType.JSON);

        return ValidateSchemaRequest.builder()
                .schema(apiRequest.getSchema())
                .schemaType(apiRequest.getSchemaType())
                .content(apiRequest.getContent())
                .contentType(apiRequest.getContentType())
                .build();
    }
}
