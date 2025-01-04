import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllConnectorsHeaderComponent from './AllConnectorsHeaderComponent';

interface AllConnectorsHeaderProps {
    refreshPageContent: () => void;
}

const AllConnectorsHeader = ({
    refreshPageContent,
}: AllConnectorsHeaderProps) => {
    const { kafkaConnectCode } = useParams();

    // Map State To Props
    const {
        connectorsWithExpandedInfoAndStatus,
        isListAllConnectorsWithExpandedInfoAndStatusPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isListAllConnectorsWithExpandedInfoAndStatusPending:
                store.connectorReducer.isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster.get(
                    kafkaConnectCode,
                ),
            connectorsWithExpandedInfoAndStatus:
                store.connectorReducer.connectorsWithExpandedInfoAndStatusByCluster.get(
                    kafkaConnectCode,
                ),
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.CREATE_CONNECTOR,
            },
        ],
    });

    return (
        <AllConnectorsHeaderComponent
            isRefreshPageContentPending={
                isListAllConnectorsWithExpandedInfoAndStatusPending || false
            }
            refreshPageContent={refreshPageContent}
            connectorsLength={
                connectorsWithExpandedInfoAndStatus
                    ? connectorsWithExpandedInfoAndStatus.length
                    : 0
            }
            isAuthorizedCreateCluster={isAuthorizedCreateCluster}
        />
    );
};

export default AllConnectorsHeader;
