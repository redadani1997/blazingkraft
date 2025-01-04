package com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_subject;

import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import io.confluent.kafka.schemaregistry.client.SchemaMetadata;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistrySubjectResponseMapper {

    public SubjectMetaApiResponse subjectMetaApiResponse(String subject) {
        SubjectMetaApiResponse response = new SubjectMetaApiResponse();

        response.setSubject(subject);

        return response;
    }

    public List<SubjectMetaApiResponse> subjectMetaApiResponses(Collection<String> subjects) {
        return subjects.stream().map(this::subjectMetaApiResponse).collect(Collectors.toList());
    }

    public SubjectDescriptionApiResponse subjectDescriptionApiResponse(
            String subject, SchemaMetadata latestSchemaMetadata, String mode, String compatibility) {
        SubjectDescriptionApiResponse response = new SubjectDescriptionApiResponse();

        response.setSubject(subject);
        response.setMode(mode);
        response.setCompatibility(compatibility);
        response.setLatestSchemaType(latestSchemaMetadata.getSchemaType());
        response.setLatestSchemaVersion(latestSchemaMetadata.getVersion());

        return response;
    }

    public SubjectDescriptionApiResponse subjectDescriptionApiResponse(
            String subject, Integer schemaVersion, String schemaType, String mode, String compatibility) {
        SubjectDescriptionApiResponse response = new SubjectDescriptionApiResponse();

        response.setSubject(subject);
        response.setMode(mode);
        response.setCompatibility(compatibility);
        response.setLatestSchemaType(schemaType);
        response.setLatestSchemaVersion(schemaVersion);

        return response;
    }

    public SubjectVersionsApiResponse subjectVersionApiResponses(
            String subject, List<Integer> allVersions) {
        SubjectVersionsApiResponse response = new SubjectVersionsApiResponse();

        response.setSubject(subject);
        response.setVersions(allVersions);

        return response;
    }

    public SubjectDetailsApiResponse subjectDetailsApiResponse(
            String compatibility, String mode, String subject, List<SchemaMetadata> schemasMetadata) {
        SubjectDetailsApiResponse response = new SubjectDetailsApiResponse();

        response.setSubject(subject);
        response.setCompatibility(compatibility);
        response.setMode(mode);
        response.setSchemasMetaData(this.customSchemasMetadata(schemasMetadata));

        return response;
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

    public TopicSubjectDetailsApiResponse topicSubjectDetailsApiResponse(
            SubjectDetailsApiResponse keySubjectDetails, SubjectDetailsApiResponse valueSubjectDetails) {
        TopicSubjectDetailsApiResponse response = new TopicSubjectDetailsApiResponse();

        response.setKeySubjectDetails(keySubjectDetails);
        response.setValueSubjectDetails(valueSubjectDetails);

        return response;
    }

    private List<CustomSchemaMetadata> customSchemasMetadata(List<SchemaMetadata> schemasMetadata) {
        if (schemasMetadata == null) {
            return Collections.EMPTY_LIST;
        }
        return schemasMetadata.stream().map(this::customSchemaMetadata).collect(Collectors.toList());
    }

    private CustomSchemaMetadata customSchemaMetadata(SchemaMetadata schemaMetadata) {
        CustomSchemaMetadata customSchemaMetadata = new CustomSchemaMetadata();

        customSchemaMetadata.setId(schemaMetadata.getId());
        customSchemaMetadata.setSchema(schemaMetadata.getSchema());
        customSchemaMetadata.setSchemaType(schemaMetadata.getSchemaType());
        customSchemaMetadata.setVersion(schemaMetadata.getVersion());
        customSchemaMetadata.setReferences(this.customSchemaReferences(schemaMetadata.getReferences()));

        return customSchemaMetadata;
    }

    private List<CustomSchemaReference> customSchemaReferences(List<SchemaReference> references) {
        if (references == null) {
            return Collections.EMPTY_LIST;
        }
        return references.stream().map(this::customSchemaReference).collect(Collectors.toList());
    }

    private CustomSchemaReference customSchemaReference(SchemaReference schemaReference) {
        CustomSchemaReference customSchemaReference = new CustomSchemaReference();

        customSchemaReference.setVersion(schemaReference.getVersion());
        customSchemaReference.setSubject(schemaReference.getSubject());
        customSchemaReference.setName(schemaReference.getName());

        return customSchemaReference;
    }
}
