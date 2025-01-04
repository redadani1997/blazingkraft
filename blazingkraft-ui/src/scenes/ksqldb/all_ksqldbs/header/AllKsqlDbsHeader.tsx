import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKsqlDbsHeaderComponent from './AllKsqlDbsHeaderComponent';

interface AllKsqlDbsHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbsHeader = ({ refreshPageContent }: AllKsqlDbsHeaderProps) => {
    // Map State To Props
    const { isGetAllKsqlDbsPending, ksqlDbs } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbsPending:
                    store.ksqlDbReducer.isGetAllKsqlDbsPending,
                ksqlDbs: store.ksqlDbReducer.ksqlDbs,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateKsqlDb } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_CREATE_KSQLDB,
            },
        ],
    });

    return (
        <AllKsqlDbsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllKsqlDbsPending}
            ksqlDbsLength={ksqlDbs.length}
            isAuthorizedCreateKsqlDb={isAuthorizedCreateKsqlDb}
        />
    );
};

export default AllKsqlDbsHeader;
