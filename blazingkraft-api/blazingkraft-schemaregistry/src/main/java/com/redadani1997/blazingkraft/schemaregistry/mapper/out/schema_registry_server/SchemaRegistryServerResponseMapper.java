package com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_server;

import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistryServerResponseMapper {

    public SchemaRegistryDescriptionApiResponse schemaRegistryDescriptionApiResponse(
            String mode, String compatibility, Integer subjects, String code) {
        SchemaRegistryDescriptionApiResponse response = new SchemaRegistryDescriptionApiResponse();

        response.setCode(code);
        response.setCompatibility(compatibility);
        response.setMode(mode);
        response.setSubjects(subjects);

        return response;
    }

    public SchemaRegistryMetaApiResponse schemaRegistryMetaApiResponse(
            SchemaRegistryModel schemaRegistryModel) {
        if (schemaRegistryModel == null) {
            return null;
        }
        SchemaRegistryMetaApiResponse response = new SchemaRegistryMetaApiResponse();

        response.setCode(schemaRegistryModel.getCode());
        response.setName(schemaRegistryModel.getName());
        response.setColor(schemaRegistryModel.getColor());
        response.setSchemaRegistryUrls(schemaRegistryModel.getSchemaRegistryUrls());
        response.setJmxEnabled(schemaRegistryModel.getJmxEnabled());

        return response;
    }

    public List<SchemaRegistryMetaApiResponse> schemaRegistryMetaApiResponses(
            List<SchemaRegistryModel> schemaRegistryModels) {
        if (schemaRegistryModels == null) {
            return Collections.emptyList();
        }
        return schemaRegistryModels.stream()
                .map(this::schemaRegistryMetaApiResponse)
                .collect(Collectors.toList());
    }

    public CompatibilityUpdateApiResponse CompatibilityUpdateApiResponse(String compatibility) {
        CompatibilityUpdateApiResponse response = new CompatibilityUpdateApiResponse();

        response.setCompatibility(compatibility);

        return response;
    }

    public ModeUpdateApiResponse modeUpdateApiResponse(String mode) {
        ModeUpdateApiResponse response = new ModeUpdateApiResponse();

        response.setMode(mode);

        return response;
    }

    public SchemaRegistryConfigApiResponse schemaRegistryConfigApiResponse(
            String compatibility, String mode) {
        SchemaRegistryConfigApiResponse response = new SchemaRegistryConfigApiResponse();

        response.setMode(mode);
        response.setCompatibility(compatibility);

        return response;
    }

    public SchemaRegistryDetailsApiResponse schemaRegistryDetailsApiResponse(
            SchemaRegistryModel model) {
        if (model == null) {
            return null;
        }
        SchemaRegistryDetailsApiResponse response = new SchemaRegistryDetailsApiResponse();

        response.setCode(model.getCode());
        response.setName(model.getName());
        response.setColor(model.getColor());
        response.setSchemaRegistryUrls(model.getSchemaRegistryUrls());
        response.setMainConfiguration(model.mainConfiguration());
        response.setSchemasCacheSize(model.getSchemasCacheSize());
        response.setJmxEnabled(model.getJmxEnabled());
        response.setJmxUrl(model.getJmxUrl());
        response.setJmxEnvironment(model.jmxEnvironment());

        return response;
    }
}
