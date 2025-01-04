// Configurations
import configActionReload from './kafka_connect_sink/config.action.reload';
import connectorClass from './kafka_connect_sink/connector.class';
import errorsDeadletterqueueContextHeadersEnable from './kafka_connect_sink/errors.deadletterqueue.context.headers.enable';
import errorsDeadletterqueueTopicName from './kafka_connect_sink/errors.deadletterqueue.topic.name';
import errorsDeadletterqueueTopicReplicationFactor from './kafka_connect_sink/errors.deadletterqueue.topic.replication.factor';
import errorsLogEnable from './kafka_connect_sink/errors.log.enable';
import errorsLogIncludeMessages from './kafka_connect_sink/errors.log.include.messages';
import errorsRetryDelayMaxMs from './kafka_connect_sink/errors.retry.delay.max.ms';
import errorsRetryTimeout from './kafka_connect_sink/errors.retry.timeout';
import errorsTolerance from './kafka_connect_sink/errors.tolerance';
import headerConverter from './kafka_connect_sink/header.converter';
import keyConverter from './kafka_connect_sink/key.converter';
import name from './kafka_connect_sink/name';
import predicates from './kafka_connect_sink/predicates';
import tasksMax from './kafka_connect_sink/tasks.max';
import topics from './kafka_connect_sink/topics';
import topicsRegex from './kafka_connect_sink/topics.regex';
import transforms from './kafka_connect_sink/transforms';
import valueConverter from './kafka_connect_sink/value.converter';

const configurations = [
    configActionReload,
    connectorClass,
    errorsDeadletterqueueContextHeadersEnable,
    errorsDeadletterqueueTopicName,
    errorsDeadletterqueueTopicReplicationFactor,
    errorsLogEnable,
    errorsLogIncludeMessages,
    errorsRetryDelayMaxMs,
    errorsRetryTimeout,
    errorsTolerance,
    headerConverter,
    keyConverter,
    name,
    predicates,
    tasksMax,
    topics,
    topicsRegex,
    transforms,
    valueConverter,
];

const KafkaConnectSinkConnectorConfiguration = { configurations };

export { KafkaConnectSinkConnectorConfiguration };
