import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KafkaConnectDashboardDetailsComponent from './KafkaConnectDashboardDetailsComponent';

const KafkaConnectDashboardDetails = () => {
    // Map State To Props
    const { kafkaConnectDetails } = useSelector((store: ReduxStore) => {
        return {
            kafkaConnectDetails: store.kafkaConnectReducer.kafkaConnectDetails,
        };
    }, shallowEqual);

    return (
        <>
            <KafkaConnectDashboardDetailsComponent
                kafkaConnectDetails={kafkaConnectDetails}
            />
        </>
    );
};

export default KafkaConnectDashboardDetails;
