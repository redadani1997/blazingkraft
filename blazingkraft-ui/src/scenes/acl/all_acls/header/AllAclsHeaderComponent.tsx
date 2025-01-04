import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import { AclBinding } from 'common/types/acl_binding';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCirclePlus, TbDotsVertical, TbTrash } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import CreateAcl from 'scenes/acl/create_acl/CreateAcl';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllAclsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    aclsLength: number;
    setAclBindingToDelete: (aclBinding: AclBinding) => void;
    setIsDeleteAclBindingModalOpen: (isOpen: boolean) => void;
    isAuthorizedDeleteAcl: boolean;
    isAuthorizedCreateAcl: boolean;
}

function renderAdditionalActions(
    setAclBindingToDelete,
    setIsDeleteAclBindingModalOpen,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <Tooltip label="Actions">
                    <ActionIcon color="blue" className="ml-3">
                        <TbDotsVertical size="1.4rem" />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Danger Zone</Menu.Label>
                <Menu.Item
                    color="red"
                    icon={<TbTrash size="1rem" />}
                    onClick={() => {
                        setIsDeleteAclBindingModalOpen(true);
                        setAclBindingToDelete(null);
                    }}
                >
                    Delete ACl Binding
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    aclsLength,
    setIsCreateAclModalOpened,
    setAclBindingToDelete,
    setIsDeleteAclBindingModalOpen,
    isAuthorizedCreateAcl,
    isAuthorizedDeleteAcl,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="ACL Bindings"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of ACLs">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(aclsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            <div className="flex items-center">
                {isAuthorizedCreateAcl && (
                    <Button
                        onClick={() => setIsCreateAclModalOpened(true)}
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create ACL Binding
                    </Button>
                )}
                {isAuthorizedDeleteAcl &&
                    renderAdditionalActions(
                        setAclBindingToDelete,
                        setIsDeleteAclBindingModalOpen,
                    )}
            </div>
        </div>
    );
}

function AllAclsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    aclsLength,
    setAclBindingToDelete,
    setIsDeleteAclBindingModalOpen,
    isAuthorizedCreateAcl,
    isAuthorizedDeleteAcl,
}: AllAclsHeaderComponentProps) {
    const { clusterCode } = useParams();
    const [isCreateAclModalOpened, setIsCreateAclModalOpened] = useState(false);
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        aclsLength,
        setIsCreateAclModalOpened,
        setAclBindingToDelete,
        setIsDeleteAclBindingModalOpen,
        isAuthorizedCreateAcl,
        isAuthorizedDeleteAcl,
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
                        highlighted: false,
                        to: `/clusters/${clusterCode}/dashboard`,
                        label: clusterCode,
                    },
                    {
                        highlighted: true,
                        label: 'ACLs',
                    },
                ]}
                title={title}
            />
            <CreateAcl
                isModalOpen={isCreateAclModalOpened}
                setIsModalOpen={setIsCreateAclModalOpened}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default AllAclsHeaderComponent;
