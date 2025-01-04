import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteKsqlDb from 'scenes/ksqldb/delete_ksqldb/DeleteKsqlDb';

interface KsqlDbDashboardHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedDeleteKsqlDb: boolean;
    isAuthorizedEditKsqlDb: boolean;
}

function renderAdditionalActions(
    ksqlDbCode,
    setIsDeleteKsqlDbModalOpen,
    isAuthorizedDeleteKsqlDb,
    isAuthorizedEditKsqlDb,
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
                {isAuthorizedEditKsqlDb && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to={`/ksqldbs/${ksqlDbCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit KsqlDb
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteKsqlDb && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteKsqlDbModalOpen(true);
                            }}
                        >
                            Delete KsqlDb
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    ksqlDbCode,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteKsqlDbModalOpen,
    isAuthorizedDeleteKsqlDb,
    isAuthorizedEditKsqlDb,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Dashboard"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditKsqlDb || isAuthorizedDeleteKsqlDb) &&
                renderAdditionalActions(
                    ksqlDbCode,
                    setIsDeleteKsqlDbModalOpen,
                    isAuthorizedDeleteKsqlDb,
                    isAuthorizedEditKsqlDb,
                )}
        </div>
    );
}

function KsqlDbDashboardHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedDeleteKsqlDb,
    isAuthorizedEditKsqlDb,
}: KsqlDbDashboardHeaderComponentProps) {
    const { ksqlDbCode } = useParams();
    const [isDeleteKsqlDbModalOpen, setIsDeleteKsqlDbModalOpen] =
        useState(false);
    const navigate = useNavigate();

    const title = renderTitle(
        ksqlDbCode,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteKsqlDbModalOpen,
        isAuthorizedDeleteKsqlDb,
        isAuthorizedEditKsqlDb,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/ksqldbs',
                        label: 'KsqlDbs',
                    },
                    {
                        highlighted: true,
                        label: ksqlDbCode,
                    },
                ]}
                title={title}
            />
            <DeleteKsqlDb
                ksqlDbToDelete={ksqlDbCode}
                isModalOpen={isDeleteKsqlDbModalOpen}
                setIsModalOpen={setIsDeleteKsqlDbModalOpen}
                onSuccess={() => {
                    navigate('/ksqldbs');
                }}
            />
        </>
    );
}

export default KsqlDbDashboardHeaderComponent;
