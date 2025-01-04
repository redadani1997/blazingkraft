package com.redadani1997.blazingkraft.common.configuration;

import static org.apache.kafka.common.config.ConfigDef.Range.atLeast;
import static org.apache.kafka.common.config.ConfigDef.Range.between;
import static org.apache.kafka.common.config.ConfigDef.ValidList;
import static org.apache.kafka.common.config.ConfigDef.ValidString;

import java.util.Collections;
import org.apache.kafka.common.config.ConfigDef;
import org.apache.kafka.common.config.TopicConfig;

public class CommonTopicConfig {

    private static ConfigDef CONFIG;

    static {
        CONFIG =
                new ConfigDef()
                        .define(
                                TopicConfig.CLEANUP_POLICY_CONFIG,
                                ConfigDef.Type.LIST,
                                Collections.singletonList(TopicConfig.CLEANUP_POLICY_DELETE),
                                ValidList.in(
                                        TopicConfig.CLEANUP_POLICY_DELETE.toString(),
                                        TopicConfig.CLEANUP_POLICY_COMPACT.toString()),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.CLEANUP_POLICY_DOC)
                        .define(
                                TopicConfig.COMPRESSION_TYPE_CONFIG,
                                ConfigDef.Type.STRING,
                                "producer",
                                ValidString.in("uncompressed", "zstd", "lz4", "snappy", "gzip", "producer"),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.COMPRESSION_TYPE_DOC)
                        .define(
                                TopicConfig.DELETE_RETENTION_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                86400000,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.DELETE_RETENTION_MS_DOC)
                        .define(
                                TopicConfig.FILE_DELETE_DELAY_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                60000,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.FILE_DELETE_DELAY_MS_DOC)
                        .define(
                                TopicConfig.FLUSH_MESSAGES_INTERVAL_CONFIG,
                                ConfigDef.Type.LONG,
                                Long.MAX_VALUE,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.FLUSH_MESSAGES_INTERVAL_DOC)
                        .define(
                                TopicConfig.FLUSH_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                Long.MAX_VALUE,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.FLUSH_MS_DOC)
                        .define(
                                TopicConfig.INDEX_INTERVAL_BYTES_CONFIG,
                                ConfigDef.Type.INT,
                                4096,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.INDEX_INTERVAL_BYTES_DOC)
                        .define(
                                TopicConfig.MAX_COMPACTION_LAG_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                Long.MAX_VALUE,
                                atLeast(1),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MAX_COMPACTION_LAG_MS_DOC)
                        .define(
                                TopicConfig.MAX_MESSAGE_BYTES_CONFIG,
                                ConfigDef.Type.INT,
                                1048588,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MAX_COMPACTION_LAG_MS_DOC)
                        .define(
                                TopicConfig.MESSAGE_TIMESTAMP_DIFFERENCE_MAX_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                Long.MAX_VALUE,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MESSAGE_TIMESTAMP_DIFFERENCE_MAX_MS_DOC)
                        .define(
                                TopicConfig.MESSAGE_TIMESTAMP_TYPE_CONFIG,
                                ConfigDef.Type.STRING,
                                "CreateTime",
                                ValidString.in("LogAppendTime", "CreateTime"),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MESSAGE_TIMESTAMP_TYPE_DOC)
                        .define(
                                TopicConfig.MIN_CLEANABLE_DIRTY_RATIO_CONFIG,
                                ConfigDef.Type.DOUBLE,
                                0.5,
                                between(0, 1),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MIN_CLEANABLE_DIRTY_RATIO_CONFIG)
                        .define(
                                TopicConfig.MIN_COMPACTION_LAG_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                0,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MIN_COMPACTION_LAG_MS_DOC)
                        .define(
                                TopicConfig.MIN_IN_SYNC_REPLICAS_CONFIG,
                                ConfigDef.Type.INT,
                                1,
                                atLeast(1),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.MIN_IN_SYNC_REPLICAS_DOC)
                        .define(
                                TopicConfig.PREALLOCATE_CONFIG,
                                ConfigDef.Type.BOOLEAN,
                                false,
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.PREALLOCATE_DOC)
                        .define(
                                TopicConfig.RETENTION_BYTES_CONFIG,
                                ConfigDef.Type.LONG,
                                -1,
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.RETENTION_BYTES_DOC)
                        .define(
                                TopicConfig.RETENTION_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                604800000,
                                atLeast(-1),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.RETENTION_MS_DOC)
                        .define(
                                TopicConfig.SEGMENT_BYTES_CONFIG,
                                ConfigDef.Type.INT,
                                1073741824,
                                atLeast(14),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.SEGMENT_BYTES_DOC)
                        .define(
                                TopicConfig.SEGMENT_INDEX_BYTES_CONFIG,
                                ConfigDef.Type.INT,
                                10485760,
                                atLeast(14),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.SEGMENT_INDEX_BYTES_DOC)
                        .define(
                                TopicConfig.SEGMENT_JITTER_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                0,
                                atLeast(0),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.SEGMENT_JITTER_MS_DOC)
                        .define(
                                TopicConfig.SEGMENT_MS_CONFIG,
                                ConfigDef.Type.LONG,
                                604800000,
                                atLeast(1),
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.SEGMENT_MS_DOC)
                        .define(
                                TopicConfig.UNCLEAN_LEADER_ELECTION_ENABLE_CONFIG,
                                ConfigDef.Type.BOOLEAN,
                                false,
                                ConfigDef.Importance.MEDIUM,
                                TopicConfig.UNCLEAN_LEADER_ELECTION_ENABLE_DOC)
                        .define(
                                TopicConfig.MESSAGE_DOWNCONVERSION_ENABLE_CONFIG,
                                ConfigDef.Type.BOOLEAN,
                                true,
                                ConfigDef.Importance.LOW,
                                TopicConfig.MESSAGE_DOWNCONVERSION_ENABLE_DOC);
    }

    public static ConfigDef configDef() {
        return new ConfigDef(CONFIG);
    }
}
