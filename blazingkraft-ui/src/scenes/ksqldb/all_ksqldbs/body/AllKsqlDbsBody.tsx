import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKsqlDbsBodyComponent from './AllKsqlDbsBodyComponent';

interface AllKsqlDbsBodyProps {
    setIsDeleteKsqlDbModalOpen: (isModalOpen: boolean) => void;
    setKsqlDbToDelete: (ksqlDbToDelete: string | null) => void;
}

const AllKsqlDbsBody = (props: AllKsqlDbsBodyProps) => {
    // Map State To Props
    const {
        isGetAllKsqlDbsPending,
        ksqlDbs,
        isGetKsqlDbsDescriptionsPending,
        ksqlDbsDescriptions,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetAllKsqlDbsPending: store.ksqlDbReducer.isGetAllKsqlDbsPending,
            ksqlDbs: store.ksqlDbReducer.ksqlDbs,
            isGetKsqlDbsDescriptionsPending:
                store.ksqlDbReducer.isGetKsqlDbsDescriptionsPending,
            ksqlDbsDescriptions: store.ksqlDbReducer.ksqlDbsDescriptions,
        };
    }, shallowEqual);
    // Map Dispatch To Props

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
        <AllKsqlDbsBodyComponent
            {...props}
            isGetKsqlDbsDescriptionsPending={isGetKsqlDbsDescriptionsPending}
            ksqlDbsDescriptions={ksqlDbsDescriptions}
            isGetAllKsqlDbsPending={isGetAllKsqlDbsPending}
            ksqlDbs={ksqlDbs}
            isAuthorizedDeleteKsqlDb={isAuthorizedDeleteKsqlDb}
            isAuthorizedEditKsqlDb={isAuthorizedEditKsqlDb}
        />
    );
};

export default AllKsqlDbsBody;
