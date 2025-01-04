import { ICommonPermissions } from 'common/types/server_permissions';
import { ProviderType } from 'common/utils/OIDCProviderUtils';

export interface CommonFeature {
    name: string;
    code: string;
    color: string;
    jmxEnabled: boolean;
}

export interface ICommonClusterFeature extends CommonFeature {
    schemaRegistryCode: string | null;
    schemaRegistryName: string | null;
}

export interface ICommonKafkaConnectFeature extends CommonFeature {
    clusterCode: string | null;
    clusterName: string | null;
}

export interface BlazingKraftPropertiesOIDCProvider {
    providerType: ProviderType | string | null;
    name: string;
    code: string;
    clientId: string;
    clientSecret: string | null;
    issuer: string;
    scopes: string[];
    pkceEnabled: boolean;
}

export interface BlazingKraftProperties {
    oidcProviders: BlazingKraftPropertiesOIDCProvider[];
}

export interface Features {
    clusterFeatures: ICommonClusterFeature[];
    schemaRegistryFeatures: CommonFeature[];
    kafkaConnectFeatures: ICommonKafkaConnectFeature[];
    ksqlDbFeatures: CommonFeature[];
}

export type SettingsReducerState = {
    features: Features | null;
    serverPermissions: ICommonPermissions | null;
    userPermissions: ICommonPermissions | null;
    isBlazingAdmin: boolean;
    properties: BlazingKraftProperties | null;
    isGetConfigurationPending: boolean;
    isGetPropertiesPending: boolean;
};
