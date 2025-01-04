package com.redadani1997.blazingkraft.generator.utils;

import java.util.HashSet;

public class GeneratorFile {

    public static HashSet<String> fileConfiguration = new HashSet<>();

    static {
        fileConfiguration.add("ssl.keystore.location");
        fileConfiguration.add("ssl.truststore.location");
        fileConfiguration.add("schema.registry.ssl.keystore.location");
        fileConfiguration.add("schema.registry.ssl.truststore.location");
    }
}
