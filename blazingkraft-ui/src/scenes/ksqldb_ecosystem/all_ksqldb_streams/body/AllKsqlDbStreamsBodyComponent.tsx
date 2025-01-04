import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { KsqlDbStream } from 'scenes/ksqldb_ecosystem/redux';

interface AllKsqlDbStreamsBodyComponentProps {
    isGetAllKsqlDbStreamsPending: boolean;
    ksqlDbStreams: KsqlDbStream[];
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
            id: 'topic',
            label: 'Topic',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'keyFormat',
            label: 'Key Format',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'valueFormat',
            label: 'Value Format',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'isWindowed',
            label: 'Windowed',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
    ];
}

function getData(ksqlDbStreams: KsqlDbStream[]): CommonTableData[] {
    return ksqlDbStreams.map(stream => {
        return {
            name: {
                value: stream.name,
                displayedValue: stream.name,
            },
            topic: {
                value: stream.topic,
                displayedValue: stream.topic,
            },
            keyFormat: {
                value: stream.keyFormat || stream.format,
                displayedValue: stream.keyFormat || stream.format,
            },
            valueFormat: {
                value: stream.valueFormat || stream.format,
                displayedValue: stream.valueFormat || stream.format,
            },
            isWindowed: {
                value: stream.isWindowed,
                displayedValue: stream.isWindowed ? 'Yes' : 'No',
            },
        };
    });
}

const AllKsqlDbStreamsBodyComponent = ({
    ksqlDbStreams,
    isGetAllKsqlDbStreamsPending,
}: AllKsqlDbStreamsBodyComponentProps) => {
    const memoizedData = useMemo(() => getData(ksqlDbStreams), [ksqlDbStreams]);

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={ksqlDbStreams.length}
            perPage={25}
            isLoading={isGetAllKsqlDbStreamsPending}
            paperClassName="h-full w-full"
            // streamClassName="h-full w-full"
        />
    );
};

export default AllKsqlDbStreamsBodyComponent;
