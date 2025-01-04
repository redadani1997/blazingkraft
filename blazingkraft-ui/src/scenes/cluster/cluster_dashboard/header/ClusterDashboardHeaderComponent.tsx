import { Menu } from '@mantine/core';
import { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteCluster from 'scenes/cluster/delete_cluster/DeleteCluster';
import ExportCluster from 'scenes/cluster/export_cluster/ExportCluster';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface ClusterDashboardHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedDeleteCluster: boolean;
    isAuthorizedEditCluster: boolean;
    isAuthorizedExportCluster: boolean;
}

function renderAdditionalActions(
    clusterCode,
    setIsDeleteClusterModalOpen,
    setIsExportClusterModalOpen,
    isAuthorizedDeleteCluster,
    isAuthorizedEditCluster,
    isAuthorizedExportCluster,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <div className="w-auto">
                    <CommonButton
                        variant="outline"
                        color="blue"
                        leftIcon={<IoArrowDownCircleOutline size="1.4rem" />}
                    >
                        Actions
                    </CommonButton>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                {(isAuthorizedEditCluster || isAuthorizedExportCluster) && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            onClick={() => {
                                setIsExportClusterModalOpen(true);
                            }}
                            icon={<BiExport size="1rem" />}
                        >
                            Export Cluster
                        </Menu.Item>
                        <Menu.Item
                            component={Link}
                            to={`/clusters/${clusterCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit Cluster
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteCluster && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteClusterModalOpen(true);
                            }}
                        >
                            Delete Cluster
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteClusterModalOpen,
    setIsExportClusterModalOpen,
    isAuthorizedDeleteCluster,
    isAuthorizedEditCluster,
    isAuthorizedExportCluster,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Dashboard"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditCluster ||
                isAuthorizedDeleteCluster ||
                isAuthorizedExportCluster) &&
                renderAdditionalActions(
                    clusterCode,
                    setIsDeleteClusterModalOpen,
                    setIsExportClusterModalOpen,
                    isAuthorizedDeleteCluster,
                    isAuthorizedEditCluster,
                    isAuthorizedExportCluster,
                )}
        </div>
    );
}

function ClusterDashboardHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedDeleteCluster,
    isAuthorizedEditCluster,
    isAuthorizedExportCluster,
}: ClusterDashboardHeaderComponentProps) {
    const { clusterCode } = useParams();
    const [isDeleteClusterModalOpen, setIsDeleteClusterModalOpen] =
        useState(false);
    const [isExportClusterModalOpen, setIsExportClusterModalOpen] =
        useState(false);
    const navigate = useNavigate();

    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteClusterModalOpen,
        setIsExportClusterModalOpen,
        isAuthorizedDeleteCluster,
        isAuthorizedEditCluster,
        isAuthorizedExportCluster,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/clusters',
                        label: 'Clusters',
                    },
                    {
                        highlighted: true,
                        label: clusterCode,
                    },
                ]}
                title={title}
            />
            <DeleteCluster
                clusterToDelete={clusterCode}
                isModalOpen={isDeleteClusterModalOpen}
                setIsModalOpen={setIsDeleteClusterModalOpen}
                onSuccess={() => {
                    navigate('/clusters');
                }}
            />
            <ExportCluster
                clusterToExport={clusterCode}
                isModalOpen={isExportClusterModalOpen}
                setIsModalOpen={setIsExportClusterModalOpen}
            />
        </>
    );
}

export default ClusterDashboardHeaderComponent;
