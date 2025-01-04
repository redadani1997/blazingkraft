import { SchemaRegistryDashboardPermissions } from './schema_registry/SchemaRegistryDashboardPermissions';
import { SchemaRegistryServerPermissions } from './schema_registry/SchemaRegistryServerPermissions';
import { SubjectPermissions } from './schema_registry/SubjectPermissions';

const ALL_PERMISSIONS = [
    ...SchemaRegistryDashboardPermissions.SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS_LIST,
    ...SchemaRegistryServerPermissions.SCHEMA_REGISTRY_SERVER_PERMISSIONS_LIST,
    ...SubjectPermissions.SUBJECT_PERMISSIONS_LIST,
] as const;

const SchemaRegistryPermissions = {
    ALL_PERMISSIONS,
};

export default SchemaRegistryPermissions;
