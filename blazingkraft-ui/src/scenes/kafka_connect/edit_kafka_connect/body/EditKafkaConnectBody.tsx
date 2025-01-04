import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import kafkaConnectActions from 'scenes/kafka_connect/redux/actions';
import EditKafkaConnectBodyComponent from './EditKafkaConnectBodyComponent';

const EditKafkaConnectBody = () => {
    // Map State To Props
    const {
        isEditKafkaConnectPending,
        isTestKafkaConnectClientConnectivityPending,
        isGetAllClustersPending,
        clusters,
        isGetKafkaConnectDetailsPending,
        kafkaConnectDetails,
        isTestKafkaConnectJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            clusters: store.clusterReducer.clusters,
            isGetAllClustersPending:
                store.clusterReducer.isGetAllClustersPending,
            isTestKafkaConnectClientConnectivityPending:
                store.kafkaConnectReducer
                    .isTestKafkaConnectClientConnectivityPending,
            isTestKafkaConnectJmxConnectivityPending:
                store.kafkaConnectReducer
                    .isTestKafkaConnectJmxConnectivityPending,
            isEditKafkaConnectPending:
                store.kafkaConnectReducer.isEditKafkaConnectPending,
            isGetKafkaConnectDetailsPending:
                store.kafkaConnectReducer.isGetKafkaConnectDetailsPending,
            kafkaConnectDetails: store.kafkaConnectReducer.kafkaConnectDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { kafkaConnectCode } = useParams();

    const testKafkaConnectClientConnectivity = (
        url,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
    ) =>
        dispatch(
            kafkaConnectActions.testKafkaConnectClientConnectivity(
                url,
                basicAuthEnabled,
                basicAuthUsername,
                basicAuthPassword,
            ),
        );

    const testKafkaConnectJmxConnectivity = (jmxUrl, jmxEnvironment) =>
        dispatch(
            kafkaConnectActions.testKafkaConnectJmxConnectivity(
                jmxUrl,
                jmxEnvironment,
            ),
        );

    const editKafkaConnect = (
        color,
        clusterCode,
        url,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            kafkaConnectActions.editKafkaConnect(
                kafkaConnectCode,
                color,
                clusterCode,
                url,
                basicAuthEnabled,
                basicAuthUsername,
                basicAuthPassword,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() => navigate(`/kafka_connects/${kafkaConnectCode}/dashboard`));

    // Authorization
    const { isAuthorized: isAuthorizedTestKafkaConnectConnectivity } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementKafkaConnectPermissions
                            .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                            .MANAGEMENT_TEST_KAFKA_CONNECT_CONNECTIVITY,
                },
            ],
        });

    return (
        <>
            {CommonValidationUtils.isTruthy(kafkaConnectDetails) && (
                <EditKafkaConnectBodyComponent
                    clusters={clusters}
                    testKafkaConnectClientConnectivity={
                        testKafkaConnectClientConnectivity
                    }
                    testKafkaConnectJmxConnectivity={
                        testKafkaConnectJmxConnectivity
                    }
                    editKafkaConnect={editKafkaConnect}
                    isGetAllClustersPending={isGetAllClustersPending}
                    isTestKafkaConnectClientConnectivityPending={
                        isTestKafkaConnectClientConnectivityPending
                    }
                    isTestKafkaConnectJmxConnectivityPending={
                        isTestKafkaConnectJmxConnectivityPending
                    }
                    isAuthorizedTestKafkaConnectConnectivity={
                        isAuthorizedTestKafkaConnectConnectivity
                    }
                    kafkaConnectDetails={kafkaConnectDetails}
                />
            )}
            <LoadingSpinner
                isLoading={
                    isEditKafkaConnectPending || isGetKafkaConnectDetailsPending
                }
            />
        </>
    );
};

export default EditKafkaConnectBody;
