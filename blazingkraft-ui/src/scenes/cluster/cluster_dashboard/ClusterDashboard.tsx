import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from '../redux/actions';
import ClusterDashboardComponent from './ClusterDashboardComponent';

const ClusterDashboard = () => {
    useDocumentTitle('Blazing KRaft - Cluster Dashboard');

    // Map State To Props
    const { clusterFeatures } = useSelector((store: ReduxStore) => {
        return {
            clusterFeatures: store.settingsReducer.features.clusterFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const jmxEnabled = clusterFeatures.find(
        feature => feature.code === clusterCode,
    )?.jmxEnabled;

    const getClusterDetails = () =>
        dispatch(clusterActions.getClusterDetails(clusterCode));

    const monitorCluster = () =>
        dispatch(clusterActions.monitorCluster(clusterCode));

    const getClusterBrokersDetails = () =>
        dispatch(clusterActions.getClusterBrokersDetails(clusterCode));

    const refreshPageContent = () => {
        return getClusterDetails().then(res => {
            if (jmxEnabled) {
                monitorCluster();
            }
            getClusterBrokersDetails();
            return res;
        });
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <ClusterDashboardComponent
            refreshPageContent={refreshPageContent}
            jmxEnabled={jmxEnabled}
        />
    );
};

export default ClusterDashboard;
