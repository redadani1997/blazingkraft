import { ActionIcon, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ClusterMeta, IClusterDescription } from 'scenes/cluster/redux';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import AllClustersBodyLink from './link/AllClustersBodyLink';

interface AllClustersBodyComponentProps {
    clusters?: ClusterMeta[];
    isGetAllClustersPending: boolean;
    isAuthorizedDeleteCluster: boolean;
    isAuthorizedEditCluster: boolean;
    setClusterToDelete: (clusterCode: string) => void;
    setIsDeleteClusterModalOpen: (isModalOpen: boolean) => void;
    clustersDescriptions: Map<string, IClusterDescription>;
    isGetClustersDescriptionsPending: Map<string, boolean>;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '18rem',
            width: '25%',
        },
        {
            id: 'schemaRegistry',
            label: 'Schema Registry',
            filterable: false,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
        {
            id: 'brokers',
            label: 'Brokers',
            filterable: false,
            sortable: true,
            minWidth: '7rem',
            width: '10%',
        },
        {
            id: 'numberOfTopics',
            label: 'Topics',
            filterable: false,
            sortable: true,
            minWidth: '7rem',
            width: '10%',
        },
        {
            id: 'kafkaVersion',
            label: 'Kafka Version',
            filterable: false,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'totalBytesWritten',
            label: 'Bytes Written',
            filterable: false,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
    ];
}

function getData(
    clusters: ClusterMeta[],
    isAuthorizedDeleteCluster: boolean,
    isAuthorizedEditCluster: boolean,
    clustersDescriptions: Map<string, IClusterDescription>,
    isGetClustersDescriptionsPending: Map<string, boolean>,
    setClusterToDelete: (cluster: string) => void,
    setIsDeleteClusterModalOpen: (isModalOpen: boolean) => void,
): CommonTableData[] {
    return clusters.map(cluster => {
        const description = clustersDescriptions.get(cluster.code);
        const isDescriptionPending = isGetClustersDescriptionsPending.get(
            cluster.code,
        );
        return {
            name: {
                value: cluster.name,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <AllClustersBodyLink
                            code={cluster.code}
                            name={cluster.name}
                        />
                        {(isAuthorizedEditCluster ||
                            isAuthorizedDeleteCluster) && (
                            <div className="pl-2 flex">
                                {isAuthorizedEditCluster && (
                                    <Tooltip label="Edit">
                                        <ActionIcon
                                            color="blue"
                                            component={Link}
                                            to={`/clusters/${cluster.code}/edit`}
                                        >
                                            <TbPencil size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {isAuthorizedDeleteCluster && (
                                    <Tooltip label="Delete">
                                        <ActionIcon
                                            className="ml-1"
                                            color="red"
                                            onClick={() => {
                                                setClusterToDelete(
                                                    cluster.code,
                                                );
                                                setIsDeleteClusterModalOpen(
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
            schemaRegistry: {
                value: cluster.schemaRegistryName,
                displayedValue:
                    cluster.schemaRegistryName || '---unavailable---',
            },
            numberOfTopics: {
                value: description?.topics,
                displayedValue: description?.topics,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            brokers: {
                value: description?.brokers,
                displayedValue: description?.brokers,
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            kafkaVersion: {
                value: description?.kafkaVersion,
                displayedValue:
                    description?.kafkaVersion || '---unavailable---',
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
            totalBytesWritten: {
                value: description?.totalBytesWritten,
                displayedValue: description?.totalBytesWritten
                    ? CommonUtils.beautifyBytes(description?.totalBytesWritten)
                    : '---unavailable---',
                isLoading: isDescriptionPending,
                isError: !description?.succeeded,
                errorMessage: description?.errorMessage,
            },
        };
    });
}

const AllClustersBodyComponent = ({
    clusters,
    isGetAllClustersPending,
    isAuthorizedDeleteCluster,
    isAuthorizedEditCluster,
    setClusterToDelete,
    setIsDeleteClusterModalOpen,
    clustersDescriptions,
    isGetClustersDescriptionsPending,
}: AllClustersBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            clusters,
            isAuthorizedDeleteCluster,
            isAuthorizedEditCluster,
            clustersDescriptions,
            isGetClustersDescriptionsPending,
            setClusterToDelete,
            setIsDeleteClusterModalOpen,
        );
    }, [
        clusters,
        isAuthorizedDeleteCluster,
        isAuthorizedEditCluster,
        clustersDescriptions,
        isGetClustersDescriptionsPending,
    ]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={clusters.length}
            perPage={5}
            isLoading={isGetAllClustersPending}
            paperClassName="h-5/6 w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllClustersBodyComponent;
