import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CreateSchemaRegistryBodyComponent from './CreateSchemaRegistryBodyComponent';

const CreateSchemaRegistryBody = () => {
    // Map State To Props
    const {
        isTestSchemaRegistryClientConnectivityPending,
        isCreateSchemaRegistryPending,
        isTestSchemaRegistryJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isTestSchemaRegistryClientConnectivityPending:
                store.schemaRegistryReducer
                    .isTestSchemaRegistryClientConnectivityPending,
            isTestSchemaRegistryJmxConnectivityPending:
                store.schemaRegistryReducer
                    .isTestSchemaRegistryJmxConnectivityPending,
            isCreateSchemaRegistryPending:
                store.schemaRegistryReducer.isCreateSchemaRegistryPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const testSchemaRegistryClientConnectivity = (
        mainConfiguration,
        schemaRegistryUrls,
        schemasCacheSize,
    ) =>
        dispatch(
            schemaRegistryActions.testSchemaRegistryClientConnectivity(
                mainConfiguration,
                schemaRegistryUrls,
                schemasCacheSize,
            ),
        );

    const testSchemaRegistryJmxConnectivity = (jmxUrl, jmxEnvironment) =>
        dispatch(
            schemaRegistryActions.testSchemaRegistryJmxConnectivity(
                jmxUrl,
                jmxEnvironment,
            ),
        );

    const createSchemaRegistry = (
        schemaRegistryCode,
        schemaRegistryName,
        schemaRegistryColor,
        mainConfiguration,
        schemaRegistryUrls,
        schemasCacheSize,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            schemaRegistryActions.createSchemaRegistry(
                schemaRegistryCode,
                schemaRegistryName,
                schemaRegistryColor,
                mainConfiguration,
                schemaRegistryUrls,
                schemasCacheSize,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() => navigate(`/schema_registries`));

    // Authorization
    const { isAuthorized: isAuthorizedTestSchemaRegistryConnectivity } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_TEST_SCHEMA_REGISTRY_CONNECTIVITY,
                },
            ],
        });

    return (
        <>
            <CreateSchemaRegistryBodyComponent
                testSchemaRegistryClientConnectivity={
                    testSchemaRegistryClientConnectivity
                }
                createSchemaRegistry={createSchemaRegistry}
                isTestSchemaRegistryClientConnectivityPending={
                    isTestSchemaRegistryClientConnectivityPending
                }
                isTestSchemaRegistryJmxConnectivityPending={
                    isTestSchemaRegistryJmxConnectivityPending
                }
                testSchemaRegistryJmxConnectivity={
                    testSchemaRegistryJmxConnectivity
                }
                isAuthorizedTestSchemaRegistryConnectivity={
                    isAuthorizedTestSchemaRegistryConnectivity
                }
            />
            <LoadingSpinner isLoading={isCreateSchemaRegistryPending} />
        </>
    );
};

export default CreateSchemaRegistryBody;
