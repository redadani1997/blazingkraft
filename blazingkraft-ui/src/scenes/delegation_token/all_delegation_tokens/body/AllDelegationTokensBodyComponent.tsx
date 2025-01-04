import { ActionIcon, Tooltip } from '@mantine/core';
import { DelegationToken } from 'common/types/delegation_token';
import { DelegationTokenUtils } from 'common/utils/DelegationTokenUtils';
import { useMemo } from 'react';
import { MdAutorenew } from 'react-icons/md';
import { TbClock, TbEyeCheck } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllDelegationTokensBodyComponentProps {
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsDelegationTokenDetailsModalOpen: (isOpen: boolean) => void;
    isDescribeDelegationTokensPending: boolean;
    delegationTokens: DelegationToken[];
    setDelegationTokenToRenew: (hmac: string) => void;
    setDelegationTokenToExpire: (hmac: string) => void;
    setDelegationTokenDetails: (
        delegationToken: DelegationToken | null,
    ) => void;
    isAuthorizedExpireDelegationToken: boolean;
    isAuthorizedRenewDelegationToken: boolean;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'owner',
            label: 'Owner',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
        {
            id: 'tokenRequester',
            label: 'Requester',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
        {
            id: 'renewers',
            label: 'Renewers',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '10%',
        },
        {
            id: 'tokenId',
            label: 'Token ID',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '30%',
        },
        {
            id: 'actions',
            label: 'Actions',
            filterable: false,
            sortable: false,
            minWidth: '5rem',
            width: '10%',
        },
    ];
}

function getData(
    delegationTokens: DelegationToken[],
    setIsExpireDelegationTokenModalOpen,
    setIsRenewDelegationTokenModalOpen,
    setIsDelegationTokenDetailsModalOpen,
    setDelegationTokenToRenew,
    setDelegationTokenToExpire,
    setDelegationTokenDetails,
    isAuthorizedExpireDelegationToken,
    isAuthorizedRenewDelegationToken,
): CommonTableData[] {
    return delegationTokens.map(delegationToken => {
        const owner = DelegationTokenUtils.formatOwner(
            delegationToken.tokenInformation.owner,
        );
        const requester = DelegationTokenUtils.formatRequester(
            delegationToken.tokenInformation.tokenRequester,
        );
        return {
            owner: {
                value: owner,
                displayedValue: owner,
            },
            tokenRequester: {
                value: requester,
                displayedValue: requester,
            },
            renewers: {
                value: delegationToken.tokenInformation.renewers.length,
                displayedValue:
                    delegationToken.tokenInformation.renewers.length,
            },
            tokenId: {
                value: delegationToken.tokenInformation.tokenId,
                displayedValue: delegationToken.tokenInformation.tokenId,
            },
            actions: {
                value: '',
                displayedValue: (
                    <div className="flex justify-around w-full">
                        <Tooltip label="Details">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setDelegationTokenDetails(delegationToken);
                                    setIsDelegationTokenDetailsModalOpen(true);
                                }}
                            >
                                <TbEyeCheck size="1.4rem" />
                            </ActionIcon>
                        </Tooltip>
                        {isAuthorizedRenewDelegationToken && (
                            <Tooltip label="Renew">
                                <ActionIcon
                                    color="green"
                                    onClick={() => {
                                        setDelegationTokenToRenew(
                                            delegationToken.hmac,
                                        );
                                        setIsRenewDelegationTokenModalOpen(
                                            true,
                                        );
                                    }}
                                >
                                    <MdAutorenew size="1.4rem" />
                                </ActionIcon>
                            </Tooltip>
                        )}
                        {isAuthorizedExpireDelegationToken && (
                            <Tooltip label="Expire">
                                <ActionIcon
                                    color="red"
                                    onClick={() => {
                                        setDelegationTokenToExpire(
                                            delegationToken.hmac,
                                        );
                                        setIsExpireDelegationTokenModalOpen(
                                            true,
                                        );
                                    }}
                                >
                                    <TbClock size="1.4rem" />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </div>
                ),
            },
        };
    });
}

const AllDelegationTokensBodyComponent = ({
    delegationTokens,
    isDescribeDelegationTokensPending,
    setIsExpireDelegationTokenModalOpen,
    setIsRenewDelegationTokenModalOpen,
    setIsDelegationTokenDetailsModalOpen,
    setDelegationTokenToExpire,
    setDelegationTokenToRenew,
    setDelegationTokenDetails,
    isAuthorizedExpireDelegationToken,
    isAuthorizedRenewDelegationToken,
}: AllDelegationTokensBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                delegationTokens,
                setIsExpireDelegationTokenModalOpen,
                setIsRenewDelegationTokenModalOpen,
                setIsDelegationTokenDetailsModalOpen,
                setDelegationTokenToRenew,
                setDelegationTokenToExpire,
                setDelegationTokenDetails,
                isAuthorizedExpireDelegationToken,
                isAuthorizedRenewDelegationToken,
            ),
        [
            delegationTokens,
            isAuthorizedExpireDelegationToken,
            isAuthorizedRenewDelegationToken,
        ],
    );

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={delegationTokens.length}
            perPage={25}
            isLoading={isDescribeDelegationTokensPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllDelegationTokensBodyComponent;
