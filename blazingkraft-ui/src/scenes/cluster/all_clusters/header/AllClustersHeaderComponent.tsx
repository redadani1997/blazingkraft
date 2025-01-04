import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { BiImport } from 'react-icons/bi';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import ImportCluster from 'scenes/cluster/import_cluster/ImportCluster';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllClustersHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    clustersLength: number;
    isAuthorizedCreateCluster: boolean;
    isAuthorizedImportCluster: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    clustersLength,
    setIsImportClusterModalOpen,
    isAuthorizedCreateCluster,
    isAuthorizedImportCluster,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Clusters"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Clusters">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(clustersLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            <div>
                {isAuthorizedCreateCluster && (
                    <Button
                        component={Link}
                        to="/clusters/create"
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Cluster
                    </Button>
                )}

                {isAuthorizedImportCluster && (
                    <Button
                        onClick={() => {
                            setIsImportClusterModalOpen(true);
                        }}
                        leftIcon={<BiImport size={22} />}
                        variant="outline"
                        className="ml-2"
                    >
                        Import
                    </Button>
                )}
            </div>
        </div>
    );
}

function AllClustersHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    clustersLength,
    isAuthorizedCreateCluster,
    isAuthorizedImportCluster,
}: AllClustersHeaderComponentProps) {
    const [isImportClusterModalOpen, setIsImportClusterModalOpen] =
        useState(false);

    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        clustersLength,
        setIsImportClusterModalOpen,
        isAuthorizedCreateCluster,
        isAuthorizedImportCluster,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Clusters',
                    },
                ]}
                title={title}
            />

            <ImportCluster
                isModalOpen={isImportClusterModalOpen}
                setIsModalOpen={setIsImportClusterModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllClustersHeaderComponent;
