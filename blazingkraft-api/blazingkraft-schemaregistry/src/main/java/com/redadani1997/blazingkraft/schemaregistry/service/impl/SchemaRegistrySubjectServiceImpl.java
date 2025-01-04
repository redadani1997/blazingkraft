package com.redadani1997.blazingkraft.schemaregistry.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.error.schemaregistry.SchemaRegistryException;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject.*;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.SchemaRegistryResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_subject.SchemaRegistrySubjectResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistrySubjectService;
import io.confluent.kafka.schemaregistry.client.SchemaMetadata;
import io.confluent.kafka.schemaregistry.client.rest.RestService;
import io.confluent.kafka.schemaregistry.client.rest.entities.requests.ModeUpdateRequest;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchemaRegistrySubjectServiceImpl implements SchemaRegistrySubjectService {

    private final ClientsFactory clientsFactory;
    private final SchemaRegistryResponseMapper schemaRegistryResponseMapper;

    @Override
    public List<SubjectMetaApiResponse> getSubjectsMeta(boolean lookupDeletedSubject) {
        try {
            Collection<String> allSubjects =
                    this.currentSchemaRegistryClient().client().getAllSubjects(lookupDeletedSubject);
            return this.schemaRegistrySubjectResponseMapper().subjectMetaApiResponses(allSubjects);
        } catch (IOException | RestClientException ex) {
            throw new SchemaRegistryException(ex.getMessage());
        }
    }

    @Override
    public List<SubjectVersionsApiResponse> getSubjectsVersions(boolean lookupDeletedSubject) {
        try {
            return this.currentSchemaRegistryClient()
                    .client()
                    .getAllSubjects(lookupDeletedSubject)
                    .stream()
                    .map(
                            subject -> {
                                List allVersions = Collections.EMPTY_LIST;
                                try {
                                    allVersions =
                                            this.currentSchemaRegistryClient()
                                                    .client()
                                                    .getAllVersions(subject, lookupDeletedSubject);
                                } catch (IOException | RestClientException e) {
                                    throw new SchemaRegistryException(e.getMessage());
                                }
                                return this.schemaRegistrySubjectResponseMapper()
                                        .subjectVersionApiResponses(subject, allVersions);
                            })
                    .collect(Collectors.toList());

        } catch (IOException | RestClientException ex) {
            throw new SchemaRegistryException(ex.getMessage());
        }
    }

    @Override
    public List<SubjectDescriptionApiResponse> getSubjectsDescriptions(
            SubjectsDescriptionRequest request) {
        return request.getSubjects().stream()
                .map(
                        subject -> {
                            try {
                                SchemaMetadata latestSchemaMetadata =
                                        this.currentSchemaRegistryClient().client().getLatestSchemaMetadata(subject);
                                String mode = this.getMode(subject);
                                String compatibility = this.getCompatibility(subject);
                                return this.schemaRegistrySubjectResponseMapper()
                                        .subjectDescriptionApiResponse(
                                                subject, latestSchemaMetadata, mode, compatibility);

                            } catch (IOException | RestClientException ex) {
                                throw new SchemaRegistryException(ex.getMessage());
                            }
                        })
                .collect(Collectors.toList());
    }

    @Override
    public SubjectDescriptionApiResponse createSubject(SubjectCreateRequest request) {
        try {
            try {
                this.currentSchemaRegistryClient().client().getLatestSchemaMetadata(request.getSubject());
                throw new SchemaRegistryException(
                        String.format("Subject '%s' already exists", request.getSubject()));
            } catch (RestClientException ex) {
                // Ignore subject not found error.
                if (ex.getErrorCode() != 40401) {
                    throw ex;
                }
            }
            this.currentSchemaRegistryClient()
                    .client()
                    .register(request.getSubject(), request.getParsedSchema());
            if (request.getSchemaCompatibility() != null) {
                // Creating the new subject + Updating compatibility cannot be an Atomic action
                // and as a result compatibility might not be updated.
                // But that's ok (I guess) because you'll get the error back and
                // retry updating it later.
                this.currentSchemaRegistryClient()
                        .client()
                        .updateCompatibility(request.getSubject(), request.getSchemaCompatibility());
            }
            return this.schemaRegistrySubjectResponseMapper()
                    .subjectDescriptionApiResponse(
                            request.getSubject(), 1, request.getSchemaType(), null, null);
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public SubjectDetailsApiResponse getSubjectDetails(SubjectDetailsRequest request) {
        try {
            List<Integer> allVersions =
                    this.currentSchemaRegistryClient().client().getAllVersions(request.getSubject(), true);
            List<SchemaMetadata> schemasMetadata = new ArrayList<>();

            for (Integer version : allVersions) {
                SchemaMetadata schemaMetadata =
                        this.currentSchemaRegistryClient()
                                .client()
                                .getSchemaMetadata(request.getSubject(), version, true);
                schemasMetadata.add(schemaMetadata);
            }

            return this.schemaRegistrySubjectResponseMapper()
                    .subjectDetailsApiResponse(
                            this.getCompatibility(request.getSubject()),
                            this.getMode(request.getSubject()),
                            request.getSubject(),
                            schemasMetadata);
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public TopicSubjectDetailsApiResponse getTopicSubjectDetails(TopicSubjectDetailsRequest request) {
        String keySubject = request.getTopic() + "-key";
        String valueSubject = request.getTopic() + "-value";
        SubjectDetailsApiResponse keySubjectDetails = null;
        SubjectDetailsApiResponse valueSubjectDetails = null;
        try {
            keySubjectDetails =
                    this.getSubjectDetails(SubjectDetailsRequest.builder().subject(keySubject).build());
        } catch (Exception ex) {
            // no-op
        }
        try {
            valueSubjectDetails =
                    this.getSubjectDetails(SubjectDetailsRequest.builder().subject(valueSubject).build());
        } catch (Exception ex) {
            // no-op
        }
        return this.schemaRegistrySubjectResponseMapper()
                .topicSubjectDetailsApiResponse(keySubjectDetails, valueSubjectDetails);
    }

    @Override
    public void deleteSubject(SubjectDeleteRequest request) {
        try {
            this.currentSchemaRegistryClient()
                    .client()
                    .deleteSubject(request.getSubject(), request.isPermanent());
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public void deleteSchemaVersion(SchemaVersionDeleteRequest request) {
        try {
            this.currentSchemaRegistryClient()
                    .client()
                    .deleteSchemaVersion(request.getSubject(), request.getVersion(), request.isPermanent());
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public CompatibilityUpdateApiResponse updateSubjectCompatibility(
            SubjectCompatibilityUpdateRequest request) {
        try {
            String compatibility =
                    this.currentSchemaRegistryClient()
                            .client()
                            .updateCompatibility(request.getSubject(), request.getCompatibility());
            return this.schemaRegistrySubjectResponseMapper()
                    .CompatibilityUpdateApiResponse(compatibility);
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public SubjectDescriptionApiResponse createSubjectVersion(SubjectVersionCreateRequest request) {
        try {
            this.currentSchemaRegistryClient()
                    .client()
                    .register(request.getSubject(), request.getParsedSchema());
            return this.schemaRegistrySubjectResponseMapper()
                    .subjectDescriptionApiResponse(
                            request.getSubject(), 1, request.getSchemaType(), null, null);
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
    }

    @Override
    public ModeUpdateApiResponse updateSubjectMode(SubjectModeUpdateRequest request) {
        try {
            ModeUpdateRequest modeUpdateRequest =
                    this.currentSchemaRegistryRestService().setMode(request.getMode(), request.getSubject());
            return this.schemaRegistrySubjectResponseMapper()
                    .modeUpdateApiResponse(modeUpdateRequest.getMode());
        } catch (IOException | RestClientException e) {
            throw new SchemaRegistryException(e.getMessage());
        }
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

    private SchemaRegistrySubjectResponseMapper schemaRegistrySubjectResponseMapper() {
        return this.schemaRegistryResponseMapper.schemaRegistrySubjectResponseMapper();
    }
}
