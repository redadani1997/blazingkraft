package com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_subject;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.enums.SchemaRegistryCompatibility;
import com.redadani1997.blazingkraft.common.enums.SchemaRegistryMode;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.model.CustomParsedSchema;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject.*;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SchemaRegistrySubjectRequestMapper {
    private final AuditLogService auditLogService;

    public SubjectCreateRequest subjectCreateRequest(SubjectCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getSubject());

        List<SchemaReference> schemaReferences = this.schemaReferences(apiRequest.getReferences());

        ParsedSchema parsedSchema =
                computeParsedSchema(apiRequest.getSchema(), apiRequest.getSchemaType(), schemaReferences);

        EnumUtils.validateName(SchemaRegistryCompatibility.class, apiRequest.getCompatibility());
        EnumUtils.validateName(SchemaType.class, apiRequest.getSchemaType());

        return SubjectCreateRequest.builder()
                .parsedSchema(parsedSchema)
                .schemaCompatibility(apiRequest.getCompatibility())
                .subject(apiRequest.getSubject())
                .schemaType(apiRequest.getSchemaType())
                .build();
    }

    public SubjectDetailsRequest subjectDetailsRequest(String subject) {
        CommonValidator.assertNotBlank("Subject", subject);
        return SubjectDetailsRequest.builder().subject(subject).build();
    }

    public TopicSubjectDetailsRequest topicSubjectDetailsRequest(String topic) {
        CommonValidator.assertNotBlank("Topic", topic);
        return TopicSubjectDetailsRequest.builder().topic(topic).build();
    }

    public SubjectDeleteRequest subjectDeleteRequest(String subject, boolean permanent) {
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotBlank("subject", subject);
        return SubjectDeleteRequest.builder().subject(subject).permanent(permanent).build();
    }

    public SchemaVersionDeleteRequest schemaVersionDeleteRequest(
            String subject, String version, boolean permanent) {
        String auditSubject = String.format("%s:%s", subject, version);
        this.auditLogService.setSubject(auditSubject);

        CommonValidator.assertNotBlank("subject", subject);
        CommonValidator.assertNotBlank("version", version);
        return SchemaVersionDeleteRequest.builder()
                .subject(subject)
                .version(version)
                .permanent(permanent)
                .build();
    }

    public SubjectCompatibilityUpdateRequest subjectCompatibilityUpdateRequest(
            CompatibilityUpdateApiRequest apiRequest, String subject) {
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotBlank("subject", subject);
        CommonValidator.assertNotBlank("compatibility", apiRequest.getCompatibility());
        EnumUtils.validateName(SchemaRegistryCompatibility.class, apiRequest.getCompatibility());

        return SubjectCompatibilityUpdateRequest.builder()
                .compatibility(apiRequest.getCompatibility())
                .subject(subject)
                .build();
    }

    public SubjectModeUpdateRequest subjectModeUpdateRequest(
            ModeUpdateApiRequest apiRequest, String subject) {
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotBlank("subject", subject);
        CommonValidator.assertNotBlank("mode", apiRequest.getMode());
        EnumUtils.validateName(SchemaRegistryMode.class, apiRequest.getMode());

        return SubjectModeUpdateRequest.builder().mode(apiRequest.getMode()).subject(subject).build();
    }

    public SubjectVersionCreateRequest subjectVersionCreateRequest(
            String subject, SubjectVersionCreateApiRequest apiRequest) {
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("subject", subject);
        EnumUtils.validateName(SchemaType.class, apiRequest.getSchemaType());

        List<SchemaReference> schemaReferences = this.schemaReferences(apiRequest.getReferences());

        ParsedSchema parsedSchema =
                computeParsedSchema(apiRequest.getSchema(), apiRequest.getSchemaType(), schemaReferences);

        return SubjectVersionCreateRequest.builder()
                .parsedSchema(parsedSchema)
                .subject(subject)
                .schemaType(apiRequest.getSchemaType())
                .build();
    }

    public SubjectsDescriptionRequest subjectDescriptionsRequest(
            SubjectsDescriptionApiRequest apiRequest) {
        return SubjectsDescriptionRequest.builder().subjects(apiRequest.getSubjects()).build();
    }

    private ParsedSchema computeParsedSchema(
            String schema, String schemaTypeStr, List<SchemaReference> schemaReferences) {
        return new CustomParsedSchema(schema, schemaTypeStr, schemaReferences);
    }

    private List<SchemaReference> schemaReferences(List<CustomSchemaReference> references) {
        if (references == null) {
            return Collections.EMPTY_LIST;
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
