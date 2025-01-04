import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { MdAutorenew } from 'react-icons/md';
import { TbCirclePlus, TbClock, TbDotsVertical } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import CreateDelegationToken from 'scenes/delegation_token/create_delegation_token/CreateDelegationToken';

interface AllDelegationTokensHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    delegationTokensLength: number;
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void;
    setDelegationTokenToRenew: (hmac: string) => void;
    setDelegationTokenToExpire: (hmac: string) => void;
    isAuthorizedCreateDelegationToken: boolean;
    isAuthorizedExpireDelegationToken: boolean;
    isAuthorizedRenewDelegationToken: boolean;
}

function renderAdditionalActions(
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void,
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void,
    setDelegationTokenToRenew: (hmac: string) => void,
    setDelegationTokenToExpire: (hmac: string) => void,
    isAuthorizedExpireDelegationToken: boolean,
    isAuthorizedRenewDelegationToken: boolean,
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
                {isAuthorizedRenewDelegationToken && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            icon={<MdAutorenew size="1rem" />}
                            onClick={() => {
                                setIsRenewDelegationTokenModalOpen(true);
                                setDelegationTokenToRenew('');
                            }}
                        >
                            Renew Delegation Token
                        </Menu.Item>
                        <Menu.Divider />
                    </>
                )}
                {isAuthorizedExpireDelegationToken && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbClock size="1rem" />}
                            onClick={() => {
                                setIsExpireDelegationTokenModalOpen(true);
                                setDelegationTokenToExpire('');
                            }}
                        >
                            Expire Delegation Token
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
    delegationTokensLength,
    setIsCreateDelegationTokenModalOpen,
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void,
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void,
    setDelegationTokenToRenew: (hmac: string) => void,
    setDelegationTokenToExpire: (hmac: string) => void,
    isAuthorizedCreateDelegationToken,
    isAuthorizedExpireDelegationToken,
    isAuthorizedRenewDelegationToken,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Delegation Tokens"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Delegation Tokens">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    delegationTokensLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            <div className="flex items-center">
                {isAuthorizedCreateDelegationToken && (
                    <Button
                        onClick={() =>
                            setIsCreateDelegationTokenModalOpen(true)
                        }
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Delegation Token
                    </Button>
                )}
                {(isAuthorizedRenewDelegationToken ||
                    isAuthorizedExpireDelegationToken) &&
                    renderAdditionalActions(
                        setIsRenewDelegationTokenModalOpen,
                        setIsExpireDelegationTokenModalOpen,
                        setDelegationTokenToRenew,
                        setDelegationTokenToExpire,
                        isAuthorizedExpireDelegationToken,
                        isAuthorizedRenewDelegationToken,
                    )}
            </div>
        </div>
    );
}

function AllDelegationTokensHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    delegationTokensLength,
    setIsRenewDelegationTokenModalOpen,
    setIsExpireDelegationTokenModalOpen,
    setDelegationTokenToRenew,
    setDelegationTokenToExpire,
    isAuthorizedCreateDelegationToken,
    isAuthorizedExpireDelegationToken,
    isAuthorizedRenewDelegationToken,
}: AllDelegationTokensHeaderComponentProps) {
    const { clusterCode } = useParams();
    const [
        isCreateDelegationTokenModalOpen,
        setIsCreateDelegationTokenModalOpen,
    ] = useState(false);
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        delegationTokensLength,
        setIsCreateDelegationTokenModalOpen,
        setIsRenewDelegationTokenModalOpen,
        setIsExpireDelegationTokenModalOpen,
        setDelegationTokenToRenew,
        setDelegationTokenToExpire,
        isAuthorizedCreateDelegationToken,
        isAuthorizedExpireDelegationToken,
        isAuthorizedRenewDelegationToken,
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
                        label: 'Delegation Tokens',
                    },
                ]}
                title={title}
            />
            <CreateDelegationToken
                isModalOpen={isCreateDelegationTokenModalOpen}
                setIsModalOpen={setIsCreateDelegationTokenModalOpen}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default AllDelegationTokensHeaderComponent;
