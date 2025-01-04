import { ReduxAction } from 'redux_config/.';
import { OIDCProviderReducerState } from '.';
import OIDCProviderTypes from './types';

const initialState: OIDCProviderReducerState = {
    isCreateOIDCProviderPending: false,
    isGetAllOIDCProvidersPending: false,
    isTestOIDCPROVDIERBrowserConnectivityPending: false,
    isTestOIDCPROVDIERServerConnectivityPending: false,
    OIDCProviders: [],
    isDeleteOIDCProviderPending: false,
    isEditOIDCProviderPending: false,
    isGetOIDCProviderDetailsPending: false,
    OIDCProviderDetails: null,
    isGetOIDCProviderWellKnownConfigurationPending: false,
    OIDCProviderWellKnownConfiguration: {},
};

function OIDCProviderReducer(
    state = initialState,
    action: ReduxAction,
): OIDCProviderReducerState {
    switch (action.type) {
        // GET_ALL_OIDC_PROVIDERS
        case OIDCProviderTypes.GET_ALL_OIDC_PROVIDERS_PENDING:
            return {
                ...state,
                isGetAllOIDCProvidersPending: true,
            };
        case OIDCProviderTypes.GET_ALL_OIDC_PROVIDERS_FULFILLED:
            return {
                ...state,
                isGetAllOIDCProvidersPending: false,
                OIDCProviders: action.payload,
            };
        case OIDCProviderTypes.GET_ALL_OIDC_PROVIDERS_REJECTED:
            return {
                ...state,
                isGetAllOIDCProvidersPending: false,
                OIDCProviders: [],
            };

        // CREATE_OIDC_PROVIDER
        case OIDCProviderTypes.CREATE_OIDC_PROVIDER_PENDING:
            return {
                ...state,
                isCreateOIDCProviderPending: true,
            };
        case OIDCProviderTypes.CREATE_OIDC_PROVIDER_REJECTED:
        case OIDCProviderTypes.CREATE_OIDC_PROVIDER_FULFILLED:
            return {
                ...state,
                isCreateOIDCProviderPending: false,
            };

        // EDIT_OIDC_PROVIDER
        case OIDCProviderTypes.EDIT_OIDC_PROVIDER_PENDING:
            return {
                ...state,
                isEditOIDCProviderPending: true,
            };
        case OIDCProviderTypes.EDIT_OIDC_PROVIDER_REJECTED:
        case OIDCProviderTypes.EDIT_OIDC_PROVIDER_FULFILLED:
            return {
                ...state,
                isEditOIDCProviderPending: false,
            };

        // DELETE_OIDC_PROVIDER
        case OIDCProviderTypes.DELETE_OIDC_PROVIDER_PENDING:
            return {
                ...state,
                isDeleteOIDCProviderPending: true,
            };
        case OIDCProviderTypes.DELETE_OIDC_PROVIDER_REJECTED:
        case OIDCProviderTypes.DELETE_OIDC_PROVIDER_FULFILLED:
            return {
                ...state,
                isDeleteOIDCProviderPending: false,
            };

        // GET_OIDC_PROVIDER_DETAILS
        case OIDCProviderTypes.GET_OIDC_PROVIDER_DETAILS_PENDING:
            return {
                ...state,
                isGetOIDCProviderDetailsPending: true,
            };
        case OIDCProviderTypes.GET_OIDC_PROVIDER_DETAILS_FULFILLED:
            return {
                ...state,
                isGetOIDCProviderDetailsPending: false,
                OIDCProviderDetails: action.payload,
            };
        case OIDCProviderTypes.GET_OIDC_PROVIDER_DETAILS_REJECTED:
            return {
                ...state,
                isGetOIDCProviderDetailsPending: false,
                OIDCProviderDetails: null,
            };

        // GET_OIDC_PROVIDER_WELL_KNOWN_CONFIGURATION
        case OIDCProviderTypes.GET_OIDC_PROVIDER_WELL_KNOWN_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetOIDCProviderWellKnownConfigurationPending: true,
            };
        case OIDCProviderTypes.GET_OIDC_PROVIDER_WELL_KNOWN_CONFIGURATION_FULFILLED:
            return {
                ...state,
                isGetOIDCProviderWellKnownConfigurationPending: false,
                OIDCProviderWellKnownConfiguration: action.payload,
            };
        case OIDCProviderTypes.GET_OIDC_PROVIDER_WELL_KNOWN_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetOIDCProviderWellKnownConfigurationPending: false,
                OIDCProviderWellKnownConfiguration: {},
            };

        default:
            return state;
    }
}

export default OIDCProviderReducer;
