import { ConnectPluginType } from 'common/types/connect_plugin';
import { IConnectorTaskMonitoring } from 'common/types/connector';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface ConnectorTasksMonitoringComponentProps {
    connectorTasksMonitoring: Map<number, IConnectorTaskMonitoring>;
    isMonitorConnectorTasksPending: boolean;
    connectorType: ConnectPluginType;
}

function getColumns(connectorType: ConnectPluginType): CommonTableColumn[] {
    const sourceColumns: CommonTableColumn[] = [
        {
            id: 'source-record-poll-total',
            label: 'source-record-poll-total',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'source-record-poll-rate',
            label: 'source-record-poll-rate',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'source-record-write-total',
            label: 'source-record-write-total',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'source-record-write-rate',
            label: 'source-record-write-rate',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'poll-batch-avg-time-ms',
            label: 'poll-batch-avg-time-ms',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
    ];
    const sinkColumns: CommonTableColumn[] = [
        {
            id: 'sink-record-read-rate',
            label: 'sink-record-read-rate',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'sink-record-read-total',
            label: 'sink-record-read-total',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'sink-record-send-rate',
            label: 'sink-record-send-rate',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'sink-record-send-total',
            label: 'sink-record-send-total',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'partition-count',
            label: 'partition-count',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'put-batch-avg-time-ms',
            label: 'put-batch-avg-time-ms',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
    ];
    const commonColumns: CommonTableColumn[] = [
        {
            id: 'total-record-errors',
            label: 'total-record-errors',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'total-record-failures',
            label: 'total-record-failures',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'total-records-skipped',
            label: 'total-records-skipped',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'running-ratio',
            label: 'running-ratio',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'pause-ratio',
            label: 'pause-ratio',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
        {
            id: 'batch-size-avg',
            label: 'batch-size-avg',
            filterable: false,
            sortable: true,
            width: '10%',
            minWidth: '8rem',
        },
    ];
    const taskColumn: CommonTableColumn = {
        id: 'id',
        label: 'id',
        filterable: false,
        sortable: true,
        width: '10%',
        minWidth: '8rem',
    };

    if (connectorType === 'source') {
        return [taskColumn, ...sourceColumns, ...commonColumns];
    } else if (connectorType === 'sink') {
        return [taskColumn, ...sinkColumns, ...commonColumns];
    }

    return [taskColumn, ...commonColumns];
}

function getData(
    connectorTasksMonitoringArray: {
        key: number;
        value: IConnectorTaskMonitoring;
    }[],
    connectorType: ConnectPluginType,
): CommonTableData[] {
    return connectorTasksMonitoringArray.map(entry => {
        const taskData: CommonTableData = {
            id: {
                value: entry.key,
                displayedValue: entry.key,
            },
        };
        const sourceDatas: CommonTableData = {
            ['source-record-poll-total']: {
                value: entry.value['source-record-poll-total'],
                displayedValue: valueOrUnavailable(
                    entry.value['source-record-poll-total'],
                ),
            },
            ['source-record-poll-rate']: {
                value: entry.value['source-record-poll-rate'],
                displayedValue: valueOrUnavailable(
                    entry.value['source-record-poll-rate'],
                ),
            },
            ['source-record-write-total']: {
                value: entry.value['source-record-write-total'],
                displayedValue: valueOrUnavailable(
                    entry.value['source-record-write-total'],
                ),
            },
            ['source-record-write-rate']: {
                value: entry.value['source-record-write-rate'],
                displayedValue: valueOrUnavailable(
                    entry.value['source-record-write-rate'],
                ),
            },
            ['poll-batch-avg-time-ms']: {
                value: entry.value['poll-batch-avg-time-ms'],
                displayedValue: valueOrUnavailable(
                    entry.value['poll-batch-avg-time-ms'],
                ),
            },
        };
        const sinkDatas: CommonTableData = {
            ['sink-record-read-rate']: {
                value: entry.value['sink-record-read-rate'],
                displayedValue: valueOrUnavailable(
                    entry.value['sink-record-read-rate'],
                ),
            },
            ['sink-record-read-total']: {
                value: entry.value['sink-record-read-total'],
                displayedValue: valueOrUnavailable(
                    entry.value['sink-record-read-total'],
                ),
            },
            ['sink-record-send-rate']: {
                value: entry.value['sink-record-send-rate'],
                displayedValue: valueOrUnavailable(
                    entry.value['sink-record-send-rate'],
                ),
            },
            ['sink-record-send-total']: {
                value: entry.value['sink-record-send-total'],
                displayedValue: valueOrUnavailable(
                    entry.value['sink-record-send-total'],
                ),
            },
            ['partition-count']: {
                value: entry.value['partition-count'],
                displayedValue: valueOrUnavailable(
                    entry.value['partition-count'],
                ),
            },
            ['put-batch-avg-time-ms']: {
                value: entry.value['put-batch-avg-time-ms'],
                displayedValue: valueOrUnavailable(
                    entry.value['put-batch-avg-time-ms'],
                ),
            },
        };
        const commonDatas: CommonTableData = {
            ['total-record-errors']: {
                value: entry.value['total-record-errors'],
                displayedValue: valueOrUnavailable(
                    entry.value['total-record-errors'],
                ),
            },
            ['total-record-failures']: {
                value: entry.value['total-record-failures'],
                displayedValue: valueOrUnavailable(
                    entry.value['total-record-failures'],
                ),
            },
            ['total-records-skipped']: {
                value: entry.value['total-records-skipped'],
                displayedValue: valueOrUnavailable(
                    entry.value['total-records-skipped'],
                ),
            },
            ['running-ratio']: {
                value: entry.value['running-ratio'],
                displayedValue: valueOrUnavailable(
                    CommonUtils.percentage(entry.value['running-ratio']),
                ),
            },
            ['pause-ratio']: {
                value: entry.value['pause-ratio'],
                displayedValue: valueOrUnavailable(
                    CommonUtils.percentage(entry.value['pause-ratio']),
                ),
            },
            ['batch-size-avg']: {
                value: entry.value['batch-size-avg'],
                displayedValue: valueOrUnavailable(
                    entry.value['batch-size-avg'],
                ),
            },
        };
        if (connectorType === 'source') {
            return { ...taskData, ...sourceDatas, ...commonDatas };
        } else if (connectorType === 'sink') {
            return { ...taskData, ...sinkDatas, ...commonDatas };
        }

        return { ...taskData, ...commonDatas };
    });
}

function valueOrUnavailable(value: string) {
    if (CommonValidationUtils.isFalsy(value)) {
        return '---unavailable---';
    }
    return value;
}

const ConnectorTasksMonitoringComponent = ({
    connectorTasksMonitoring,
    isMonitorConnectorTasksPending,
    connectorType,
}: ConnectorTasksMonitoringComponentProps) => {
    const connectorTasksMonitoringArray = useMemo(() => {
        return CommonUtils.mapToArray(connectorTasksMonitoring);
    }, [connectorTasksMonitoring]);

    const memoizedData = useMemo(() => {
        return getData(connectorTasksMonitoringArray, connectorType);
    }, [connectorTasksMonitoring, connectorType]);

    const columns = useMemo(() => {
        return getColumns(connectorType);
    }, [connectorTasksMonitoring, connectorType]);

    return (
        <CommonClientTable
            filterType="menu"
            columns={columns}
            data={memoizedData}
            withPaging
            withTopFilter={false}
            totalElements={connectorTasksMonitoringArray.length}
            perPage={25}
            isLoading={isMonitorConnectorTasksPending}
            paperClassName="h-full w-full"
        />
    );
};

export default ConnectorTasksMonitoringComponent;
