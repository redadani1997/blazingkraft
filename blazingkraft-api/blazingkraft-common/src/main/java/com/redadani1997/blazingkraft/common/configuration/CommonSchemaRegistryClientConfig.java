package com.redadani1997.blazingkraft.common.configuration;

import io.confluent.kafka.schemaregistry.client.SchemaRegistryClientConfig;
import org.apache.kafka.common.config.ConfigDef;

public class CommonSchemaRegistryClientConfig {
    // schema.registry.
    // missing.cache.size
    // missing.id.cache.ttl.sec
    // missing.schema.cache.ttl.sec
    private static ConfigDef CONFIG;

    static {
        CONFIG =
                (new ConfigDef())
                        .define(
                                "basic.auth.credentials.source",
                                ConfigDef.Type.STRING,
                                "URL",
                                ConfigDef.Importance.MEDIUM,
                                "Specify how to pick the credentials for Basic Auth header. The supported values are URL, USER_INFO and SASL_INHERIT")
                        .define(
                                "basic.auth.user.info",
                                ConfigDef.Type.PASSWORD,
                                "",
                                ConfigDef.Importance.MEDIUM,
                                "Specify the user info for Basic Auth in the form of {username}:{password}")
                        .define(
                                "bearer.auth.credentials.source",
                                ConfigDef.Type.STRING,
                                "STATIC_TOKEN",
                                ConfigDef.Importance.MEDIUM,
                                "Specify how to pick the credentials for Bearer Auth header. ")
                        .define(
                                "bearer.auth.token",
                                ConfigDef.Type.PASSWORD,
                                "",
                                ConfigDef.Importance.MEDIUM,
                                "Specify the Bearer token to be used for authentication")
                        .define(
                                "proxy.host",
                                ConfigDef.Type.STRING,
                                "",
                                ConfigDef.Importance.LOW,
                                "The hostname, or address, of the proxy server that will be used to connect to the schema "
                                        + "registry instances.")
                        .define(
                                "proxy.port",
                                ConfigDef.Type.INT,
                                -1,
                                ConfigDef.Importance.LOW,
                                "The port number of the proxy server that will be used to connect to the schema registry "
                                        + "instances.")
                        // Common config
                        .define(
                                "schema.registry.url",
                                ConfigDef.Type.LIST,
                                "",
                                ConfigDef.Importance.HIGH,
                                "Comma-separated list of URLs for schema registry instances that can be used to register or look up schemas. If you wish to get a connection to a mocked schema registry for testing, you can specify a scope using the 'mock://' pseudo-protocol. For example, 'mock://my-scope-name' corresponds to 'MockSchemaRegistry.getClientForScope(\"my-scope-name\")'.")
                        .define(
                                "max.schemas.per.subject",
                                ConfigDef.Type.INT,
                                1000,
                                ConfigDef.Importance.LOW,
                                "Maximum number of schemas to create or cache locally.");
        SchemaRegistryClientConfig.withClientSslSupport(
                CONFIG, SchemaRegistryClientConfig.CLIENT_NAMESPACE);
    }

    public static ConfigDef configDef() {
        return new ConfigDef(CONFIG);
    }
}
