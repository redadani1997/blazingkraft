package com.redadani1997.blazingkraft.schemaregistry.service;

import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject.*;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import java.util.List;

public interface SchemaRegistrySubjectService {
    List<SubjectMetaApiResponse> getSubjectsMeta(boolean lookupDeletedSubject);

    List<SubjectVersionsApiResponse> getSubjectsVersions(boolean lookupDeletedSubject);

    List<SubjectDescriptionApiResponse> getSubjectsDescriptions(SubjectsDescriptionRequest request);

    SubjectDescriptionApiResponse createSubject(SubjectCreateRequest request);

    SubjectDetailsApiResponse getSubjectDetails(SubjectDetailsRequest request);

    void deleteSubject(SubjectDeleteRequest request);

    void deleteSchemaVersion(SchemaVersionDeleteRequest request);

    CompatibilityUpdateApiResponse updateSubjectCompatibility(
            SubjectCompatibilityUpdateRequest request);

    SubjectDescriptionApiResponse createSubjectVersion(SubjectVersionCreateRequest request);

    ModeUpdateApiResponse updateSubjectMode(SubjectModeUpdateRequest request);

    TopicSubjectDetailsApiResponse getTopicSubjectDetails(TopicSubjectDetailsRequest request);
}
