import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import BrokerDetailsBodyComponent from './BrokerDetailsBodyComponent';

const BrokerDetailsBody = () => {
    // Map State To Props
    const { isGetClusterBrokerConfiguration, clusterBrokerConfiguration } =
        useSelector((store: ReduxStore) => {
            return {
                isGetClusterBrokerConfiguration:
                    store.clusterReducer.isGetClusterBrokerConfiguration,
                clusterBrokerConfiguration:
                    store.clusterReducer.clusterBrokerConfiguration,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <BrokerDetailsBodyComponent
                clusterBrokerConfiguration={clusterBrokerConfiguration}
                isGetClusterBrokerConfiguration={
                    isGetClusterBrokerConfiguration
                }
            />
            <LoadingSpinner isLoading={isGetClusterBrokerConfiguration} />
        </>
    );
};

export default BrokerDetailsBody;
