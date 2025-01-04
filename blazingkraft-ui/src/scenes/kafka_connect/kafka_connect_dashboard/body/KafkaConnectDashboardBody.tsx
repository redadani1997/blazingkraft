import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import KafkaConnectDashboardBodyComponent from './KafkaConnectDashboardBodyComponent';

interface KafkaConnectDashboardBodyProps {
    jmxEnabled: boolean;
}

const KafkaConnectDashboardBody = ({
    jmxEnabled,
}: KafkaConnectDashboardBodyProps) => {
    // Map State To Props
    const { isGetKafkaConnectDetailsPending, kafkaConnectDetails } =
        useSelector((store: ReduxStore) => {
            return {
                kafkaConnectDetails:
                    store.kafkaConnectReducer.kafkaConnectDetails,
                isGetKafkaConnectDetailsPending:
                    store.kafkaConnectReducer.isGetKafkaConnectDetailsPending,
            };
        }, shallowEqual);

    return (
        <>
            {CommonValidationUtils.isTruthy(kafkaConnectDetails) && (
                <KafkaConnectDashboardBodyComponent jmxEnabled={jmxEnabled} />
            )}
            <LoadingSpinner isLoading={isGetKafkaConnectDetailsPending} />
        </>
    );
};

export default KafkaConnectDashboardBody;
