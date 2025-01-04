package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectsDescriptionRequest {
    List<String> subjects;
}
