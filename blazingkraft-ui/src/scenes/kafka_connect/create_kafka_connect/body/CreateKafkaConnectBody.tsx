import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import kafkaConnectActions from 'scenes/kafka_connect/redux/actions';
import CreateKafkaConnectBodyComponent from './CreateKafkaConnectBodyComponent';

const CreateKafkaConnectBody = () => {
    // Map State To Props
    const {
        isCreateKafkaConnectPending,
        isTestKafkaConnectClientConnectivityPending,
        clusters,
        isTestKafkaConnectJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            clusters: store.clusterReducer.clusters,
            isTestKafkaConnectClientConnectivityPending:
                store.kafkaConnectReducer
                    .isTestKafkaConnectClientConnectivityPending,
            isTestKafkaConnectJmxConnectivityPending:
                store.kafkaConnectReducer
                    .isTestKafkaConnectJmxConnectivityPending,
            isCreateKafkaConnectPending:
                store.kafkaConnectReducer.isCreateKafkaConnectPending,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
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

    const createKafkaConnect = (
        name,
        code,
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
            kafkaConnectActions.createKafkaConnect(
                name,
                code,
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
        ).then(() => navigate(`/kafka_connects`));

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
            <CreateKafkaConnectBodyComponent
                clusters={clusters}
                testKafkaConnectClientConnectivity={
                    testKafkaConnectClientConnectivity
                }
                testKafkaConnectJmxConnectivity={
                    testKafkaConnectJmxConnectivity
                }
                createKafkaConnect={createKafkaConnect}
                isTestKafkaConnectClientConnectivityPending={
                    isTestKafkaConnectClientConnectivityPending
                }
                isTestKafkaConnectJmxConnectivityPending={
                    isTestKafkaConnectJmxConnectivityPending
                }
                isAuthorizedTestKafkaConnectConnectivity={
                    isAuthorizedTestKafkaConnectConnectivity
                }
            />
            <LoadingSpinner isLoading={isCreateKafkaConnectPending} />
        </>
    );
};

export default CreateKafkaConnectBody;
