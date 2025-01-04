import axios from 'axios';
import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import OIDCProviderTypes from './types';

export interface OIDCProviderRequest {
    name: string;
    code: string;
    issuer: string;
    scopes: string[];
    pkceEnabled: boolean;
    clientId: string;
    clientSecret: string | null;
    providerType: string;
}

function constructUrl(issuer: string) {
    if (issuer && issuer.endsWith('/')) {
        return `${issuer}.well-known/openid-configuration`;
    }
    return `${issuer}/.well-known/openid-configuration`;
}

function testOIDCProviderBrowserConnectivity(issuer: string) {
    const url = constructUrl(issuer);

    const loadingId = notifyLoading({
        title: 'OIDC Provider Browser Connectivity',
        message: 'Testing OIDC Provider Browser connectivity in progress...',
    });
    return {
        type: OIDCProviderTypes.TEST_OIDC_PROVIDER_BROWSER_CONNECTIVITY,
        payload: axios
            .get(url)
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'OIDC Provider Browser Connectivity',
                    message: 'OIDC Provider Browser Connection Successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'OIDC Provider Browser Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
    };
}

function testOIDCProviderServerConnectivity(issuer: string) {
    const loadingId = notifyLoading({
        title: 'OIDC Provider Server Connectivity',
        message: 'Testing OIDC Provider Server connectivity in progress...',
    });
    return {
        type: OIDCProviderTypes.TEST_OIDC_PROVIDER_SERVER_CONNECTIVITY,
        payload: POST('/management/oidc-providers/test/connectivity', {
            issuer,
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'OIDC Provider Server Connectivity',
                    message: 'OIDC Provider Server Connection Successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'OIDC Provider Server Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
    };
}

function getOIDCProviderWellKnownConfiguration(issuer: string) {
    const url = constructUrl(issuer);
    return {
        type: OIDCProviderTypes.GET_OIDC_PROVIDER_WELL_KNOWN_CONFIGURATION,
        payload: axios.get(url).then(res => res.data),
        meta: { context: 'OIDC Provider Well Known Config' },
    };
}

function createOIDCProvider(oidcProvider: OIDCProviderRequest) {
    return {
        type: OIDCProviderTypes.CREATE_OIDC_PROVIDER,
        payload: POST('/management/oidc-providers', oidcProvider),
        meta: { name: oidcProvider.name, context: 'OIDC Provider Creation' },
    };
}

function getAllOIDCProviders() {
    return {
        type: OIDCProviderTypes.GET_ALL_OIDC_PROVIDERS,
        payload: GET('/management/oidc-providers'),
        meta: { context: 'OIDC Providers' },
    };
}

function getOIDCProviderDetails(oidcProviderCode: string) {
    return {
        type: OIDCProviderTypes.GET_OIDC_PROVIDER_DETAILS,
        payload: GET(`/management/oidc-providers/${oidcProviderCode}/details`),
        meta: { context: 'OIDC Providers' },
    };
}

function editOIDCProvider(
    oidcProviderCode: string,
    oidcProvider: OIDCProviderRequest,
) {
    return {
        type: OIDCProviderTypes.EDIT_OIDC_PROVIDER,
        payload: PUT(
            `/management/oidc-providers/${oidcProviderCode}`,
            oidcProvider,
        ),
        meta: { name: oidcProvider.name, context: 'OIDC Provider Edit' },
    };
}

function deleteOIDCProvider(
    oidcProviderCode: string,
    oidcProviderName: string,
) {
    return {
        type: OIDCProviderTypes.DELETE_OIDC_PROVIDER,
        payload: DELETE(`/management/oidc-providers/${oidcProviderCode}`),
        meta: { name: oidcProviderName, context: 'OIDC Provider Deletion' },
    };
}

const OIDCProviderActions = {
    createOIDCProvider,
    getAllOIDCProviders,
    testOIDCProviderBrowserConnectivity,
    testOIDCProviderServerConnectivity,
    getOIDCProviderDetails,
    editOIDCProvider,
    deleteOIDCProvider,
    getOIDCProviderWellKnownConfiguration,
};

export default OIDCProviderActions;
