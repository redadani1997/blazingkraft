import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import ksqlDbActions from 'scenes/ksqldb/redux/actions';
import EditKsqlDbBodyComponent from './EditKsqlDbBodyComponent';

const EditKsqlDbBody = () => {
    // Map State To Props
    const {
        isEditKsqlDbPending,
        isTestKsqlDbClientConnectivityPending,
        isGetKsqlDbDetailsPending,
        ksqlDbDetails,
        isTestKsqlDbJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isTestKsqlDbClientConnectivityPending:
                store.ksqlDbReducer.isTestKsqlDbClientConnectivityPending,
            isTestKsqlDbJmxConnectivityPending:
                store.ksqlDbReducer.isTestKsqlDbJmxConnectivityPending,
            isEditKsqlDbPending: store.ksqlDbReducer.isEditKsqlDbPending,
            isGetKsqlDbDetailsPending:
                store.ksqlDbReducer.isGetKsqlDbDetailsPending,
            ksqlDbDetails: store.ksqlDbReducer.ksqlDbDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { ksqlDbCode } = useParams();

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

    const editKsqlDb = (
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
            ksqlDbActions.editKsqlDb(
                ksqlDbCode,
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
        ).then(() => navigate(`/ksqldbs/${ksqlDbCode}/dashboard`));

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
            {CommonValidationUtils.isTruthy(ksqlDbDetails) && (
                <EditKsqlDbBodyComponent
                    testKsqlDbClientConnectivity={testKsqlDbClientConnectivity}
                    testKsqlDbJmxConnectivity={testKsqlDbJmxConnectivity}
                    editKsqlDb={editKsqlDb}
                    isTestKsqlDbClientConnectivityPending={
                        isTestKsqlDbClientConnectivityPending
                    }
                    isTestKsqlDbJmxConnectivityPending={
                        isTestKsqlDbJmxConnectivityPending
                    }
                    isAuthorizedTestKsqlDbConnectivity={
                        isAuthorizedTestKsqlDbConnectivity
                    }
                    ksqlDbDetails={ksqlDbDetails}
                />
            )}
            <LoadingSpinner
                isLoading={isEditKsqlDbPending || isGetKsqlDbDetailsPending}
            />
        </>
    );
};

export default EditKsqlDbBody;
