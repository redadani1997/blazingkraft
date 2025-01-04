import { User } from 'oidc-client-ts';
import { ReduxAction } from 'redux_config/.';
import settingsTypes from 'scenes/settings/redux/types';
import { LoginReducerState } from '.';
import loginTypes from './types';

const initialState: LoginReducerState = {
    connectedUser: null,
    token: null,
    connectionType: null,
    isLoginPending: false,
    isOIDCProviderSigninCallbackPending: false,
    isRefreshTokenPending: false,
};

function loginReducer(
    state = initialState,
    action: ReduxAction,
): LoginReducerState {
    switch (action.type) {
        // OIDC_PROVIDER_SIGNIN_CALLBACK
        case loginTypes.OIDC_PROVIDER_SIGNIN_CALLBACK_PENDING:
            return {
                ...state,
                isOIDCProviderSigninCallbackPending: true,
            };
        case loginTypes.OIDC_PROVIDER_SIGNIN_CALLBACK_FULFILLED: {
            const user: User | null = action.payload;
            return {
                ...state,
                isOIDCProviderSigninCallbackPending: false,
                token: user?.id_token || user?.access_token || '',
                connectionType: 'OIDC_PROVIDER',
            };
        }
        case loginTypes.OIDC_PROVIDER_SIGNIN_CALLBACK_REJECTED:
            return {
                ...state,
                isOIDCProviderSigninCallbackPending: false,
                connectedUser: null,
                token: null,
                connectionType: null,
            };

        // LOGIN
        case loginTypes.LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: true,
            };
        case loginTypes.LOGIN_FULFILLED: {
            const { id_token, access_token } = action.payload;
            return {
                ...state,
                isLoginPending: false,
                isOIDCProviderSigninCallbackPending: false,
                token: id_token || access_token || '',
                connectionType: 'BLAZINGKRAFT',
            };
        }
        case loginTypes.LOGIN_REJECTED:
            return {
                ...state,
                isLoginPending: false,
                connectedUser: null,
                token: null,
            };

        // REFRESH_TOKEN
        case loginTypes.REFRESH_TOKEN_PENDING:
            return {
                ...state,
                isRefreshTokenPending: true,
            };
        case loginTypes.REFRESH_TOKEN_FULFILLED: {
            const { id_token, access_token } = action.payload;
            return {
                ...state,
                isRefreshTokenPending: false,
                isOIDCProviderSigninCallbackPending: false,
                token: id_token || access_token || '',
                connectionType: 'BLAZINGKRAFT',
            };
        }
        case loginTypes.REFRESH_TOKEN_REJECTED:
            return {
                ...state,
                isRefreshTokenPending: false,
                connectedUser: null,
                token: null,
            };

        // OIDC_PROVIDER_REFRESH_TOKEN
        case loginTypes.OIDC_PROVIDER_REFRESH_TOKEN: {
            const user: User | null = action.payload;
            return {
                ...state,
                isOIDCProviderSigninCallbackPending: false,
                token: user?.id_token || user?.access_token || '',
                connectionType: 'OIDC_PROVIDER',
            };
        }

        // // GET_CONFIGURATION
        case settingsTypes.GET_CONFIGURATION_FULFILLED: {
            const { connectedUser } = action.payload;
            return {
                ...state,
                connectedUser,
            };
        }
        default:
            return state;
    }
}

export default loginReducer;
