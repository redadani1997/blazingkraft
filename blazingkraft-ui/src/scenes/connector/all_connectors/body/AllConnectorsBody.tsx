import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import AllConnectorsBodyComponent from './AllConnectorsBodyComponent';

const AllConnectorsBody = () => {
    const { kafkaConnectCode } = useParams();

    // Map State To Props
    const {
        connectorsWithExpandedInfoAndStatus,
        isListAllConnectorsWithExpandedInfoAndStatusPending,
        kafkaConnectFeatures,
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
            kafkaConnectFeatures:
                store.settingsReducer.features.kafkaConnectFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const clusterCode = kafkaConnectFeatures.find(
        feature => feature.code === kafkaConnectCode,
    )?.clusterCode;

    return (
        <AllConnectorsBodyComponent
            isListAllConnectorsWithExpandedInfoAndStatusPending={
                isListAllConnectorsWithExpandedInfoAndStatusPending || false
            }
            connectorsWithExpandedInfoAndStatus={
                connectorsWithExpandedInfoAndStatus || []
            }
            clusterCode={clusterCode}
        />
    );
};

export default AllConnectorsBody;
