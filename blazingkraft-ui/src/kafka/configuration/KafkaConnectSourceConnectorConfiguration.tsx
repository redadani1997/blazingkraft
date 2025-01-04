// Configurations
import configActionReload from './kafka_connect_source/config.action.reload';
import connectorClass from './kafka_connect_source/connector.class';
import errorsLogEnable from './kafka_connect_source/errors.log.enable';
import errorsLogIncludeMessages from './kafka_connect_source/errors.log.include.messages';
import errorsRetryDelayMaxMs from './kafka_connect_source/errors.retry.delay.max.ms';
import errorsRetryTimeout from './kafka_connect_source/errors.retry.timeout';
import errorsTolerance from './kafka_connect_source/errors.tolerance';
import exactlyOnceSupport from './kafka_connect_source/exactly.once.support';
import headerConverter from './kafka_connect_source/header.converter';
import keyConverter from './kafka_connect_source/key.converter';
import name from './kafka_connect_source/name';
import offsetsStorageTopic from './kafka_connect_source/offsets.storage.topic';
import predicates from './kafka_connect_source/predicates';
import tasksMax from './kafka_connect_source/tasks.max';
import topicCreationGroups from './kafka_connect_source/topic.creation.groups';
import transactionBoundary from './kafka_connect_source/transaction.boundary';
import transactionBoundaryIntervalMs from './kafka_connect_source/transaction.boundary.interval.ms';
import transforms from './kafka_connect_source/transforms';
import valueConverter from './kafka_connect_source/value.converter';

const configurations = [
    configActionReload,
    connectorClass,
    errorsLogEnable,
    errorsLogIncludeMessages,
    errorsRetryDelayMaxMs,
    errorsRetryTimeout,
    errorsTolerance,
    exactlyOnceSupport,
    headerConverter,
    keyConverter,
    name,
    offsetsStorageTopic,
    predicates,
    tasksMax,
    topicCreationGroups,
    transactionBoundary,
    transactionBoundaryIntervalMs,
    transforms,
    valueConverter,
];

const KafkaConnectSourceConnectorConfiguration = { configurations };

export { KafkaConnectSourceConnectorConfiguration };
