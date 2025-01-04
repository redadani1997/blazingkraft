import { DelegationToken } from 'common/types/delegation_token';

export type DelegationTokenReducerState = {
    delegationTokens: DelegationToken[];
    isDescribeDelegationTokensPending: boolean;
    isCreateDelegationTokenPending: boolean;
    isExpireDelegationTokenPending: boolean;
    isRenewDelegationTokenPending: boolean;
};
