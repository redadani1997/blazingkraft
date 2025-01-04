import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllQuotasBodyComponent from './AllQuotasBodyComponent';

interface AllQuotasBodyProps {
    setIsAlterQuotasModalOpen: (isOpen: boolean) => void;
    setQuotaEntryToAlter: (quota: any) => void;
}

const AllQuotasBody = (props: AllQuotasBodyProps) => {
    // Map State To Props
    const { isDescribeQuotasPending, quotas } = useSelector(
        (store: ReduxStore) => {
            return {
                isDescribeQuotasPending:
                    store.quotaReducer.isDescribeQuotasPending,
                quotas: store.quotaReducer.quotas,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedAlterQuota } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: QuotaPermissions.QUOTA_PERMISSIONS.ALTER_QUOTA,
            },
        ],
    });

    return (
        <AllQuotasBodyComponent
            {...props}
            isDescribeQuotasPending={isDescribeQuotasPending}
            quotas={quotas}
            isAuthorizedAlterQuota={isAuthorizedAlterQuota}
        />
    );
};

export default AllQuotasBody;
