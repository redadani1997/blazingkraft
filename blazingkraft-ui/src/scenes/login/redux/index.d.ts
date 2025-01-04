export interface Permissions {
    clusterPermissions: Map<string, string[]>;
    kafkaConnectPermissions: Map<string, string[]>;
    schemaRegistryPermissions: Map<string, string[]>;
    managementPermissions: string[];
}

export interface ConnectedUser {
    identifier: string;
    displayedName: string;
    picture: string;
}

export type LoginReducerState = {
    connectedUser: ConnectedUser | null;
    token: string | null;
    connectionType: 'BLAZINGKRAFT' | 'OIDC_PROVIDER' | null;
    isLoginPending: boolean;
    isRefreshTokenPending: boolean;
    isOIDCProviderSigninCallbackPending: boolean;
};
