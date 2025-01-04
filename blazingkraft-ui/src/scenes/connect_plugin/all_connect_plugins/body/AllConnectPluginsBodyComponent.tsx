import { Anchor } from '@mantine/core';
import { ConnectPlugin } from 'common/types/connector';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllConnectorsBodyComponentProps {
    isListAllConnectPluginsPending: boolean;
    allConnectPlugins: ConnectPlugin[];
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'class',
            label: 'Class',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '50%',
        },
        {
            id: 'type',
            customOptions: [
                {
                    label: 'Source',
                    value: 'source',
                },
                {
                    label: 'Sink',
                    value: 'sink',
                },
                {
                    label: 'Converter',
                    value: 'converter',
                },
                {
                    label: 'Header Converter',
                    value: 'header_converter',
                },
                {
                    label: 'Transformation',
                    value: 'transformation',
                },
            ],
            label: 'Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
        {
            id: 'version',
            label: 'Version',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
    ];
}

function getData(
    kafkaConnectCode: string,
    allConnectPlugins: ConnectPlugin[],
): CommonTableData[] {
    return allConnectPlugins.map(plugin => {
        return {
            class: {
                value: plugin.class,
                displayedValue: (
                    <Anchor
                        className="break-all"
                        component={Link}
                        to={`/kafka_connects/${kafkaConnectCode}/plugins/${plugin.class}`}
                    >
                        {plugin.class}
                    </Anchor>
                ),
            },
            type: {
                value: plugin.type,
                displayedValue: plugin.type,
            },
            version: {
                value: plugin.version,
                displayedValue: plugin.version,
            },
            // For unicity reasons only. Don't touch it.
            id: {
                value: plugin.id,
                displayedValue: plugin.id,
            },
        };
    });
}

const AllConnectorsBodyComponent = ({
    allConnectPlugins,
    isListAllConnectPluginsPending,
}: AllConnectorsBodyComponentProps) => {
    const { kafkaConnectCode } = useParams();

    const memoizedData = useMemo(
        () => getData(kafkaConnectCode, allConnectPlugins),
        [allConnectPlugins],
    );

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={allConnectPlugins.length}
            perPage={25}
            isLoading={isListAllConnectPluginsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllConnectorsBodyComponent;
