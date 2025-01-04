import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { useMemo, useState } from 'react';
import { TbEyeCheck } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { KsqlDbQuery } from 'scenes/ksqldb_ecosystem/redux';
import AllKsqlDbQueriesBodySqlDetails from './sql/AllKsqlDbQueriesBodySqlDetails';

interface AllKsqlDbQueriesBodyComponentProps {
    isGetAllKsqlDbQueriesPending: boolean;
    ksqlDbQueries: KsqlDbQuery[];
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'id',
            label: 'Id',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '30%',
        },
        {
            id: 'queryType',
            label: 'Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'sql',
            label: 'Sql',
            filterable: false,
            sortable: false,
            minWidth: '9rem',
            width: '11%',
        },
        {
            id: 'sink',
            label: 'Sink',
            filterable: true,
            sortable: true,
            minWidth: '9rem',
            width: '22%',
        },
        {
            id: 'sinkTopic',
            label: 'Sink Topic',
            filterable: true,
            sortable: true,
            minWidth: '9rem',
            width: '22%',
        },
    ];
}

function getData(
    ksqlDbQueries: KsqlDbQuery[],
    setSelectedQuery,
    setIsDetailsModelOpen,
): CommonTableData[] {
    return ksqlDbQueries.map(query => {
        return {
            id: {
                value: query.id,
                displayedValue: <div className="break-all">{query.id}</div>,
            },
            queryType: {
                value: query.queryType,
                displayedValue: query.queryType,
            },
            sql: {
                value: query.sql,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <Text color="dimmed">View SQL</Text>
                        <div className="pl-2 flex">
                            <Tooltip label="Details">
                                <ActionIcon
                                    className="ml-1"
                                    color="red"
                                    onClick={() => {
                                        setSelectedQuery(query);
                                        setIsDetailsModelOpen(true);
                                    }}
                                >
                                    <TbEyeCheck size="1.3rem" />
                                </ActionIcon>
                            </Tooltip>
                        </div>
                    </div>
                ),
            },
            sink: {
                value: query.sink,
                displayedValue: query.sink || (
                    <Text color="dimmed">---unavailable---</Text>
                ),
            },
            sinkTopic: {
                value: query.sinkTopic,
                displayedValue: query.sinkTopic || (
                    <Text color="dimmed">---unavailable---</Text>
                ),
            },
        };
    });
}

const AllKsqlDbQueriesBodyComponent = ({
    ksqlDbQueries,
    isGetAllKsqlDbQueriesPending,
}: AllKsqlDbQueriesBodyComponentProps) => {
    const [isDetailsModelOpen, setIsDetailsModelOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState<KsqlDbQuery | null>(
        null,
    );

    const memoizedData = useMemo(
        () => getData(ksqlDbQueries, setSelectedQuery, setIsDetailsModelOpen),
        [ksqlDbQueries],
    );

    return (
        <>
            <CommonClientTable
                filterType="menu"
                columns={getColumns()}
                data={memoizedData}
                withPaging
                withTopFilter
                totalElements={ksqlDbQueries.length}
                perPage={25}
                isLoading={isGetAllKsqlDbQueriesPending}
                paperClassName="h-full w-full"
                // queryClassName="h-full w-full"
            />
            <AllKsqlDbQueriesBodySqlDetails
                isModalOpen={isDetailsModelOpen}
                setIsModalOpen={setIsDetailsModelOpen}
                ksqlDbQuery={selectedQuery}
            />
        </>
    );
};

export default AllKsqlDbQueriesBodyComponent;
