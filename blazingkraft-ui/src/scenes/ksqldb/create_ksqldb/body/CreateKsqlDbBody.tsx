import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import ksqlDbActions from 'scenes/ksqldb/redux/actions';
import CreateKsqlDbBodyComponent from './CreateKsqlDbBodyComponent';

const CreateKsqlDbBody = () => {
    // Map State To Props
    const {
        isCreateKsqlDbPending,
        isTestKsqlDbClientConnectivityPending,
        isTestKsqlDbJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isTestKsqlDbClientConnectivityPending:
                store.ksqlDbReducer.isTestKsqlDbClientConnectivityPending,
            isTestKsqlDbJmxConnectivityPending:
                store.ksqlDbReducer.isTestKsqlDbJmxConnectivityPending,
            isCreateKsqlDbPending: store.ksqlDbReducer.isCreateKsqlDbPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const testKsqlDbClientConnectivity = (
        host,
        port,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
        keyStoreEnabled,
        keyStore,
        keyStorePassword,
        trustStoreEnabled,
        trustStore,
        trustStorePassword,
        useTls,
        verifyHost,
        useAlpn,
        executeQueryMaxResultRows,
    ) =>
        dispatch(
            ksqlDbActions.testKsqlDbClientConnectivity(
                host,
                port,
                basicAuthEnabled,
                basicAuthUsername,
                basicAuthPassword,
                keyStoreEnabled,
                keyStore,
                keyStorePassword,
                trustStoreEnabled,
                trustStore,
                trustStorePassword,
                useTls,
                verifyHost,
                useAlpn,
                executeQueryMaxResultRows,
            ),
        );

    const testKsqlDbJmxConnectivity = (jmxUrl, jmxEnvironment) =>
        dispatch(
            ksqlDbActions.testKsqlDbJmxConnectivity(jmxUrl, jmxEnvironment),
        );

    const createKsqlDb = (
        name,
        code,
        color,
        host,
        port,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
        keyStoreEnabled,
        keyStore,
        keyStorePassword,
        trustStoreEnabled,
        trustStore,
        trustStorePassword,
        useTls,
        verifyHost,
        useAlpn,
        executeQueryMaxResultRows,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            ksqlDbActions.createKsqlDb(
                name,
                code,
                color,
                host,
                port,
                basicAuthEnabled,
                basicAuthUsername,
                basicAuthPassword,
                keyStoreEnabled,
                keyStore,
                keyStorePassword,
                trustStoreEnabled,
                trustStore,
                trustStorePassword,
                useTls,
                verifyHost,
                useAlpn,
                executeQueryMaxResultRows,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() => navigate(`/ksqldbs`));

    // Authorization
    const { isAuthorized: isAuthorizedTestKsqlDbConnectivity } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementKsqlDbPermissions
                            .MANAGEMENT_KSQLDB_PERMISSIONS
                            .MANAGEMENT_TEST_KSQLDB_CONNECTIVITY,
                },
            ],
        });

    return (
        <>
            <CreateKsqlDbBodyComponent
                testKsqlDbClientConnectivity={testKsqlDbClientConnectivity}
                testKsqlDbJmxConnectivity={testKsqlDbJmxConnectivity}
                createKsqlDb={createKsqlDb}
                isTestKsqlDbClientConnectivityPending={
                    isTestKsqlDbClientConnectivityPending
                }
                isTestKsqlDbJmxConnectivityPending={
                    isTestKsqlDbJmxConnectivityPending
                }
                isAuthorizedTestKsqlDbConnectivity={
                    isAuthorizedTestKsqlDbConnectivity
                }
            />
            <LoadingSpinner isLoading={isCreateKsqlDbPending} />
        </>
    );
};

export default CreateKsqlDbBody;
