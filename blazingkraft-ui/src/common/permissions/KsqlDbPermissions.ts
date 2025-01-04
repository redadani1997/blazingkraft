import { KsqlDbConnectorPermissions } from './ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from './ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from './ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from './ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from './ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from './ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from './ksqldb/KsqlDbTopicPermissions';

const ALL_PERMISSIONS = [
    ...KsqlDbDashboardPermissions.KSQLDB_DASHBOARD_PERMISSIONS_LIST,
    ...KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS_LIST,
    ...KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS_LIST,
    ...KsqlDbStreamPermissions.KSQLDB_STREAM_PERMISSIONS_LIST,
    ...KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS_LIST,
    ...KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS_LIST,
    ...KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS_LIST,
] as const;

const KsqlDbPermissions = {
    ALL_PERMISSIONS,
};

export default KsqlDbPermissions;
