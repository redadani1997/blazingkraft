import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import KsqlDbDashboardHeaderComponent from './KsqlDbDashboardHeaderComponent';

interface KsqlDbDashboardHeaderProps {
    refreshPageContent: () => void;
}

const KsqlDbDashboardHeader = ({
    refreshPageContent,
}: KsqlDbDashboardHeaderProps) => {
    // Map State To Props
    const { isGetKsqlDbDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetKsqlDbDetailsPending:
                store.ksqlDbReducer.isGetKsqlDbDetailsPending,
        };
    }, shallowEqual);

    // Authorization
    const { isAuthorized: isAuthorizedDeleteKsqlDb } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_DELETE_KSQLDB,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditKsqlDb } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_EDIT_KSQLDB,
            },
        ],
    });

    return (
        <KsqlDbDashboardHeaderComponent
            isRefreshPageContentPending={isGetKsqlDbDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteKsqlDb={isAuthorizedDeleteKsqlDb}
            isAuthorizedEditKsqlDb={isAuthorizedEditKsqlDb}
        />
    );
};

export default KsqlDbDashboardHeader;
