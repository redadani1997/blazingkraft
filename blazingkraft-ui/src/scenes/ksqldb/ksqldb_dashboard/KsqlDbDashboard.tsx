import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import ksqlDbActions from '../redux/actions';
import KsqlDbDashboardComponent from './KsqlDbDashboardComponent';

const KsqlDbDashboard = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Dashboard');

    // Map State To Props
    const { ksqlDbFeatures } = useSelector((store: ReduxStore) => {
        return {
            ksqlDbFeatures: store.settingsReducer.features.ksqlDbFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const jmxEnabled = ksqlDbFeatures.find(
        feature => feature.code === ksqlDbCode,
    )?.jmxEnabled;

    const getKsqlDbDetails = () =>
        dispatch(ksqlDbActions.getKsqlDbDetails(ksqlDbCode));

    const monitorKsqlDbServer = () =>
        dispatch(ksqlDbActions.monitorKsqlDbServer(ksqlDbCode));

    const refreshPageContent = () => {
        getKsqlDbDetails();
        if (jmxEnabled) {
            monitorKsqlDbServer();
        }
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <KsqlDbDashboardComponent
            refreshPageContent={refreshPageContent}
            jmxEnabled={jmxEnabled}
        />
    );
};

export default KsqlDbDashboard;
