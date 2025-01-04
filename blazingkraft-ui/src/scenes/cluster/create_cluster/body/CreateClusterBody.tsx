import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from 'scenes/cluster/redux/actions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import CreateClusterBodyComponent from './CreateClusterBodyComponent';

const CreateClusterBody = () => {
    // Map State To Props
    const {
        isTestClusterClientConnectivityPending,
        isTestClusterJmxConnectivityPending,
        isCreateClusterPending,
        schemaRegistries,
    } = useSelector((store: ReduxStore) => {
        return {
            schemaRegistries: store.schemaRegistryReducer.schemaRegistries,
            isTestClusterClientConnectivityPending:
                store.clusterReducer.isTestClusterClientConnectivityPending,
            isTestClusterJmxConnectivityPending:
                store.clusterReducer.isTestClusterJmxConnectivityPending,
            isCreateClusterPending: store.clusterReducer.isCreateClusterPending,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const testClusterClientConnectivity = commonConfiguration =>
        dispatch(
            clusterActions.testClusterClientConnectivity(commonConfiguration),
        );

    const testClusterJmxConnectivity = (jmxUrl, jmxEnvironment) =>
        dispatch(
            clusterActions.testClusterJmxConnectivity(jmxUrl, jmxEnvironment),
        );

    const createCluster = (
        name,
        code,
        color,
        schemaRegistryCode,
        commonConfiguration,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            clusterActions.createCluster(
                name,
                code,
                color,
                schemaRegistryCode,
                commonConfiguration,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() => navigate(`/clusters`));

    const { isAuthorized: isAuthorizedTestClusterConnectivity } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementClusterPermissions
                            .MANAGEMENT_CLUSTER_PERMISSIONS
                            .MANAGEMENT_TEST_CLUSTER_CONNECTIVITY,
                },
            ],
        });

    return (
        <>
            <CreateClusterBodyComponent
                createCluster={createCluster}
                testClusterJmxConnectivity={testClusterJmxConnectivity}
                testClusterClientConnectivity={testClusterClientConnectivity}
                isTestClusterClientConnectivityPending={
                    isTestClusterClientConnectivityPending
                }
                isTestClusterJmxConnectivityPending={
                    isTestClusterJmxConnectivityPending
                }
                isAuthorizedTestClusterConnectivity={
                    isAuthorizedTestClusterConnectivity
                }
                schemaRegistries={schemaRegistries}
            />
            <LoadingSpinner isLoading={isCreateClusterPending} />
        </>
    );
};

export default CreateClusterBody;
