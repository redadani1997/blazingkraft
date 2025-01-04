package com.redadani1997.blazingkraft.generator.configuration;

import org.apache.kafka.common.config.ConfigDef;

public class KafkaConnectSourceConnectorConfiguration {

    private static ConfigDef CONFIG;

    static {
        CONFIG =
                new ConfigDef()
                        .define(
                                "name",
                                ConfigDef.Type.STRING,
                                null,
                                new ConfigDef.NonEmptyString(),
                                ConfigDef.Importance.HIGH,
                                "Globally unique name to use for this connector.")
                        .define(
                                "connector.class",
                                ConfigDef.Type.STRING,
                                null,
                                null,
                                ConfigDef.Importance.HIGH,
                                "Name or alias of the class for this connector. Must be a subclass of org.apache.kafka.connect.connector.Connector. If the connector is org.apache.kafka.connect.file.FileStreamSinkConnector, you can either specify this full name, or use “FileStreamSink” or “FileStreamSinkConnector” to make the configuration a bit shorter")
                        .define(
                                "tasks.max",
                                ConfigDef.Type.INT,
                                1,
                                ConfigDef.Range.atLeast(1),
                                ConfigDef.Importance.HIGH,
                                "Maximum number of tasks to use for this connector.")
                        .define(
                                "key.converter",
                                ConfigDef.Type.CLASS,
                                null,
                                null,
                                ConfigDef.Importance.LOW,
                                "Converter class used to convert between Kafka Connect format and the serialized form that is written to Kafka. This controls the format of the keys in messages written to or read from Kafka, and since this is independent of connectors it allows any connector to work with any serialization format. Examples of common formats include JSON and Avro.")
                        .define(
                                "value.converter",
                                ConfigDef.Type.CLASS,
                                null,
                                null,
                                ConfigDef.Importance.LOW,
                                "Converter class used to convert between Kafka Connect format and the serialized form that is written to Kafka. This controls the format of the values in messages written to or read from Kafka, and since this is independent of connectors it allows any connector to work with any serialization format. Examples of common formats include JSON and Avro.")
                        .define(
                                "header.converter",
                                ConfigDef.Type.CLASS,
                                null,
                                null,
                                ConfigDef.Importance.LOW,
                                "HeaderConverter class used to convert between Kafka Connect format and the serialized form that is written to Kafka. This controls the format of the header values in messages written to or read from Kafka, and since this is independent of connectors it allows any connector to work with any serialization format. Examples of common formats include JSON and Avro. By default, the SimpleHeaderConverter is used to serialize header values to strings and deserialize them by inferring the schemas.")
                        .define(
                                "config.action.reload",
                                ConfigDef.Type.STRING,
                                "restart",
                                ConfigDef.ValidString.in("none", "restart"),
                                ConfigDef.Importance.LOW,
                                "The action that Connect should take on the connector when changes in external configuration providers result in a change in the connector’s configuration properties. A value of ‘none’ indicates that Connect will do nothing. A value of ‘restart’ indicates that Connect should restart/reload the connector with the updated configuration properties.The restart may actually be scheduled in the future if the external configuration provider indicates that a configuration value will expire in the future.")
                        .define(
                                "transforms",
                                ConfigDef.Type.LIST,
                                "",
                                null,
                                ConfigDef.Importance.LOW,
                                "Aliases for the transformations to be applied to records.")
                        .define(
                                "predicates",
                                ConfigDef.Type.LIST,
                                null,
                                null,
                                ConfigDef.Importance.LOW,
                                "Aliases for the predicates used by transformations.")
                        .define(
                                "errors.retry.timeout",
                                ConfigDef.Type.LONG,
                                0,
                                null,
                                ConfigDef.Importance.MEDIUM,
                                "The maximum duration in milliseconds that a failed operation will be reattempted. The default is 0, which means no retries will be attempted. Use -1 for infinite retries.")
                        .define(
                                "errors.retry.delay.max.ms",
                                ConfigDef.Type.LONG,
                                60000,
                                null,
                                ConfigDef.Importance.MEDIUM,
                                "The maximum duration in milliseconds between consecutive retry attempts. Jitter will be added to the delay once this limit is reached to prevent thundering herd issues.")
                        .define(
                                "errors.tolerance",
                                ConfigDef.Type.STRING,
                                "none",
                                ConfigDef.ValidString.in("none", "all"),
                                ConfigDef.Importance.MEDIUM,
                                "Behavior for tolerating errors during connector operation. ‘none’ is the default value and signals that any error will result in an immediate connector task failure; ‘all’ changes the behavior to skip over problematic records.")
                        .define(
                                "errors.log.enable",
                                ConfigDef.Type.BOOLEAN,
                                false,
                                null,
                                ConfigDef.Importance.MEDIUM,
                                "If true, write each error and the details of the failed operation and problematic record to the Connect application log. This is ‘false’ by default, so that only errors that are not tolerated are reported.")
                        .define(
                                "errors.log.include.messages",
                                ConfigDef.Type.BOOLEAN,
                                false,
                                null,
                                ConfigDef.Importance.MEDIUM,
                                "Whether to include in the log the Connect record that resulted in a failure.For sink records, the topic, partition, offset, and timestamp will be logged. For source records, the key and value (and their schemas), all headers, and the timestamp, Kafka topic, Kafka partition, source partition, and source offset will be logged. This is ‘false’ by default, which will prevent record keys, values, and headers from being written to log files.")
                        .define(
                                "topic.creation.groups",
                                ConfigDef.Type.LIST,
                                "",
                                null,
                                ConfigDef.Importance.LOW,
                                "Groups of configurations for topics created by source connectors")
                        .define(
                                "exactly.once.support",
                                ConfigDef.Type.STRING,
                                "REQUESTED",
                                ConfigDef.ValidString.in("REQUIRED", "REQUESTED"),
                                ConfigDef.Importance.MEDIUM,
                                "Permitted values are requested, required. If set to “required”, forces a preflight check for the connector to ensure that it can provide exactly-once delivery with the given configuration. Some connectors may be capable of providing exactly-once delivery but not signal to Connect that they support this; in that case, documentation for the connector should be consulted carefully before creating it, and the value for this property should be set to “requested”. Additionally, if the value is set to “required” but the worker that performs preflight validation does not have exactly-once support enabled for source connectors, requests to create or validate the connector will fail.")
                        .define(
                                "transaction.boundary",
                                ConfigDef.Type.STRING,
                                "POLL",
                                ConfigDef.ValidString.in("INTERVAL", "POLL", "CONNECTOR"),
                                ConfigDef.Importance.MEDIUM,
                                "Permitted values are: poll, interval, connector. If set to ‘poll’, a new producer transaction will be started and committed for every batch of records that each task from this connector provides to Connect. If set to ‘connector’, relies on connector-defined transaction boundaries; note that not all connectors are capable of defining their own transaction boundaries, and in that case, attempts to instantiate a connector with this value will fail. Finally, if set to ‘interval’, commits transactions only after a user-defined time interval has passed.")
                        .define(
                                "transaction.boundary.interval.ms",
                                ConfigDef.Type.LONG,
                                null,
                                null,
                                ConfigDef.Importance.LOW,
                                "If ‘transaction.boundary’ is set to ‘interval’, determines the interval for producer transaction commits by connector tasks. If unset, defaults to the value of the worker-level ‘offset.flush.interval.ms’ property. It has no effect if a different transaction.boundary is specified.")
                        .define(
                                "offsets.storage.topic",
                                ConfigDef.Type.STRING,
                                null,
                                new ConfigDef.NonEmptyString(),
                                ConfigDef.Importance.LOW,
                                "The name of a separate offsets topic to use for this connector. If empty or not specified, the worker?s global offsets topic name will be used. If specified, the offsets topic will be created if it does not already exist on the Kafka cluster targeted by this connector (which may be different from the one used for the worker’s global offsets topic if the bootstrap.servers property of the connector’s producer has been overridden from the worker’s). Only applicable in distributed mode; in standalone mode, setting this property will have no effect.");
    }

    public static ConfigDef configDef() {
        return new ConfigDef(CONFIG);
    }
}
