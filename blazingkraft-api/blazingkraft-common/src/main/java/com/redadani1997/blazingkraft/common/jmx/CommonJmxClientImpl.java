package com.redadani1997.blazingkraft.common.jmx;

import com.redadani1997.blazingkraft.error.jmx.JmxException;
import java.io.IOException;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;

public class CommonJmxClientImpl implements CommonJmxClient {
    private String url;
    private Map<String, Object> environment;
    private Boolean connected = false;

    private JMXConnector jmxConnector;
    private MBeanServerConnection connection;

    public CommonJmxClientImpl(String url, Map<String, Object> environment) {
        this.url = url;
        this.environment = this.computeEnvironment(environment);
        this.connected = false;
    }

    @Override
    public Object getValue(String name, String attribute) {
        if (!this.connected) {
            this.connect();
        }
        try {
            ObjectName objectName = new ObjectName(name);
            return this.connection.getAttribute(objectName, attribute);
        } catch (IOException ex) {
            // try to reconnect
            this.connect();
            try {
                ObjectName objectName = new ObjectName(name);
                return this.connection.getAttribute(objectName, attribute);
            } catch (Exception e) {
                return null;
            }
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public String getStringValue(String name, String attribute) {
        Object value = this.getValue(name, attribute);
        if (value == null) {
            return null;
        }
        return value.toString();
    }

    @Override
    public void testConnection() {
        if (!this.connected) {
            this.connect();
        }
        try {
            this.connection.queryNames(null, null);
        } catch (Exception ex) {
            throw new JmxException(ex);
        }
    }

    @Override
    public void close() throws Exception {
        if (this.jmxConnector != null) {
            this.jmxConnector.close();
        }
    }

    private void connect() {
        try {
            JMXServiceURL serviceUrl = new JMXServiceURL(this.url);

            this.jmxConnector = JMXConnectorFactory.connect(serviceUrl, this.environment);

            this.connection = this.jmxConnector.getMBeanServerConnection();

            this.connected = true;
        } catch (Exception ex) {
            throw new JmxException(ex);
        }
    }

    private Map<String, Object> computeEnvironment(Map<String, Object> environment) {
        if (environment == null) {
            return null;
        }
        return environment.entrySet().stream()
                .map(
                        entry -> {
                            if (entry.getValue() instanceof List<?> entryValue) {
                                try {
                                    String[] array = entryValue.toArray(new String[0]);
                                    return new AbstractMap.SimpleEntry<>(entry.getKey(), array);
                                } catch (Exception e) {
                                    return entry;
                                }
                            }
                            return entry;
                        })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}
