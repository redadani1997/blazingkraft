package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectModeUpdateRequest {

    private String mode;

    private String subject;
}
