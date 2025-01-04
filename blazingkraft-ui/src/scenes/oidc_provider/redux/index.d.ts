export interface OIDCProvider {
    providerType: string;
    name: string;
    code: string;
    clientId: string;
    clientSecret: string | null;
    issuer: string;
    scopes: string[];
    pkceEnabled: boolean;
    isSystem: boolean;
}

export type OIDCProviderReducerState = {
    isCreateOIDCProviderPending: boolean;
    isGetAllOIDCProvidersPending: boolean;
    isDeleteOIDCProviderPending: boolean;
    isEditOIDCProviderPending: boolean;
    isGetOIDCProviderDetailsPending: boolean;
    isTestOIDCPROVDIERBrowserConnectivityPending: boolean;
    isTestOIDCPROVDIERServerConnectivityPending: boolean;
    isGetOIDCProviderWellKnownConfigurationPending: boolean;
    OIDCProviders: OIDCProvider[];
    OIDCProviderDetails: OIDCProvider | null;
    OIDCProviderWellKnownConfiguration: {
        [key: string]: any;
    };
};
