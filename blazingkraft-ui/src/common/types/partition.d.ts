import { KafkaNode } from './node';

export interface PartitionInfo {
    partition: number;
    leader: KafkaNode;
    replicas: KafkaNode[];
    isr: KafkaNode[];
}
