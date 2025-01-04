import { ConnectPluginType } from './connect_plugin';

export interface TaskInfo {
    connector: string;
    task: number;
}

export interface ConnectorWithExpandedInfo {
    info: {
        name: string;
        config: {
            [key: string]: any;
        };
        tasks: TaskInfo[];
        type: ConnectPluginType;
    };
}

export interface ConnectorStatusTask {
    state: string;
    id: number;
    worker_id: number;
}

export interface ConnectorWithExpandedStatus {
    status: {
        name: string;
        connector: {
            state: string;
            worker_id: string;
        };
        tasks: ConnectorStatusTask[];
        type: ConnectPluginType;
    };
}

export interface ConnectorWithExpandedInfoAndStatus {
    status: {
        name: string;
        connector: {
            state: string;
            worker_id: string;
        };
        tasks: ConnectorStatusTask[];
        type: ConnectPluginType;
    };
    info: {
        name: string;
        config: {
            [key: string]: any;
        };
        tasks: TaskInfo[];
        type: ConnectPluginType;
    };
}

export interface ConnectorInfo {
    config: {
        [key: string]: any;
    };
    name: string;
    type: ConnectPluginType;
    tasks: TaskInfo[];
}

export interface TaskStateInfo {
    id: number;
    worker_id: string;
    state: string;
    msg: string;
    trace: string;
}

export interface ConnectorStateInfo {
    connector: {
        msg: string;
        state: string;
        trace: string;
        worker_id: string;
    };
    name: string;
    tasks: TaskStateInfo[];
    type: ConnectPluginType;
}

export interface IConnectorTaskMonitoring {
    // Errors
    ['total-record-errors']?: string;
    ['total-record-failures']?: string;
    ['total-records-skipped']?: string;

    // Source
    ['source-record-poll-total']?: string;
    ['source-record-poll-rate']?: string;
    ['source-record-write-total']?: string;
    ['source-record-write-rate']?: string;
    ['poll-batch-avg-time-ms']?: string;

    // Sink
    ['sink-record-read-rate']?: string;
    ['sink-record-read-total']?: string;
    ['sink-record-send-rate']?: string;
    ['sink-record-send-total']?: string;
    ['partition-count']?: string;
    ['put-batch-avg-time-ms']?: string;

    // Common
    ['running-ratio']?: string;
    ['pause-ratio']?: string;
    ['batch-size-avg']?: string;
}
