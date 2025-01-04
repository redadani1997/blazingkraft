// Configurations
import cleanupPolicy from './topic/cleanup.policy';
import compressionType from './topic/compression.type';
import deleteRetentionMs from './topic/delete.retention.ms';
import fileDeleteDelayMs from './topic/file.delete.delay.ms';
import flushMessages from './topic/flush.messages';
import flushMs from './topic/flush.ms';
import indexIntervalBytes from './topic/index.interval.bytes';
import maxCompactionLagMs from './topic/max.compaction.lag.ms';
import maxMessageBytes from './topic/max.message.bytes';
import messageDownconversionEnable from './topic/message.downconversion.enable';
import messageTimestampDifferenceMaxMs from './topic/message.timestamp.difference.max.ms';
import messageTimestampType from './topic/message.timestamp.type';
import minCleanableDirtyRatio from './topic/min.cleanable.dirty.ratio';
import minCompactionLagMs from './topic/min.compaction.lag.ms';
import minInsyncReplicas from './topic/min.insync.replicas';
import preallocate from './topic/preallocate';
import retentionBytes from './topic/retention.bytes';
import retentionMs from './topic/retention.ms';
import segmentBytes from './topic/segment.bytes';
import segmentIndexBytes from './topic/segment.index.bytes';
import segmentJitterMs from './topic/segment.jitter.ms';
import segmentMs from './topic/segment.ms';
import uncleanLeaderElectionEnable from './topic/unclean.leader.election.enable';

const configurations = [
    cleanupPolicy,
    compressionType,
    deleteRetentionMs,
    fileDeleteDelayMs,
    flushMessages,
    flushMs,
    indexIntervalBytes,
    maxCompactionLagMs,
    maxMessageBytes,
    messageDownconversionEnable,
    messageTimestampDifferenceMaxMs,
    messageTimestampType,
    minCleanableDirtyRatio,
    minCompactionLagMs,
    minInsyncReplicas,
    preallocate,
    retentionBytes,
    retentionMs,
    segmentBytes,
    segmentIndexBytes,
    segmentJitterMs,
    segmentMs,
    uncleanLeaderElectionEnable,
];

const TopicConfiguration = { configurations };

export { TopicConfiguration };
