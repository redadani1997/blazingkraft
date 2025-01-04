import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import EditSchemaRegistryBodyComponent from './EditSchemaRegistryBodyComponent';

const EditSchemaRegistryBody = () => {
    // Map State To Props
    const {
        isTestSchemaRegistryClientConnectivityPending,
        isEditSchemaRegistryPending,
        isGetSchemaRegistryDetailsPending,
        schemaRegistryDetails,
        isTestSchemaRegistryJmxConnectivityPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isTestSchemaRegistryClientConnectivityPending:
                store.schemaRegistryReducer
                    .isTestSchemaRegistryClientConnectivityPending,
            isTestSchemaRegistryJmxConnectivityPending:
                store.schemaRegistryReducer
                    .isTestSchemaRegistryJmxConnectivityPending,
            isEditSchemaRegistryPending:
                store.schemaRegistryReducer.isEditSchemaRegistryPending,
            isGetSchemaRegistryDetailsPending:
                store.schemaRegistryReducer.isGetSchemaRegistryDetailsPending,
            schemaRegistryDetails:
                store.schemaRegistryReducer.schemaRegistryDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { schemaRegistryCode } = useParams();

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

    const editSchemaRegistry = (
        schemaRegistryColor,
        mainConfiguration,
        schemaRegistryUrls,
        schemasCacheSize,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment,
    ) =>
        dispatch(
            schemaRegistryActions.editSchemaRegistry(
                schemaRegistryCode,
                schemaRegistryColor,
                mainConfiguration,
                schemaRegistryUrls,
                schemasCacheSize,
                jmxEnabled,
                jmxUrl,
                jmxEnvironment,
            ),
        ).then(() =>
            navigate(`/schema_registries/${schemaRegistryCode}/dashboard`),
        );

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
            {CommonValidationUtils.isTruthy(schemaRegistryDetails) && (
                <EditSchemaRegistryBodyComponent
                    testSchemaRegistryClientConnectivity={
                        testSchemaRegistryClientConnectivity
                    }
                    testSchemaRegistryJmxConnectivity={
                        testSchemaRegistryJmxConnectivity
                    }
                    editSchemaRegistry={editSchemaRegistry}
                    isTestSchemaRegistryClientConnectivityPending={
                        isTestSchemaRegistryClientConnectivityPending
                    }
                    isTestSchemaRegistryJmxConnectivityPending={
                        isTestSchemaRegistryJmxConnectivityPending
                    }
                    isAuthorizedTestSchemaRegistryConnectivity={
                        isAuthorizedTestSchemaRegistryConnectivity
                    }
                    schemaRegistryDetails={schemaRegistryDetails}
                />
            )}
            <LoadingSpinner
                isLoading={
                    isEditSchemaRegistryPending ||
                    isGetSchemaRegistryDetailsPending
                }
            />
        </>
    );
};

export default EditSchemaRegistryBody;
