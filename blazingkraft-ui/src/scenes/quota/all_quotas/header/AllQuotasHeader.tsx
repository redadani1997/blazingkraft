import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllQuotasHeaderComponent from './AllQuotasHeaderComponent';

interface AllQuotasHeaderProps {
    refreshPageContent: () => void;
    setIsAlterQuotasModalOpen: (isOpen: boolean) => void;
    setQuotaEntryToAlter: (quota: any) => void;
}

const AllQuotasHeader = ({
    refreshPageContent,
    setIsAlterQuotasModalOpen,
    setQuotaEntryToAlter,
}: AllQuotasHeaderProps) => {
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
        <AllQuotasHeaderComponent
            setIsAlterQuotasModalOpen={setIsAlterQuotasModalOpen}
            setQuotaEntryToAlter={setQuotaEntryToAlter}
            isRefreshPageContentPending={isDescribeQuotasPending}
            refreshPageContent={refreshPageContent}
            quotasLength={quotas.length}
            isAuthorizedAlterQuota={isAuthorizedAlterQuota}
        />
    );
};

export default AllQuotasHeader;
