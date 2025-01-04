const COMMON_SCOPES_OPTIONS = [
    {
        label: 'blazingkraft',
        value: 'blazingkraft',
    },
    {
        label: 'offline_access',
        value: 'offline_access',
    },
    {
        label: 'openid',
        value: 'openid',
    },
    {
        label: 'profile',
        value: 'profile',
    },
    {
        label: 'email',
        value: 'email',
    },
    {
        label: 'address',
        value: 'address',
    },
    {
        label: 'phone',
        value: 'phone',
    },
    {
        label: 'roles',
        value: 'roles',
    },
];

export type ProviderType =
    | 'Keycloak'
    | 'Auth0'
    | 'Okta'
    | 'Google'
    | 'Facebook'
    | 'Github';

const COMMON_PROVIDER_TYPES_OPTIONS: {
    label: ProviderType;
    value: ProviderType;
}[] = [
    {
        label: 'Keycloak',
        value: 'Keycloak',
    },
    {
        label: 'Auth0',
        value: 'Auth0',
    },
    {
        label: 'Okta',
        value: 'Okta',
    },
    {
        label: 'Google',
        value: 'Google',
    },
    {
        label: 'Facebook',
        value: 'Facebook',
    },
    {
        label: 'Github',
        value: 'Github',
    },
];

const OIDCProviderUtils = {
    COMMON_SCOPES_OPTIONS,
    COMMON_PROVIDER_TYPES_OPTIONS,
};

export { OIDCProviderUtils };
