// Configurations
import acks from './producer/acks';
import batchSize from './producer/batch.size';
import bufferMemory from './producer/buffer.memory';
import compressionType from './producer/compression.type';
import deliveryTimeoutMs from './producer/delivery.timeout.ms';
import enableIdempotence from './producer/enable.idempotence';
import interceptorClasses from './producer/interceptor.classes';
import lingerMs from './producer/linger.ms';
import maxBlockMs from './producer/max.block.ms';
import maxInFlightRequestsPerConnection from './producer/max.in.flight.requests.per.connection';
import maxRequestSize from './producer/max.request.size';
import metadataMaxIdleMs from './producer/metadata.max.idle.ms';
import partitionerAdaptivePartitioningEnable from './producer/partitioner.adaptive.partitioning.enable';
import partitionerAvailabilityTimeoutMs from './producer/partitioner.availability.timeout.ms';
import partitionerClass from './producer/partitioner.class';
import partitionerIgnoreKeys from './producer/partitioner.ignore.keys';
import transactionTimeoutMs from './producer/transaction.timeout.ms';
import transactionalId from './producer/transactional.id';

const configurations = [
    acks,
    batchSize,
    bufferMemory,
    compressionType,
    deliveryTimeoutMs,
    enableIdempotence,
    interceptorClasses,
    lingerMs,
    maxBlockMs,
    maxInFlightRequestsPerConnection,
    maxRequestSize,
    metadataMaxIdleMs,
    partitionerAdaptivePartitioningEnable,
    partitionerAvailabilityTimeoutMs,
    partitionerClass,
    partitionerIgnoreKeys,
    transactionTimeoutMs,
    transactionalId,
];

const ProducerConfiguration = { configurations };

export { ProducerConfiguration };
