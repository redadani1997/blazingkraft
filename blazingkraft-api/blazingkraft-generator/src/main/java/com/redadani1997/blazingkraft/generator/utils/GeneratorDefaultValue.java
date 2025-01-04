package com.redadani1997.blazingkraft.generator.utils;

import java.util.HashMap;

public class GeneratorDefaultValue {

    public static HashMap<String, Object> defaultValueOverrides = new HashMap<>();

    static {
        // ADMIN
        defaultValueOverrides.put("default.api.timeout.ms", "20000");
        defaultValueOverrides.put("request.timeout.ms", "20000");
        defaultValueOverrides.put("reconnect.backoff.ms", "2000");
        defaultValueOverrides.put("reconnect.backoff.max.ms", "2500");

        // CONSUMER
        defaultValueOverrides.put("enable.auto.commit", false);
        //        defaultValueOverrides.put("partition.assignment.strategy", null);

        // PRODUCER
        defaultValueOverrides.put("max.block.ms", "20000");
        defaultValueOverrides.put("transaction.timeout.ms", "20000");

        // SCHEMA REGISTRY
        defaultValueOverrides.put("bearer.auth.credentials.source", null);
    }
}
