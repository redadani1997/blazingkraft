package com.redadani1997.blazingkraft.common.jmx;

import java.util.Map;

public interface CommonJmxClient extends AutoCloseable {
    Object getValue(String name, String attribute);

    String getStringValue(String name, String attribute);

    void testConnection();

    static CommonJmxClient create(String url, Map<String, Object> environment) {
        return new CommonJmxClientImpl(url, environment);
    }
}
