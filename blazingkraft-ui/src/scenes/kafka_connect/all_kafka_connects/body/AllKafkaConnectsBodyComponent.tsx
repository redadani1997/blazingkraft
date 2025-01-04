import { ActionIcon, Tooltip } from '@mantine/core';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import {
    IKafkaConnectDescription,
    KafkaConnectMeta,
} from 'scenes/kafka_connect/redux';
import AllKafkaConnectsBodyLink from './link/AllKafkaConnectsBodyLink';

interface AllKafkaConnectsBodyComponentProps {
    kafkaConnects?: KafkaConnectMeta[];
    isGetAllKafkaConnectsPending: boolean;
    setIsDeleteKafkaConnectModalOpen: (isModalOpen: boolean) => void;
    setKafkaConnectToDelete: (kafkaConnectToDelete: string | null) => void;
    isAuthorizedDeleteKafkaConnect: boolean;
    isAuthorizedEditKafkaConnect: boolean;
    isGetKafkaConnectsDescriptionsPending: Map<string, boolean>;
    kafkaConnectsDescriptions: Map<string, IKafkaConnectDescription>;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '35%',
        },
        {
            id: 'clusterName',
            label: 'Cluster',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'version',
            label: 'Version',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'kafka_cluster_id',
            label: 'Kafka Cluster Id',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'commit',
            label: 'Commit',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
    ];
}

function getData(
    kafkaConnects: KafkaConnectMeta[],
    setIsDeleteKafkaConnectModalOpen: (isModalOpen: boolean) => void,
    setKafkaConnectToDelete: (kafkaConnectToDelete: string | null) => void,
    isGetKafkaConnectsDescriptionsPending: Map<string, boolean>,
    kafkaConnectsDescriptions: Map<string, IKafkaConnectDescription>,
    isAuthorizedDeleteKafkaConnect: boolean,
    isAuthorizedEditKafkaConnect: boolean,
): CommonTableData[] {
    return kafkaConnects.map(kafkaConnect => {
        const description = kafkaConnectsDescriptions.get(kafkaConnect.code);
        const isDescriptionPending = isGetKafkaConnectsDescriptionsPending.get(
            kafkaConnect.code,
        );
        return {
            name: {
                value: kafkaConnect.name,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <AllKafkaConnectsBodyLink
                            code={kafkaConnect.code}
                            name={kafkaConnect.name}
                        />
                        {(isAuthorizedEditKafkaConnect ||
                            isAuthorizedDeleteKafkaConnect) && (
                            <div className="pl-2 flex">
                                {isAuthorizedEditKafkaConnect && (
                                    <Tooltip label="Edit">
                                        <ActionIcon
                                            color="blue"
                                            component={Link}
                                            to={`/kafka_connects/${kafkaConnect.code}/edit`}
                                        >
                                            <TbPencil size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {isAuthorizedDeleteKafkaConnect && (
                                    <Tooltip label="Delete">
                                        <ActionIcon
                                            className="ml-1"
                                            color="red"
                                            onClick={() => {
                                                setKafkaConnectToDelete(
                                                    kafkaConnect.code,
                                                );
                                                setIsDeleteKafkaConnectModalOpen(
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
            clusterName: {
                value: kafkaConnect.clusterName,
                displayedValue: kafkaConnect.clusterName || '---unavailable---',
            },
            version: {
                value: description?.version,
                displayedValue: description?.version,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            kafka_cluster_id: {
                value: description?.kafka_cluster_id,
                displayedValue: (
                    <div className="break-all">
                        {description?.kafka_cluster_id}
                    </div>
                ),
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            commit: {
                value: description?.commit,
                displayedValue: (
                    <div className="break-all">{description?.commit}</div>
                ),
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
        };
    });
}

const AllKafkaConnectsBodyComponent = ({
    kafkaConnects,
    isGetAllKafkaConnectsPending,
    setIsDeleteKafkaConnectModalOpen,
    setKafkaConnectToDelete,
    isAuthorizedDeleteKafkaConnect,
    isAuthorizedEditKafkaConnect,
    isGetKafkaConnectsDescriptionsPending,
    kafkaConnectsDescriptions,
}: AllKafkaConnectsBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                kafkaConnects,
                setIsDeleteKafkaConnectModalOpen,
                setKafkaConnectToDelete,
                isGetKafkaConnectsDescriptionsPending,
                kafkaConnectsDescriptions,
                isAuthorizedDeleteKafkaConnect,
                isAuthorizedEditKafkaConnect,
            ),
        [
            kafkaConnects,
            setIsDeleteKafkaConnectModalOpen,
            setKafkaConnectToDelete,
            isGetKafkaConnectsDescriptionsPending,
            kafkaConnectsDescriptions,
            isAuthorizedDeleteKafkaConnect,
            isAuthorizedEditKafkaConnect,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={kafkaConnects.length}
            perPage={5}
            isLoading={isGetAllKafkaConnectsPending}
            paperClassName="h-5/6 w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllKafkaConnectsBodyComponent;
