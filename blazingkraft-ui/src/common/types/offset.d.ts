export interface OffsetInfo {
    offset: number;
    timestamp: number;
    leaderEpoch: number;
    partition: number;
    topic: string;
}

export interface Offset {
    offset: number;
    metadata: string;
    leaderEpoch: number;
    partition: number;
    topic: string;
}

export type IsolationLevel = 'READ_COMMITTED' | 'READ_UNCOMMITTED';

export type OffsetSpec =
    | 'EARLIEST'
    | 'LATEST'
    | 'TIMESTAMP'
    | 'MAX_TIMESTAMP'
    | 'NONE';
