import { ActionIcon, Tooltip } from '@mantine/core';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { IKsqlDbDescription, KsqlDbMeta } from 'scenes/ksqldb/redux';
import AllKsqlDBsBodyLink from './link/AllKsqlDBsBodyLink';

interface AllKsqlDbsBodyComponentProps {
    ksqlDbs?: KsqlDbMeta[];
    isGetAllKsqlDbsPending: boolean;
    setIsDeleteKsqlDbModalOpen: (isModalOpen: boolean) => void;
    setKsqlDbToDelete: (ksqlDbToDelete: string | null) => void;
    isAuthorizedDeleteKsqlDb: boolean;
    isAuthorizedEditKsqlDb: boolean;
    ksqlDbsDescriptions: Map<string, IKsqlDbDescription>;
    isGetKsqlDbsDescriptionsPending: Map<string, boolean>;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '40%',
        },
        {
            id: 'serverVersion',
            label: 'Server Version',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'kafkaClusterId',
            label: 'Kafka Cluster',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'ksqlServiceId',
            label: 'Ksql Service',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
    ];
}

function getData(
    ksqlDbs: KsqlDbMeta[],
    setIsDeleteKsqlDbModalOpen: (isModalOpen: boolean) => void,
    setKsqlDbToDelete: (ksqlDbToDelete: string | null) => void,
    ksqlDbsDescriptions: Map<string, IKsqlDbDescription>,
    isGetKsqlDbsDescriptionsPending: Map<string, boolean>,
    isAuthorizedDeleteKsqlDb: boolean,
    isAuthorizedEditKsqlDb: boolean,
): CommonTableData[] {
    return ksqlDbs.map(ksqlDb => {
        const description = ksqlDbsDescriptions.get(ksqlDb.code);
        const isDescriptionPending = isGetKsqlDbsDescriptionsPending.get(
            ksqlDb.code,
        );
        return {
            name: {
                value: ksqlDb.name,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <AllKsqlDBsBodyLink
                            code={ksqlDb.code}
                            name={ksqlDb.name}
                        />
                        {(isAuthorizedEditKsqlDb ||
                            isAuthorizedDeleteKsqlDb) && (
                            <div className="pl-2 flex">
                                {isAuthorizedEditKsqlDb && (
                                    <Tooltip label="Edit">
                                        <ActionIcon
                                            color="blue"
                                            component={Link}
                                            to={`/ksqlDbs/${ksqlDb.code}/edit`}
                                        >
                                            <TbPencil size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {isAuthorizedDeleteKsqlDb && (
                                    <Tooltip label="Delete">
                                        <ActionIcon
                                            className="ml-1"
                                            color="red"
                                            onClick={() => {
                                                setKsqlDbToDelete(ksqlDb.code);
                                                setIsDeleteKsqlDbModalOpen(
                                                    true,
                                                );
                                            }}
                                        >
                                            <TbTrash size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </div>
                        )}
                    </div>
                ),
            },
            serverVersion: {
                value: description?.serverVersion,
                displayedValue: description?.serverVersion,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            kafkaClusterId: {
                value: description?.kafkaClusterId,
                displayedValue: description?.kafkaClusterId,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            ksqlServiceId: {
                value: description?.ksqlServiceId,
                displayedValue: description?.ksqlServiceId,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
        };
    });
}

const AllKsqlDbsBodyComponent = ({
    ksqlDbs,
    isGetAllKsqlDbsPending,
    setIsDeleteKsqlDbModalOpen,
    setKsqlDbToDelete,
    isAuthorizedDeleteKsqlDb,
    isAuthorizedEditKsqlDb,
    ksqlDbsDescriptions,
    isGetKsqlDbsDescriptionsPending,
}: AllKsqlDbsBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                ksqlDbs,
                setIsDeleteKsqlDbModalOpen,
                setKsqlDbToDelete,
                ksqlDbsDescriptions,
                isGetKsqlDbsDescriptionsPending,
                isAuthorizedDeleteKsqlDb,
                isAuthorizedEditKsqlDb,
            ),
        [
            ksqlDbs,
            ksqlDbsDescriptions,
            isGetKsqlDbsDescriptionsPending,
            setIsDeleteKsqlDbModalOpen,
            setKsqlDbToDelete,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={ksqlDbs.length}
            perPage={5}
            isLoading={isGetAllKsqlDbsPending}
            paperClassName="h-5/6 w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllKsqlDbsBodyComponent;
