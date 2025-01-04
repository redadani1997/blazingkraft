import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clusterActions from 'scenes/cluster/redux/actions';
import { ClusterMeta } from '../redux';
import AllClustersComponent from './AllClustersComponent';

const AllClusters = () => {
    useDocumentTitle('Blazing KRaft - Clusters');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getAllClusters = () => dispatch(clusterActions.getAllClusters());

    const describeCluster = clusterCode =>
        dispatch(clusterActions.describeCluster(clusterCode));

    const refreshPageContent = () =>
        getAllClusters().then(({ value }: { value: ClusterMeta[] }) =>
            value.map(cluster => describeCluster(cluster.code)),
        );

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllClustersComponent refreshPageContent={refreshPageContent} />;
};

export default AllClusters;
