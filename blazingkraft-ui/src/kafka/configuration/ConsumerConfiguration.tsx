// Configurations
import allowAutoCreateTopics from './consumer/allow.auto.create.topics';
import autoCommitIntervalMs from './consumer/auto.commit.interval.ms';
import autoOffsetReset from './consumer/auto.offset.reset';
import checkCrcs from './consumer/check.crcs';
import clientRack from './consumer/client.rack';
import enableAutoCommit from './consumer/enable.auto.commit';
import excludeInternalTopics from './consumer/exclude.internal.topics';
import fetchMaxBytes from './consumer/fetch.max.bytes';
import fetchMaxWaitMs from './consumer/fetch.max.wait.ms';
import fetchMinBytes from './consumer/fetch.min.bytes';
import groupId from './consumer/group.id';
import groupInstanceId from './consumer/group.instance.id';
import heartbeatIntervalMs from './consumer/heartbeat.interval.ms';
import interceptorClasses from './consumer/interceptor.classes';
import internalLeaveGroupOnClose from './consumer/internal.leave.group.on.close';
import internalThrowOnFetchStableOffsetUnsupported from './consumer/internal.throw.on.fetch.stable.offset.unsupported';
import isolationLevel from './consumer/isolation.level';
import maxPartitionFetchBytes from './consumer/max.partition.fetch.bytes';
import maxPollIntervalMs from './consumer/max.poll.interval.ms';
import maxPollRecords from './consumer/max.poll.records';
import partitionAssignmentStrategy from './consumer/partition.assignment.strategy';
import sessionTimeoutMs from './consumer/session.timeout.ms';

const configurations = [
    allowAutoCreateTopics,
    autoCommitIntervalMs,
    autoOffsetReset,
    checkCrcs,
    clientRack,
    enableAutoCommit,
    excludeInternalTopics,
    fetchMaxBytes,
    fetchMaxWaitMs,
    fetchMinBytes,
    groupId,
    groupInstanceId,
    heartbeatIntervalMs,
    interceptorClasses,
    internalLeaveGroupOnClose,
    internalThrowOnFetchStableOffsetUnsupported,
    isolationLevel,
    maxPartitionFetchBytes,
    maxPollIntervalMs,
    maxPollRecords,
    partitionAssignmentStrategy,
    sessionTimeoutMs,
];

const ConsumerConfiguration = { configurations };

export { ConsumerConfiguration };
