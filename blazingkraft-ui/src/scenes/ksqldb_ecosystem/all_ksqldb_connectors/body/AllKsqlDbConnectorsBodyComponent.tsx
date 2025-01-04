import { ActionIcon, Tooltip } from '@mantine/core';
import { useMemo, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import DeleteKsqlDbConnector from 'scenes/ksqldb_ecosystem/delete_ksqldb_connector/DeleteKsqlDbConnector';
import { KsqlDbConnector } from 'scenes/ksqldb_ecosystem/redux';

interface AllKsqlDbConnectorsBodyComponentProps {
    isGetAllKsqlDbConnectorsPending: boolean;
    ksqlDbConnectors: KsqlDbConnector[];
    isAuthorizedKsqlDbDeleteConnector: boolean;
    refreshPageContent: () => void;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '30%',
        },
        {
            id: 'type',
            label: 'Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
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
            id: 'className',
            label: 'Class Name',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
        {
            id: 'state',
            label: 'State',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
    ];
}

function getData(
    ksqlDbConnectors: KsqlDbConnector[],
    isAuthorizedKsqlDbDeleteConnector: boolean,
    setConnectorNameToDelete: (connectorName: string) => void,
    setIsDeleteModalOpen: (isOpen: boolean) => void,
): CommonTableData[] {
    return ksqlDbConnectors.map(connector => {
        return {
            name: {
                value: connector.name,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        {connector.name}
                        {isAuthorizedKsqlDbDeleteConnector && (
                            <div className="pl-2 flex">
                                <Tooltip label="Drop">
                                    <ActionIcon
                                        className="ml-1"
                                        color="red"
                                        onClick={() => {
                                            setConnectorNameToDelete(
                                                connector.name,
                                            );
                                            setIsDeleteModalOpen(true);
                                        }}
                                    >
                                        <TbTrash size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                ),
            },
            type: {
                value: connector.type,
                displayedValue: connector.type,
            },
            className: {
                value: connector.className,
                displayedValue: connector.className,
            },
            state: {
                value: connector.state,
                displayedValue: connector.state,
            },
        };
    });
}

const AllKsqlDbConnectorsBodyComponent = ({
    ksqlDbConnectors,
    isGetAllKsqlDbConnectorsPending,
    isAuthorizedKsqlDbDeleteConnector,
    refreshPageContent,
}: AllKsqlDbConnectorsBodyComponentProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [connectorNameToDelete, setConnectorNameToDelete] = useState('');

    const memoizedData = useMemo(
        () =>
            getData(
                ksqlDbConnectors,
                isAuthorizedKsqlDbDeleteConnector,
                setConnectorNameToDelete,
                setIsDeleteModalOpen,
            ),
        [ksqlDbConnectors, isAuthorizedKsqlDbDeleteConnector],
    );

    return (
        <>
            <CommonClientTable
                filterType="menu"
                columns={getColumns()}
                data={memoizedData}
                withPaging
                withTopFilter
                totalElements={ksqlDbConnectors.length}
                perPage={25}
                isLoading={isGetAllKsqlDbConnectorsPending}
                paperClassName="h-full w-full"
                // tableClassName="h-full w-full"
            />
            <DeleteKsqlDbConnector
                connectorNameToDelete={connectorNameToDelete}
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
};

export default AllKsqlDbConnectorsBodyComponent;
