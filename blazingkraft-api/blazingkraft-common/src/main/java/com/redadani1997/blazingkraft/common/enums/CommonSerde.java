package com.redadani1997.blazingkraft.common.enums;

public enum CommonSerde {
    NULL,
    STRING,
    LONG,
    DOUBLE,
    BASE64,
    JSON,
    JSON_SCHEMA,
    JSON_SCHEMA_REGISTRY,
    AVRO_SCHEMA,
    AVRO_SCHEMA_REGISTRY,
    PROTOBUF_SCHEMA,
    PROTOBUF_SCHEMA_REGISTRY;

    public static boolean isSchemaRegistrySerde(CommonSerde serde) {
        if (serde == null) {
            return false;
        }
        return serde.equals(CommonSerde.AVRO_SCHEMA_REGISTRY)
                || serde.equals(CommonSerde.JSON_SCHEMA_REGISTRY)
                || serde.equals(CommonSerde.PROTOBUF_SCHEMA_REGISTRY);
    }

    public static boolean isSchemaSerde(CommonSerde serde) {
        if (serde == null) {
            return false;
        }
        return serde.equals(CommonSerde.AVRO_SCHEMA)
                || serde.equals(CommonSerde.JSON_SCHEMA)
                || serde.equals(CommonSerde.PROTOBUF_SCHEMA);
    }
}
