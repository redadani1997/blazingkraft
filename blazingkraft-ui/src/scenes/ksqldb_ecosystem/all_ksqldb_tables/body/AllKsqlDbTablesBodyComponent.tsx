import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { KsqlDbTable } from 'scenes/ksqldb_ecosystem/redux';

interface AllKsqlDbTablesBodyComponentProps {
    isGetAllKsqlDbTablesPending: boolean;
    ksqlDbTables: KsqlDbTable[];
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

function getData(ksqlDbTables: KsqlDbTable[]): CommonTableData[] {
    return ksqlDbTables.map(table => {
        return {
            name: {
                value: table.name,
                displayedValue: table.name,
            },
            topic: {
                value: table.topic,
                displayedValue: table.topic,
            },
            keyFormat: {
                value: table.keyFormat || table.format,
                displayedValue: table.keyFormat || table.format,
            },
            valueFormat: {
                value: table.valueFormat || table.format,
                displayedValue: table.valueFormat || table.format,
            },
            isWindowed: {
                value: table.isWindowed,
                displayedValue: table.isWindowed ? 'Yes' : 'No',
            },
        };
    });
}

const AllKsqlDbTablesBodyComponent = ({
    ksqlDbTables,
    isGetAllKsqlDbTablesPending,
}: AllKsqlDbTablesBodyComponentProps) => {
    const memoizedData = useMemo(() => getData(ksqlDbTables), [ksqlDbTables]);

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={ksqlDbTables.length}
            perPage={25}
            isLoading={isGetAllKsqlDbTablesPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllKsqlDbTablesBodyComponent;
