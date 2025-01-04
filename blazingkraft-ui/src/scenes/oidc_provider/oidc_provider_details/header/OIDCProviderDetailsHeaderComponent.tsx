import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteOIDCProvider from 'scenes/oidc_provider/delete_oidc_provider/DeleteOIDCProvider';
import { OIDCProvider } from 'scenes/oidc_provider/redux';

interface OIDCProviderDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    OIDCProviderDetails: OIDCProvider;
    isAuthorizedEditOIDCProvider: boolean;
    isAuthorizedDeleteOIDCProvider: boolean;
}

function renderAdditionalActions(
    OIDCProviderCode,
    setIsDeleteOIDCProviderModalOpen,
    isAuthorizedEditOIDCProvider,
    isAuthorizedDeleteOIDCProvider,
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
                {isAuthorizedEditOIDCProvider && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to={`/management/oidc_providers/${OIDCProviderCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit OIDC Provider
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteOIDCProvider && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteOIDCProviderModalOpen(true);
                            }}
                        >
                            Delete OIDC Provider
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    OIDCProviderCode,
    OIDCProviderDetails,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteOIDCProviderModalOpen,
    isAuthorizedEditOIDCProvider,
    isAuthorizedDeleteOIDCProvider,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={OIDCProviderCode}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {!OIDCProviderDetails?.isSystem &&
                (isAuthorizedEditOIDCProvider ||
                    isAuthorizedDeleteOIDCProvider) &&
                renderAdditionalActions(
                    OIDCProviderCode,
                    setIsDeleteOIDCProviderModalOpen,
                    isAuthorizedEditOIDCProvider,
                    isAuthorizedDeleteOIDCProvider,
                )}
        </div>
    );
}

function OIDCProviderDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    OIDCProviderDetails,
    isAuthorizedEditOIDCProvider,
    isAuthorizedDeleteOIDCProvider,
}: OIDCProviderDetailsHeaderComponentProps) {
    const navigate = useNavigate();
    const { OIDCProviderCode } = useParams();
    const [isDeleteOIDCProviderModalOpen, setIsDeleteOIDCProviderModalOpen] =
        useState(false);

    const title = renderTitle(
        OIDCProviderCode,
        OIDCProviderDetails,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteOIDCProviderModalOpen,
        isAuthorizedEditOIDCProvider,
        isAuthorizedDeleteOIDCProvider,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Management',
                    },
                    {
                        highlighted: false,
                        to: '/management/oidc_providers',
                        label: 'OIDC Providers',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />
            <DeleteOIDCProvider
                OIDCProviderToDelete={OIDCProviderDetails}
                setIsModalOpen={setIsDeleteOIDCProviderModalOpen}
                isModalOpen={isDeleteOIDCProviderModalOpen}
                onSuccess={() => navigate('/management/oidc_providers')}
            />
        </>
    );
}

export default OIDCProviderDetailsHeaderComponent;
