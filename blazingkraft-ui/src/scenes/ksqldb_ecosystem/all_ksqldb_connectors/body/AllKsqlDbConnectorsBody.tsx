import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKsqlDbConnectorsBodyComponent from './AllKsqlDbConnectorsBodyComponent';

interface AllKsqlDbConnectorsBodyProps {
    refreshPageContent: () => void;
}

const AllKsqlDbConnectorsBody = (props: AllKsqlDbConnectorsBodyProps) => {
    // Map State To Props
    const { isGetAllKsqlDbConnectorsPending, ksqlDbConnectors } = useSelector(
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
    const { isAuthorized: isAuthorizedKsqlDbDeleteConnector } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'KSQLDB',
                    permission:
                        KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS
                            .DELETE_KSQLDB_CONNECTOR,
                },
            ],
        });

    return (
        <AllKsqlDbConnectorsBodyComponent
            {...props}
            isGetAllKsqlDbConnectorsPending={isGetAllKsqlDbConnectorsPending}
            ksqlDbConnectors={ksqlDbConnectors}
            isAuthorizedKsqlDbDeleteConnector={
                isAuthorizedKsqlDbDeleteConnector
            }
        />
    );
};

export default AllKsqlDbConnectorsBody;
