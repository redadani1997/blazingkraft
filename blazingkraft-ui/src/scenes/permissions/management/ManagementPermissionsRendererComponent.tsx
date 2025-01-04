import { Grid } from '@mantine/core';
import ManagementPermissions from 'common/permissions/ManagementPermissions';
import { AlertPermissions } from 'common/permissions/management/AlertPermissions';
import { AuditPermissions } from 'common/permissions/management/AuditPermissions';
import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { FilesPermissions } from 'common/permissions/management/FilesPermissions';
import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { useEffect } from 'react';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface ManagementPermissionsRendererComponentProps {
    managementPermissions: string[];
    setManagementPermissions: (managementPermissions: string[]) => void;
    disabled?: boolean;
    basePermissions?: string[];
}

function initPermissions(
    setManagementPermissions: (
        managementPermissions: readonly string[],
    ) => void,
) {
    setManagementPermissions(ManagementPermissions.ALL_PERMISSIONS);
}

function constructPermissions(
    setManagementPermissions: (managementPermissions: string[]) => void,
    basePermissions: string[],
) {
    setManagementPermissions(basePermissions);
}

function ManagementPermissionsRendererComponent({
    managementPermissions,
    setManagementPermissions,
    disabled,
    basePermissions,
}: ManagementPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(setManagementPermissions, basePermissions);
        } else {
            initPermissions(setManagementPermissions);
        }
    }, [basePermissions]);

    return (
        <Grid>
            <PermissionsWrapper
                header="Clusters"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Kafka Connects"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    ManagementKafkaConnectPermissions.MANAGEMENT_KAFKA_CONNECT_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Schema Registries"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    ManagementSchemaRegistryPermissions.MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="KsqlDbs"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Groups"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    GroupPermissions.GROUP_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Users"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    UserPermissions.USER_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="OpenID Connect Providers"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Server Permissions"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    ServerPermissions.SERVER_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Data Masking"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Files"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    FilesPermissions.FILES_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Audit"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    AuditPermissions.AUDIT_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Alerts"
                permissions={managementPermissions}
                setPermissions={setManagementPermissions}
                permissionLabels={
                    AlertPermissions.ALERT_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
        </Grid>
    );
}

export default ManagementPermissionsRendererComponent;
