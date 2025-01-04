package com.redadani1997.blazingkraft.schemaregistry.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryClient;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryCode;
import com.redadani1997.blazingkraft.common.actions.schema_registry.SubjectActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject.*;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.SchemaRegistryRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_subject.SchemaRegistrySubjectRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.api.SchemaRegistrySubjectApi;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistrySubjectService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SchemaRegistrySubjectController implements SchemaRegistrySubjectApi {

    private final SchemaRegistryRequestMapper schemaRegistryRequestMapper;
    private final SchemaRegistrySubjectService schemaRegistrySubjectService;

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.CREATE_SUBJECT,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.LOW)
    @WithSchemaRegistryClient
    @WithAuthorization(permission = SubjectActions.CREATE_SUBJECT, type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<SubjectDescriptionApiResponse> createSubject(
            SubjectCreateApiRequest subjectCreateApiRequest) {

        SubjectCreateRequest request =
                this.schemaRegistrySubjectRequestMapper().subjectCreateRequest(subjectCreateApiRequest);

        SubjectDescriptionApiResponse response =
                this.schemaRegistrySubjectService.createSubject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.CREATE_SUBJECT_VERSION,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.LOW)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.CREATE_SUBJECT_VERSION,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<SubjectDescriptionApiResponse> createSubjectVersion(
            String subject, SubjectVersionCreateApiRequest subjectVersionCreateApiRequest) {
        SubjectVersionCreateRequest request =
                this.schemaRegistrySubjectRequestMapper()
                        .subjectVersionCreateRequest(subject, subjectVersionCreateApiRequest);

        SubjectDescriptionApiResponse response =
                this.schemaRegistrySubjectService.createSubjectVersion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.DELETE_SUBJECT,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.HIGH)
    @WithSchemaRegistryClient
    @WithAuthorization(permission = SubjectActions.DELETE_SUBJECT, type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<Void> deleteSubject(String subject, Boolean permanent) {
        SubjectDeleteRequest request =
                this.schemaRegistrySubjectRequestMapper().subjectDeleteRequest(subject, permanent);
        this.schemaRegistrySubjectService.deleteSubject(request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.DELETE_SUBJECT_VERSION,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.HIGH)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DELETE_SUBJECT_VERSION,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<Void> deleteSubjectVersion(
            String subject, String version, Boolean permanent) {
        SchemaVersionDeleteRequest request =
                this.schemaRegistrySubjectRequestMapper()
                        .schemaVersionDeleteRequest(subject, version, permanent);
        this.schemaRegistrySubjectService.deleteSchemaVersion(request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<SubjectDetailsApiResponse> getSubjectDetails(String subject) {
        SubjectDetailsRequest request =
                this.schemaRegistrySubjectRequestMapper().subjectDetailsRequest(subject);

        SubjectDetailsApiResponse response =
                this.schemaRegistrySubjectService.getSubjectDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<TopicSubjectDetailsApiResponse> getTopicSubjectDetails(String topic) {
        TopicSubjectDetailsRequest request =
                this.schemaRegistrySubjectRequestMapper().topicSubjectDetailsRequest(topic);

        TopicSubjectDetailsApiResponse response =
                this.schemaRegistrySubjectService.getTopicSubjectDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<List<SubjectDescriptionApiResponse>> getSubjectsDescriptions(
            SubjectsDescriptionApiRequest subjectsDescriptionApiRequest) {
        SubjectsDescriptionRequest request =
                this.schemaRegistrySubjectRequestMapper()
                        .subjectDescriptionsRequest(subjectsDescriptionApiRequest);
        List<SubjectDescriptionApiResponse> responses =
                this.schemaRegistrySubjectService.getSubjectsDescriptions(request);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<List<SubjectMetaApiResponse>> getSubjectsMeta(
            Boolean lookupDeletedSubject) {
        List<SubjectMetaApiResponse> responses =
                this.schemaRegistrySubjectService.getSubjectsMeta(lookupDeletedSubject);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<List<SubjectVersionsApiResponse>> getSubjectsVersions(
            Boolean lookupDeletedSubject) {
        List<SubjectVersionsApiResponse> responses =
                this.schemaRegistrySubjectService.getSubjectsVersions(lookupDeletedSubject);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.UPDATE_SUBJECT_COMPATIBILITY,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.MEDIUM)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.UPDATE_SUBJECT_COMPATIBILITY,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<CompatibilityUpdateApiResponse> updateSubjectCompatibility(
            String subject, CompatibilityUpdateApiRequest compatibilityUpdateApiRequest) {
        SubjectCompatibilityUpdateRequest request =
                this.schemaRegistrySubjectRequestMapper()
                        .subjectCompatibilityUpdateRequest(compatibilityUpdateApiRequest, subject);
        CompatibilityUpdateApiResponse response =
                this.schemaRegistrySubjectService.updateSubjectCompatibility(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithAudit(
            action = SubjectActions.UPDATE_SUBJECT_MODE,
            type = EntityType.SCHEMA_REGISTRY,
            severity = AuditSeverity.HIGH)
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.UPDATE_SUBJECT_MODE,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<ModeUpdateApiResponse> updateSubjectMode(
            String subject, ModeUpdateApiRequest modeUpdateApiRequest) {
        SubjectModeUpdateRequest request =
                this.schemaRegistrySubjectRequestMapper()
                        .subjectModeUpdateRequest(modeUpdateApiRequest, subject);
        ModeUpdateApiResponse response = this.schemaRegistrySubjectService.updateSubjectMode(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private SchemaRegistrySubjectRequestMapper schemaRegistrySubjectRequestMapper() {
        return this.schemaRegistryRequestMapper.schemaRegistrySubjectRequestMapper();
    }
}
