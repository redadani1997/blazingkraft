import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKsqlDbConnectorsHeaderComponent from './AllKsqlDbConnectorsHeaderComponent';

interface AllKsqlDbConnectorsHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbConnectorsHeader = ({
    refreshPageContent,
}: AllKsqlDbConnectorsHeaderProps) => {
    // Map State To Props
    const { ksqlDbConnectors, isGetAllKsqlDbConnectorsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbConnectorsPending:
                    store.ksqlDbEcosystemReducer
                        .isGetAllKsqlDbConnectorsPending,
                ksqlDbConnectors: store.ksqlDbEcosystemReducer.ksqlDbConnectors,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKsqlDbCreateConnector } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'KSQLDB',
                    permission:
                        KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS
                            .CREATE_KSQLDB_CONNECTOR,
                },
            ],
        });

    return (
        <AllKsqlDbConnectorsHeaderComponent
            isRefreshPageContentPending={isGetAllKsqlDbConnectorsPending}
            refreshPageContent={refreshPageContent}
            ksqlDbConnectorsLength={ksqlDbConnectors.length}
            isAuthorizedKsqlDbCreateConnector={
                isAuthorizedKsqlDbCreateConnector
            }
        />
    );
};

export default AllKsqlDbConnectorsHeader;
