import { combineReducers, Reducer } from 'redux';
import { AclReducerState } from 'scenes/acl/redux';
import aclReducer from 'scenes/acl/redux/reducer';
import { AuditLogReducerState } from 'scenes/audit/redux';
import auditLogReducer from 'scenes/audit/redux/reducer';
import { ClusterReducerState } from 'scenes/cluster/redux';
import clusterReducer from 'scenes/cluster/redux/reducer';
import { ConnectPluginReducerState } from 'scenes/connect_plugin/redux';
import connectPluginReducer from 'scenes/connect_plugin/redux/reducer';
import { ConnectorReducerState } from 'scenes/connector/redux';
import connectorReducer from 'scenes/connector/redux/reducer';
import { ConsumerReducerState } from 'scenes/consumer/redux';
import consumerReducer from 'scenes/consumer/redux/reducer';
import { ConsumerGroupReducerState } from 'scenes/consumer_group/redux';
import consumerGroupReducer from 'scenes/consumer_group/redux/reducer';
import { DataMaskingReducerState } from 'scenes/data_masking/redux';
import dataMaskingReducer from 'scenes/data_masking/redux/reducer';
import { DelegationTokenReducerState } from 'scenes/delegation_token/redux';
import delegationTokenReducer from 'scenes/delegation_token/redux/reducer';
import { FilesReducerState } from 'scenes/files/redux';
import filesReducer from 'scenes/files/redux/reducer';
import { GroupReducerState } from 'scenes/group/redux';
import groupReducer from 'scenes/group/redux/reducer';
import { KafkaConnectReducerState } from 'scenes/kafka_connect/redux';
import kafkaConnectReducer from 'scenes/kafka_connect/redux/reducer';
import { KsqlDbReducerState } from 'scenes/ksqldb/redux';
import ksqlDbReducer from 'scenes/ksqldb/redux/reducer';
import { KsqlDbEcosystemReducerState } from 'scenes/ksqldb_ecosystem/redux';
import ksqlDbEcosystemReducer from 'scenes/ksqldb_ecosystem/redux/reducer';
import { LoginReducerState } from 'scenes/login/redux';
import loginReducer from 'scenes/login/redux/reducer';
import { GithubReducerState } from 'scenes/main/github';
import githubReducer from 'scenes/main/github/reducer';
import { RouteReducerState } from 'scenes/main/navbar/redux';
import routeReducer from 'scenes/main/navbar/redux/reducer';
import { OffsetReducerState } from 'scenes/offset/redux';
import offsetReducer from 'scenes/offset/redux/reducer';
import { OIDCProviderReducerState } from 'scenes/oidc_provider/redux';
import OIDCProviderReducer from 'scenes/oidc_provider/redux/reducer';
import { ProducerReducerState } from 'scenes/producer/redux';
import producerReducer from 'scenes/producer/redux/reducer';
import { QuotaReducerState } from 'scenes/quota/redux';
import quotaReducer from 'scenes/quota/redux/reducer';
import { SchemaRegistryReducerState } from 'scenes/schema_registry/redux';
import schemaRegistryReducer from 'scenes/schema_registry/redux/reducer';
import { ServerPermissionsReducerState } from 'scenes/server_permissions/redux';
import serverPermissionsReducer from 'scenes/server_permissions/redux/reducer';
import { SettingsReducerState } from 'scenes/settings/redux';
import settingsReducer from 'scenes/settings/redux/reducer';
import { TopicReducerState } from 'scenes/topic/redux';
import topicReducer from 'scenes/topic/redux/reducer';
import { UserReducerState } from 'scenes/user/redux';
import userReducer from 'scenes/user/redux/reducer';

const reducers: Reducer = combineReducers({
    clusterReducer,
    routeReducer,
    topicReducer,
    schemaRegistryReducer,
    settingsReducer,
    producerReducer,
    consumerReducer,
    consumerGroupReducer,
    offsetReducer,
    aclReducer,
    delegationTokenReducer,
    quotaReducer,
    kafkaConnectReducer,
    connectorReducer,
    connectPluginReducer,
    OIDCProviderReducer,
    loginReducer,
    groupReducer,
    userReducer,
    serverPermissionsReducer,
    filesReducer,
    ksqlDbReducer,
    ksqlDbEcosystemReducer,
    auditLogReducer,
    dataMaskingReducer,
    githubReducer,
});

export default reducers;

export type ReduxStore = {
    routeReducer: RouteReducerState;
    clusterReducer: ClusterReducerState;
    topicReducer: TopicReducerState;
    schemaRegistryReducer: SchemaRegistryReducerState;
    producerReducer: ProducerReducerState;
    consumerReducer: ConsumerReducerState;
    consumerGroupReducer: ConsumerGroupReducerState;
    offsetReducer: OffsetReducerState;
    aclReducer: AclReducerState;
    delegationTokenReducer: DelegationTokenReducerState;
    quotaReducer: QuotaReducerState;
    kafkaConnectReducer: KafkaConnectReducerState;
    connectorReducer: ConnectorReducerState;
    connectPluginReducer: ConnectPluginReducerState;
    OIDCProviderReducer: OIDCProviderReducerState;
    settingsReducer: SettingsReducerState;
    loginReducer: LoginReducerState;
    groupReducer: GroupReducerState;
    userReducer: UserReducerState;
    serverPermissionsReducer: ServerPermissionsReducerState;
    filesReducer: FilesReducerState;
    ksqlDbReducer: KsqlDbReducerState;
    ksqlDbEcosystemReducer: KsqlDbEcosystemReducerState;
    auditLogReducer: AuditLogReducerState;
    dataMaskingReducer: DataMaskingReducerState;
    githubReducer: GithubReducerState;
};
