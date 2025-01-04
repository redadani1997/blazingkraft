import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import SchemaRegistryDashboardHeaderComponent from './SchemaRegistryDashboardHeaderComponent';

interface SchemaRegistryDashboardHeaderProps {
    refreshPageContent: () => void;
}

const SchemaRegistryDashboardHeader = ({
    refreshPageContent,
}: SchemaRegistryDashboardHeaderProps) => {
    // Map State To Props
    const { isGetSchemaRegistryDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSchemaRegistryDetailsPending:
                    store.schemaRegistryReducer
                        .isGetSchemaRegistryDetailsPending,
                groupDetails: store.groupReducer.groupDetails,
            };
        },
        shallowEqual,
    );

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
        <SchemaRegistryDashboardHeaderComponent
            isRefreshPageContentPending={isGetSchemaRegistryDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteSchemaRegistry={isAuthorizedDeleteSchemaRegistry}
            isAuthorizedEditSchemaRegistry={isAuthorizedEditSchemaRegistry}
        />
    );
};

export default SchemaRegistryDashboardHeader;
