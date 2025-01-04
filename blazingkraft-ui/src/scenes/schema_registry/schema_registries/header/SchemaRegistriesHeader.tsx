import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { SchemaRegistry } from 'common/types/schema_registry';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import SchemaRegistriesHeaderComponent from './SchemaRegistriesHeaderComponent';

const SchemaRegistriesHeader = () => {
    // Map State To Props
    const { isGetSchemaRegistriesPending, schemaRegistries } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSchemaRegistriesPending:
                    store.schemaRegistryReducer.isGetSchemaRegistriesPending,
                schemaRegistries: store.schemaRegistryReducer.schemaRegistries,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getSchemaRegistries = () =>
        dispatch(schemaRegistryActions.getSchemaRegistries());

    const describeSchemaRegistry = schemaRegistryCode =>
        dispatch(
            schemaRegistryActions.describeSchemaRegistry(schemaRegistryCode),
        );

    const refreshPageContent = () =>
        getSchemaRegistries().then(({ value }: { value: SchemaRegistry[] }) =>
            value.map(schemaRegistry =>
                describeSchemaRegistry(schemaRegistry.code),
            ),
        );

    // Authorization
    const { isAuthorized: isAuthorizedCreateSchemaRegistry } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_CREATE_SCHEMA_REGISTRY,
                },
            ],
        },
    );

    return (
        <SchemaRegistriesHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetSchemaRegistriesPending}
            schemaRegistiesLength={schemaRegistries.length}
            isAuthorizedCreateSchemaRegistry={isAuthorizedCreateSchemaRegistry}
        />
    );
};

export default SchemaRegistriesHeader;
