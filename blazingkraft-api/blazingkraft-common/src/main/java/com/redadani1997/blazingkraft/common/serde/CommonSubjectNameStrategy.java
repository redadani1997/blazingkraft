package com.redadani1997.blazingkraft.common.serde;

import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.serializers.subject.strategy.SubjectNameStrategy;
import java.util.Map;

public class CommonSubjectNameStrategy implements SubjectNameStrategy {

    private final String subjectName;

    public CommonSubjectNameStrategy(String subjectName) {
        this.subjectName = subjectName;
    }

    @Override
    public String subjectName(String topic, boolean isKey, ParsedSchema schema) {
        return this.subjectName;
    }

    @Override
    public void configure(Map<String, ?> configs) {}
}
