import { Anchor } from '@mantine/core';
import { ConnectorWithExpandedInfoAndStatus } from 'common/types/connector';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllConnectorsBodyComponentProps {
    isListAllConnectorsWithExpandedInfoAndStatusPending: boolean;
    connectorsWithExpandedInfoAndStatus: ConnectorWithExpandedInfoAndStatus[];
    clusterCode: string;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '13rem',
            width: '25%',
        },
        {
            id: 'plugin',
            label: 'Plugin',
            filterable: true,
            sortable: true,
            minWidth: '13rem',
            width: '25%',
        },
        {
            id: 'type',
            label: 'Type',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
            customOptions: [
                {
                    value: 'source',
                    label: 'Source',
                },
                {
                    value: 'sink',
                    label: 'Sink',
                },
            ],
        },
        {
            id: 'status',
            label: 'Status',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
        },
        {
            id: 'topics',
            label: 'Topics',
            filterable: true,
            sortable: true,
            minWidth: '13rem',
            width: '20%',
        },
        {
            id: 'tasks',
            label: 'Tasks',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
        },
    ];
}

function getData(
    kafkaConnectCode,
    connectorsWithExpandedInfoAndStatus: ConnectorWithExpandedInfoAndStatus[],
    clusterCode,
): CommonTableData[] {
    return connectorsWithExpandedInfoAndStatus.map(connector => {
        const { name, config, type } = connector.info;
        const { state } = connector.status.connector;
        const { tasks: statusTasks } = connector.status;
        const plugin = config['connector.class'];
        const topics =
            config['kafka.topic'] || config['topics'] || config['topics.regex'];
        const tasks = statusTasks.length;

        return {
            name: {
                value: name,
                displayedValue: (
                    <Anchor
                        className="break-all"
                        component={Link}
                        to={`/kafka_connects/${kafkaConnectCode}/connectors/${name}/details`}
                    >
                        {name}
                    </Anchor>
                ),
            },
            plugin: {
                value: plugin,
                displayedValue: (
                    <Anchor
                        className="break-all"
                        component={Link}
                        to={`/kafka_connects/${kafkaConnectCode}/plugins/${plugin}`}
                    >
                        {plugin}
                    </Anchor>
                ),
            },
            type: {
                value: type,
                displayedValue: type,
            },
            status: {
                value: state,
                displayedValue: state,
            },
            topics: {
                value: topics,
                displayedValue: !clusterCode ? (
                    topics
                ) : (
                    <Anchor
                        className="break-all"
                        component={Link}
                        to={`/clusters/${clusterCode}/topics/${topics}`}
                    >
                        {topics}
                    </Anchor>
                ),
            },
            tasks: {
                value: tasks,
                displayedValue: tasks,
            },
        };
    });
}

const AllConnectorsBodyComponent = ({
    connectorsWithExpandedInfoAndStatus,
    isListAllConnectorsWithExpandedInfoAndStatusPending,
    clusterCode,
}: AllConnectorsBodyComponentProps) => {
    const { kafkaConnectCode } = useParams();

    const memoizedData = useMemo(
        () =>
            getData(
                kafkaConnectCode,
                connectorsWithExpandedInfoAndStatus,
                clusterCode,
            ),
        [connectorsWithExpandedInfoAndStatus, clusterCode],
    );

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={connectorsWithExpandedInfoAndStatus.length}
            perPage={25}
            isLoading={isListAllConnectorsWithExpandedInfoAndStatusPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllConnectorsBodyComponent;
