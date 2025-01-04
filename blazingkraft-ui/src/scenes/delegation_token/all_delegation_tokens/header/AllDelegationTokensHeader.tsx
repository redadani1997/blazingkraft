import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllDelegationTokensHeaderComponent from './AllDelegationTokensHeaderComponent';

interface AllDelegationTokensHeaderProps {
    refreshPageContent: () => void;
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void;
    setDelegationTokenToRenew: (hmac: string) => void;
    setDelegationTokenToExpire: (hmac: string) => void;
}

const AllDelegationTokensHeader = ({
    refreshPageContent,
    setIsExpireDelegationTokenModalOpen,
    setIsRenewDelegationTokenModalOpen,
    setDelegationTokenToExpire,
    setDelegationTokenToRenew,
}: AllDelegationTokensHeaderProps) => {
    // Map State To Props
    const { delegationTokens, isDescribeDelegationTokensPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDescribeDelegationTokensPending:
                    store.delegationTokenReducer
                        .isDescribeDelegationTokensPending,
                delegationTokens: store.delegationTokenReducer.delegationTokens,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateDelegationToken } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS
                            .CREATE_DELEGATION_TOKEN,
                },
            ],
        });
    const { isAuthorized: isAuthorizedExpireDelegationToken } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS
                            .EXPIRE_DELEGATION_TOKEN,
                },
            ],
        });
    const { isAuthorized: isAuthorizedRenewDelegationToken } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS
                            .RENEW_DELEGATION_TOKEN,
                },
            ],
        },
    );

    return (
        <AllDelegationTokensHeaderComponent
            setDelegationTokenToExpire={setDelegationTokenToExpire}
            setDelegationTokenToRenew={setDelegationTokenToRenew}
            setIsExpireDelegationTokenModalOpen={
                setIsExpireDelegationTokenModalOpen
            }
            setIsRenewDelegationTokenModalOpen={
                setIsRenewDelegationTokenModalOpen
            }
            isRefreshPageContentPending={isDescribeDelegationTokensPending}
            refreshPageContent={refreshPageContent}
            delegationTokensLength={delegationTokens.length}
            isAuthorizedCreateDelegationToken={
                isAuthorizedCreateDelegationToken
            }
            isAuthorizedExpireDelegationToken={
                isAuthorizedExpireDelegationToken
            }
            isAuthorizedRenewDelegationToken={isAuthorizedRenewDelegationToken}
        />
    );
};

export default AllDelegationTokensHeader;
