import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from 'scenes/cluster/redux/actions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import EditClusterBodyComponent from './EditClusterBodyComponent';

const EditClusterBody = () => {
    // Map State To Props
    const {
        isTestClusterClientConnectivityPending,
        isGetClusterDetailsPending,
        isEditClusterPending,
        schemaRegistries,
        clusterDetails,
        isTestClusterJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            schemaRegistries: store.schemaRegistryReducer.schemaRegistries,
            isTestClusterClientConnectivityPending:
                store.clusterReducer.isTestClusterClientConnectivityPending,
            isEditClusterPending: store.clusterReducer.isEditClusterPending,
            isTestClusterJmxConnectivityPending:
                store.clusterReducer.isTestClusterJmxConnectivityPending,
            isGetClusterDetailsPending:
                store.clusterReducer.isGetClusterDetailsPending,
            clusterDetails: store.clusterReducer.clusterDetails,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { clusterCode } = useParams();

    const testClusterClientConnectivity = commonConfiguration =>
        dispatch(
            clusterActions.testClusterClientConnectivity(commonConfiguration),
        );

    const testClusterJmxConnectivity = (jmxUrl, jmxEnvironment) =>
        dispatch(
            clusterActions.testClusterJmxConnectivity(jmxUrl, jmxEnvironment),
        );

    const editCluster = (
        color,
        schemaRegistryCode,
        commonConfiguration,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            clusterActions.editCluster(
                clusterCode,
                color,
                schemaRegistryCode,
                commonConfiguration,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() => navigate(`/clusters/${clusterCode}/dashboard`));

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
            {CommonValidationUtils.isTruthy(clusterDetails) && (
                <EditClusterBodyComponent
                    editCluster={editCluster}
                    clusterDetails={clusterDetails}
                    testClusterClientConnectivity={
                        testClusterClientConnectivity
                    }
                    testClusterJmxConnectivity={testClusterJmxConnectivity}
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
            )}
            <LoadingSpinner
                isLoading={isEditClusterPending || isGetClusterDetailsPending}
            />
        </>
    );
};

export default EditClusterBody;
