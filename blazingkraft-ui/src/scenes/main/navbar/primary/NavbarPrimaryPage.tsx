import { AlertPermissions } from 'common/permissions/management/AlertPermissions';
import { AuditPermissions } from 'common/permissions/management/AuditPermissions';
import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { ContentDiffPermissions } from 'common/permissions/playground/ContentDiffPermissions';
import { ContentValidationPermissions } from 'common/permissions/playground/ContentValidationPermissions';
import { ConversionsPermissions } from 'common/permissions/playground/ConversionsPermissions';
import { OpenAPIContentPermissions } from 'common/permissions/playground/OpenAPIContentPermissions';
import { OpenAPIDefinitionPermissions } from 'common/permissions/playground/OpenAPIDefinitionPermissions';
import { SchemasContentPermissions } from 'common/permissions/playground/SchemasContentPermissions';
import { SchemasDefinitionPermissions } from 'common/permissions/playground/SchemasDefinitionPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage } from '..';
import NavbarPrimaryPageComponent from './NavbarPrimaryPageComponent';

interface NavbarPrimaryPageProps {
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarPrimaryPage = ({ setActivePage }: NavbarPrimaryPageProps) => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedClustersFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedKafkaConnectsFeature } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementKafkaConnectPermissions
                            .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                            .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                },
            ],
        },
    );
    const { isAuthorized: isAuthorizedKsqlDbsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedSchemaRegistriesFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                },
            ],
        });

    const { isAuthorized: isAuthorizedDataMaskingFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS
                        .DATA_MASKING_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedGroupFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    GroupPermissions.GROUP_PERMISSIONS.GROUP_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedOIDCProviderFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                        .OIDC_PROVIDER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedServerPermissionsFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ServerPermissions.SERVER_PERMISSIONS
                            .SERVER_PERMISSIONS_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedUserFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    UserPermissions.USER_PERMISSIONS.USER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedAuditFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    AuditPermissions.AUDIT_PERMISSIONS.AUDIT_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedAlertFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    AlertPermissions.ALERT_PERMISSIONS.ALERT_FEATURE_ENABLED,
            },
        ],
    });

    const isAuthorizedManagementFeature =
        isAuthorizedDataMaskingFeature ||
        isAuthorizedGroupFeature ||
        isAuthorizedOIDCProviderFeature ||
        isAuthorizedServerPermissionsFeature ||
        isAuthorizedUserFeature ||
        isAuthorizedAuditFeature ||
        isAuthorizedAlertFeature;

    const { isAuthorized: isAuthorizedContentDiffFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'PLAYGROUND',
                permission:
                    ContentDiffPermissions.CONTENT_DIFF_PERMISSIONS
                        .CONTENT_DIFF_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedContentValidationFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        ContentValidationPermissions
                            .CONTENT_VALIDATION_PERMISSIONS
                            .CONTENT_VALIDATION_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedConversionsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'PLAYGROUND',
                permission:
                    ConversionsPermissions.CONVERSIONS_PERMISSIONS
                        .CONVERSIONS_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedOpenAPIContentFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        OpenAPIContentPermissions.OPENAPI_CONTENT_PERMISSIONS
                            .OPENAPI_CONTENT_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedOpenAPIDefinitionFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        OpenAPIDefinitionPermissions
                            .OPENAPI_DEFINITION_PERMISSIONS
                            .OPENAPI_DEFINITION_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedSchemasContentFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        SchemasContentPermissions.SCHEMAS_CONTENT_PERMISSIONS
                            .SCHEMAS_CONTENT_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedSchemasDefinitionFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        SchemasDefinitionPermissions
                            .SCHEMAS_DEFINITION_PERMISSIONS
                            .SCHEMAS_DEFINITION_FEATURE_ENABLED,
                },
            ],
        });

    const isAuthorizedPlaygroundFeature =
        isAuthorizedContentDiffFeature ||
        isAuthorizedContentValidationFeature ||
        isAuthorizedConversionsFeature ||
        isAuthorizedOpenAPIContentFeature ||
        isAuthorizedOpenAPIDefinitionFeature ||
        isAuthorizedSchemasContentFeature ||
        isAuthorizedSchemasDefinitionFeature;

    return (
        <>
            <NavbarPrimaryPageComponent
                activeLink={activeLink}
                setActivePage={setActivePage}
                isAuthorizedManagementFeature={isAuthorizedManagementFeature}
                isAuthorizedPlaygroundFeature={isAuthorizedPlaygroundFeature}
                isAuthorizedKafkaConnectsFeature={
                    isAuthorizedKafkaConnectsFeature
                }
                isAuthorizedKsqlDbsFeature={isAuthorizedKsqlDbsFeature}
                isAuthorizedSchemaRegistriesFeature={
                    isAuthorizedSchemaRegistriesFeature
                }
                isAuthorizedClustersFeature={isAuthorizedClustersFeature}
            />
        </>
    );
};

export default NavbarPrimaryPage;
