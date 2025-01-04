import { QuotaEntity, QuotaOperation } from 'common/types/quota';
import { POST, PUT } from 'rest/RestCalls';
import quotaTypes from './types';

export interface QuotaAlterApiRequest {
    validateOnly: boolean;
    entities: QuotaEntity[];
    operations: QuotaOperation[];
}

function describeQuotas(clusterCode) {
    return {
        type: quotaTypes.DESCRIBE_QUOTAS,
        payload: POST(
            '/admin/quotas/describe',
            { strict: false, components: [] },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Quotas' },
    };
}

function alterQuotas(quotaAlterRequest: QuotaAlterApiRequest, clusterCode) {
    return {
        type: quotaTypes.ALTER_QUOTA,
        payload: PUT('/admin/quotas/alter', quotaAlterRequest, {
            headers: { clusterCode },
        }),
        meta: { context: 'Quotas' },
    };
}

const quotaActions = { describeQuotas, alterQuotas };

export default quotaActions;
