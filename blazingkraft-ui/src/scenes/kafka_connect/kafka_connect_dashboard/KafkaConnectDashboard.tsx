import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import kafkaConnectActions from '../redux/actions';
import KafkaConnectDashboardComponent from './KafkaConnectDashboardComponent';

const KafkaConnectDashboard = () => {
    useDocumentTitle('Blazing KRaft - Kafka Connect Dashboard');

    // Map State To Props
    const { kafkaConnectFeatures } = useSelector((store: ReduxStore) => {
        return {
            kafkaConnectFeatures:
                store.settingsReducer.features.kafkaConnectFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

    const jmxEnabled = kafkaConnectFeatures.find(
        feature => feature.code === kafkaConnectCode,
    )?.jmxEnabled;

    const getKafkaConnectDetails = () =>
        dispatch(kafkaConnectActions.getKafkaConnectDetails(kafkaConnectCode));

    const monitorKafkaConnectServer = () =>
        dispatch(
            kafkaConnectActions.monitorKafkaConnectServer(kafkaConnectCode),
        );

    const refreshPageContent = () => {
        if (jmxEnabled) {
            getKafkaConnectDetails().then(() => monitorKafkaConnectServer());
        } else {
            getKafkaConnectDetails();
        }
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <KafkaConnectDashboardComponent
            refreshPageContent={refreshPageContent}
            jmxEnabled={jmxEnabled}
        />
    );
};

export default KafkaConnectDashboard;
