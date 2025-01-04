package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SubjectDeleteRequest {

    private String subject;

    private boolean permanent;
}
