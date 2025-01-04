import { QuotaEntry } from 'common/types/quota';

export type QuotaReducerState = {
    quotas: QuotaEntry[];
    isDescribeQuotasPending: boolean;
    isAlterQuotasPending: boolean;
};
