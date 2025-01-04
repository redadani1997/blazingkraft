package com.redadani1997.blazingkraft.schemaregistry.service;

import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server.*;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import jakarta.transaction.Transactional;
import java.util.List;

public interface SchemaRegistryServerService {

    @Transactional
    SchemaRegistryMetaApiResponse createSchemaRegistry(
            SchemaRegistryCreateRequest schemaRegistryCreateRequest);

    void testSchemaRegistryClientConnectivity(SchemaRegistryClientConnectivityRequest request);

    void testSchemaRegistryJmxConnectivity(SchemaRegistryJmxConnectivityRequest request);

    List<SchemaRegistryMetaApiResponse> getSchemaRegistries();

    SchemaRegistryDescriptionApiResponse describeSchemaRegistry();

    SchemaRegistryConfigApiResponse getSchemaRegistryConfig();

    CompatibilityUpdateApiResponse updateSchemaRegistryCompatibility(
            SchemaRegistryCompatibilityUpdateRequest request);

    ModeUpdateApiResponse updateSchemaRegistryMode(SchemaRegistryModeUpdateRequest request);

    void deleteSchemaRegistry(SchemaRegistryDeleteRequest request);

    SchemaRegistryMetaApiResponse editSchemaRegistry(SchemaRegistryEditRequest request);

    SchemaRegistryDetailsApiResponse getSchemaRegistryDetails(SchemaRegistryDetailsRequest request);
}
