package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.common.serde.CommonSubjectNameStrategy;
import io.confluent.kafka.serializers.AbstractKafkaSchemaSerDeConfig;
import io.confluent.kafka.serializers.subject.strategy.SubjectNameStrategy;
import java.util.Map;
import lombok.experimental.UtilityClass;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serializer;

@UtilityClass
public class CommonSerdeUtils {

    private final String CUSTOM_SUBJECT_NAME_STRATEGY = "CUSTOM_SUBJECT_NAME_STRATEGY.";

    public SubjectNameStrategy getSubjectNameStrategy(String subjectNameStrategy) {
        return null;
    }

    public <T extends Serializer> void configureSerializer(
            T serializer, Boolean isKey, Map<String, Object> props) {

        props.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, "Ignore");

        String subjectNameStrategyKey =
                isKey
                        ? AbstractKafkaSchemaSerDeConfig.KEY_SUBJECT_NAME_STRATEGY
                        : AbstractKafkaSchemaSerDeConfig.VALUE_SUBJECT_NAME_STRATEGY;
        String subjectNameStrategyField = isKey ? "keySubjectNameStrategy" : "valueSubjectNameStrategy";

        Object strategyObject = props.get(subjectNameStrategyKey);
        if (strategyObject instanceof String subjectNameStrategy
                && subjectNameStrategy.startsWith(CUSTOM_SUBJECT_NAME_STRATEGY)) {
            props.remove(subjectNameStrategyKey);
        }

        serializer.configure(props, isKey);

        if (strategyObject instanceof String subjectNameStrategy
                && subjectNameStrategy.startsWith(CUSTOM_SUBJECT_NAME_STRATEGY)) {
            String customSubjectName =
                    subjectNameStrategy.substring(CUSTOM_SUBJECT_NAME_STRATEGY.length());

            CommonSubjectNameStrategy customSubjectNameStrategy =
                    new CommonSubjectNameStrategy(customSubjectName);
            CommonReflectionUtils.setField(
                    serializer, subjectNameStrategyField, customSubjectNameStrategy);
        }
    }

    public <T extends Deserializer> void configureDeserializer(
            T deserializer, Boolean isKey, Map<String, Object> props) {

        props.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, "Ignore");

        String subjectNameStrategyKey =
                isKey
                        ? AbstractKafkaSchemaSerDeConfig.KEY_SUBJECT_NAME_STRATEGY
                        : AbstractKafkaSchemaSerDeConfig.VALUE_SUBJECT_NAME_STRATEGY;
        String subjectNameStrategyField = isKey ? "keySubjectNameStrategy" : "valueSubjectNameStrategy";

        Object strategyObject = props.get(subjectNameStrategyKey);
        if (strategyObject instanceof String subjectNameStrategy
                && subjectNameStrategy.startsWith(CUSTOM_SUBJECT_NAME_STRATEGY)) {
            props.remove(subjectNameStrategyKey);
        }

        deserializer.configure(props, isKey);

        if (strategyObject instanceof String subjectNameStrategy
                && subjectNameStrategy.startsWith(CUSTOM_SUBJECT_NAME_STRATEGY)) {
            String customSubjectName =
                    subjectNameStrategy.substring(CUSTOM_SUBJECT_NAME_STRATEGY.length());

            CommonSubjectNameStrategy customSubjectNameStrategy =
                    new CommonSubjectNameStrategy(customSubjectName);
            CommonReflectionUtils.setField(
                    deserializer, subjectNameStrategyField, customSubjectNameStrategy);
        }
    }
}
