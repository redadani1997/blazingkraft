import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { DelegationToken } from 'common/types/delegation_token';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllDelegationTokensBodyComponent from './AllDelegationTokensBodyComponent';

interface AllDelegationTokensBodyProps {
    setIsRenewDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsExpireDelegationTokenModalOpen: (isOpen: boolean) => void;
    setIsDelegationTokenDetailsModalOpen: (isOpen: boolean) => void;
    setDelegationTokenToRenew: (hmac: string) => void;
    setDelegationTokenToExpire: (hmac: string) => void;
    setDelegationTokenDetails: (
        delegationToken: DelegationToken | null,
    ) => void;
}

const AllDelegationTokensBody = (props: AllDelegationTokensBodyProps) => {
    // Map State To Props
    const { delegationTokens, isDescribeDelegationTokensPending } = useSelector(
        (store: ReduxStore) => {
            return {
                delegationTokens: store.delegationTokenReducer.delegationTokens,
                isDescribeDelegationTokensPending:
                    store.delegationTokenReducer
                        .isDescribeDelegationTokensPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
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
        <AllDelegationTokensBodyComponent
            {...props}
            isDescribeDelegationTokensPending={
                isDescribeDelegationTokensPending
            }
            delegationTokens={delegationTokens}
            isAuthorizedExpireDelegationToken={
                isAuthorizedExpireDelegationToken
            }
            isAuthorizedRenewDelegationToken={isAuthorizedRenewDelegationToken}
        />
    );
};

export default AllDelegationTokensBody;
