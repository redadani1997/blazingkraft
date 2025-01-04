package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SubjectDetailsRequest {
    private String subject;
}
