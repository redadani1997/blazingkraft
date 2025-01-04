package com.redadani1997.blazingkraft.schemaregistry.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.factory.SchemaRegistryClientFactory;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbServerException;
import com.redadani1997.blazingkraft.error.schemaregistry.SchemaRegistryException;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server.*;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.SchemaRegistryResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_server.SchemaRegistryServerResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistryServerService;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.RestService;
import io.confluent.kafka.schemaregistry.client.rest.entities.requests.ModeUpdateRequest;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.KafkaException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchemaRegistryServerServiceImpl implements SchemaRegistryServerService {

    private final ClientsFactory clientsFactory;
    private final SchemaRegistryClientFactory schemaRegistryClientFactory;
    private final SchemaRegistryDao schemaRegistryDao;
    private final SchemaRegistryResponseMapper schemaRegistryResponseMapper;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional
    @Override
    public SchemaRegistryMetaApiResponse createSchemaRegistry(SchemaRegistryCreateRequest request) {
        if (request.getJmxEnabled()) {
            this.testSchemaRegistryJmxConnectivity(
                    SchemaRegistryJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        // Store in DB
        SchemaRegistryModel model = new SchemaRegistryModel();
        model.setCode(request.getCode());
        model.setName(request.getName());
        model.setColor(request.getColor());
        model.setSchemaRegistryUrls(request.getSchemaRegistryUrls());
        model.setSchemasCacheSize(request.getSchemasCacheSize());
        model.setMainConfiguration(request.getMainConfiguration());

        model.setJmxEnabled(request.getJmxEnabled());
        model.setJmxUrl(request.getJmxUrl());
        model.setJmxEnvironment(request.getJmxEnvironment());

        SchemaRegistryModel savedModel = this.schemaRegistryDao.create(model);

        // Notify listeners
        this.applicationEventPublisher.publishEvent(
                new SchemaRegistryCreatedApplicationEvent(savedModel.getCode()));

        return this.schemaRegistryResponseMapper().schemaRegistryMetaApiResponse(savedModel);
    }

    @Transactional
    @Override
    public SchemaRegistryMetaApiResponse editSchemaRegistry(SchemaRegistryEditRequest request) {
        SchemaRegistryModel model = this.schemaRegistryDao.findByCode(request.getCode());

        if (request.getJmxEnabled()) {
            this.testSchemaRegistryJmxConnectivity(
                    SchemaRegistryJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        model.setColor(request.getColor());
        model.setSchemaRegistryUrls(request.getSchemaRegistryUrls());
        model.setSchemasCacheSize(request.getSchemasCacheSize());
        model.setMainConfiguration(request.getMainConfiguration());

        model.setJmxEnabled(request.getJmxEnabled());
        model.setJmxUrl(request.getJmxUrl());
        model.setJmxEnvironment(request.getJmxEnvironment());

        SchemaRegistryModel savedModel = this.schemaRegistryDao.update(model);

        SchemaRegistryEditedApplicationEvent event =
                new SchemaRegistryEditedApplicationEvent(model.getCode());
        this.applicationEventPublisher.publishEvent(event);

        return this.schemaRegistryResponseMapper().schemaRegistryMetaApiResponse(savedModel);
    }

    @Override
    public void testSchemaRegistryClientConnectivity(
            SchemaRegistryClientConnectivityRequest request) {
        SchemaRegistryClient schemaRegistryClient =
                this.schemaRegistryClientFactory.createSchemaRegistryClient(
                        request.getSchemaRegistryUrls(),
                        request.getSchemasCacheSize(),
                        request.getMainConfiguration());
        try {
            schemaRegistryClient.getCompatibility(null);
        } catch (Exception ex) {
            Throwable rootCause = ex;
            if (ex instanceof KafkaException) {
                rootCause = ex.getCause() != null ? ex.getCause() : ex;
            }
            throw new SchemaRegistryException(rootCause);
        }
    }

    @Override
    public void testSchemaRegistryJmxConnectivity(SchemaRegistryJmxConnectivityRequest request) {
        try (CommonJmxClient client =
                CommonJmxClient.create(request.getJmxUrl(), request.getJmxEnvironment())) {
            client.testConnection();
        } catch (Exception ex) {
            throw new KsqlDbServerException(ex);
        }
    }

    @Override
    public List<SchemaRegistryMetaApiResponse> getSchemaRegistries() {
        List<SchemaRegistryModel> models = this.schemaRegistryDao.findAll();
        return this.schemaRegistryResponseMapper().schemaRegistryMetaApiResponses(models);
    }

    @Override
    public SchemaRegistryDescriptionApiResponse describeSchemaRegistry() {
        try {
            String mode = this.getMode(null);
            String compatibility = this.getCompatibility(null);
            Collection<String> allSubjects =
                    this.currentSchemaRegistryClient().client().getAllSubjects(true);

            return this.schemaRegistryResponseMapper()
                    .schemaRegistryDescriptionApiResponse(
                            mode,
                            compatibility,
                            allSubjects.size(),
                            this.currentSchemaRegistryClient().schemaRegistryCode());
        } catch (Exception ex) {
            throw new SchemaRegistryException(ex);
        }
    }

    @Transactional
    @Override
    public void deleteSchemaRegistry(SchemaRegistryDeleteRequest request) {
        SchemaRegistryModel model = this.schemaRegistryDao.findByCode(request.getCode());

        if (model.getClusterModels() != null && !model.getClusterModels().isEmpty()) {
            throw new SchemaRegistryException(
                    "Cannot delete a Schema Registry that is already being referenced by a Cluster.");
        }

        this.schemaRegistryDao.deleteById(model.getId());

        SchemaRegistryDeletedApplicationEvent event =
                new SchemaRegistryDeletedApplicationEvent(model.getCode());
        this.applicationEventPublisher.publishEvent(event);
    }

    @Override
    public CompatibilityUpdateApiResponse updateSchemaRegistryCompatibility(
            SchemaRegistryCompatibilityUpdateRequest request) {
        try {
            String compatibility =
                    this.currentSchemaRegistryClient()
                            .client()
                            .updateCompatibility(null, request.getCompatibility());
            return this.schemaRegistryResponseMapper().CompatibilityUpdateApiResponse(compatibility);
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public SchemaRegistryDetailsApiResponse getSchemaRegistryDetails(
            SchemaRegistryDetailsRequest request) {
        SchemaRegistryModel model = this.schemaRegistryDao.findByCode(request.getCode());

        return this.schemaRegistryResponseMapper().schemaRegistryDetailsApiResponse(model);
    }

    @Override
    public ModeUpdateApiResponse updateSchemaRegistryMode(SchemaRegistryModeUpdateRequest request) {
        try {
            ModeUpdateRequest modeUpdateRequest =
                    this.currentSchemaRegistryRestService().setMode(request.getMode(), null);
            return this.schemaRegistryResponseMapper().modeUpdateApiResponse(modeUpdateRequest.getMode());
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public SchemaRegistryConfigApiResponse getSchemaRegistryConfig() {
        return this.schemaRegistryResponseMapper()
                .schemaRegistryConfigApiResponse(this.getCompatibility(null), this.getMode(null));
    }

    private String getMode(String subject) {
        try {
            return this.currentSchemaRegistryRestService().getMode(subject, true).getMode();
        } catch (IOException | RestClientException ex) {
            try {
                return this.currentSchemaRegistryRestService().getMode().getMode();
            } catch (IOException | RestClientException e) {
                return null;
            }
        }
    }

    private String getCompatibility(String subject) {
        try {
            return this.currentSchemaRegistryRestService()
                    .getConfig(RestService.DEFAULT_REQUEST_PROPERTIES, subject, true)
                    .getCompatibilityLevel();
        } catch (IOException | RestClientException ex) {
            try {
                return this.currentSchemaRegistryRestService().getConfig(null).getCompatibilityLevel();
            } catch (IOException | RestClientException e) {
                return null;
            }
        }
    }

    private CommonSchemaRegistryClient currentSchemaRegistryClient() {
        return this.clientsFactory.currentSchemaRegistryClient();
    }

    private RestService currentSchemaRegistryRestService() {
        return this.clientsFactory.currentSchemaRegistryRestService();
    }

    private SchemaRegistryServerResponseMapper schemaRegistryResponseMapper() {
        return this.schemaRegistryResponseMapper.schemaRegistryServerResponseMapper();
    }
}
