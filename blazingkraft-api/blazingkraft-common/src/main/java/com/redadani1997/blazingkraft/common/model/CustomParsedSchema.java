package com.redadani1997.blazingkraft.common.model;

import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.client.rest.entities.Metadata;
import io.confluent.kafka.schemaregistry.client.rest.entities.RuleSet;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaEntity;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CustomParsedSchema implements ParsedSchema {
    private final List<SchemaReference> references;
    private final String schema;
    private final String schemaType;

    public CustomParsedSchema(String schema, String schemaType, List<SchemaReference> references) {
        this.references = references;
        this.schema = schema;
        this.schemaType = schemaType;
    }

    @Override
    public String schemaType() {
        return this.schemaType;
    }

    @Override
    public String name() {
        return null;
    }

    @Override
    public Integer version() {
        return null;
    }

    @Override
    public String canonicalString() {
        return this.schema;
    }

    @Override
    public List<SchemaReference> references() {
        return this.references;
    }

    @Override
    public Metadata metadata() {
        return null;
    }

    @Override
    public RuleSet ruleSet() {
        return null;
    }

    @Override
    public ParsedSchema copy() {
        return null;
    }

    @Override
    public ParsedSchema copy(Integer version) {
        return null;
    }

    @Override
    public ParsedSchema copy(Metadata metadata, RuleSet ruleSet) {
        return null;
    }

    @Override
    public ParsedSchema copy(
            Map<SchemaEntity, Set<String>> tagsToAdd, Map<SchemaEntity, Set<String>> tagsToRemove) {
        return null;
    }

    @Override
    public List<String> isBackwardCompatible(ParsedSchema previousSchema) {
        return Collections.EMPTY_LIST;
    }

    @Override
    public Object rawSchema() {
        return null;
    }
}
