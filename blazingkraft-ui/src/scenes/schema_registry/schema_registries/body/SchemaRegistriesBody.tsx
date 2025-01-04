import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import SchemaRegistriesBodyComponent from './SchemaRegistriesBodyComponent';

interface SchemaRegistriesBodyProps {
    setSchemaRegistryToDelete: (schemaRegistryToDelete: string) => void;
    setIsDeleteSchemaRegistryModalOpen: (
        isDeleteSchemaRegistryModalOpen: boolean,
    ) => void;
}

const SchemaRegistriesBody = ({
    setSchemaRegistryToDelete,
    setIsDeleteSchemaRegistryModalOpen,
}: SchemaRegistriesBodyProps) => {
    // Map State To Props
    const {
        isGetSchemaRegistriesDescriptionsPending,
        isGetSchemaRegistriesPending,
        schemaRegistries,
        schemaRegistriesDescriptions,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetSchemaRegistriesPending:
                store.schemaRegistryReducer.isGetSchemaRegistriesPending,
            isGetSchemaRegistriesDescriptionsPending:
                store.schemaRegistryReducer
                    .isGetSchemaRegistriesDescriptionsPending,
            schemaRegistries: store.schemaRegistryReducer.schemaRegistries,
            schemaRegistriesDescriptions:
                store.schemaRegistryReducer.schemaRegistriesDescriptions,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDeleteSchemaRegistry } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_DELETE_SCHEMA_REGISTRY,
                },
            ],
        },
    );
    const { isAuthorized: isAuthorizedEditSchemaRegistry } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementSchemaRegistryPermissions
                        .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                        .MANAGEMENT_EDIT_SCHEMA_REGISTRY,
            },
        ],
    });

    return (
        <>
            <SchemaRegistriesBodyComponent
                isGetSchemaRegistriesDescriptionsPending={
                    isGetSchemaRegistriesDescriptionsPending
                }
                isGetSchemaRegistriesPending={isGetSchemaRegistriesPending}
                schemaRegistries={schemaRegistries}
                schemaRegistriesDescriptions={schemaRegistriesDescriptions}
                isAuthorizedDeleteSchemaRegistry={
                    isAuthorizedDeleteSchemaRegistry
                }
                isAuthorizedEditSchemaRegistry={isAuthorizedEditSchemaRegistry}
                setSchemaRegistryToDelete={setSchemaRegistryToDelete}
                setIsDeleteSchemaRegistryModalOpen={
                    setIsDeleteSchemaRegistryModalOpen
                }
            />
        </>
    );
};

export default SchemaRegistriesBody;
