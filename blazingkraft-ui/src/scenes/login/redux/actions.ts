import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { UserManager } from 'oidc-client-ts';
import { OpenIDService } from 'oidc/OpenIDService';
import { POST } from 'rest/RestCalls';
import loginTypes from './types';

function login(email, password) {
    return {
        type: loginTypes.LOGIN,
        payload: POST('/oauth2/token', {
            email,
            password,
            grant_type: 'password',
            client_id: 'blazingkraft-ui',
        }).then(data => {
            // IMPORTANT: This is mandatory when the server hasn't started yet and
            //            the response is an HTML page due to caching.
            if (!data || (!data.id_token && !data.access_token)) {
                throw new Error(`Login Response is Malformed => '${data}'`);
            }
            return data;
        }),
        meta: {
            context: 'Login',
        },
    };
}

function blazingkraftRefreshToken() {
    const loadingId = notifyLoading({
        title: 'Login',
        message: 'Login in progress...',
    });
    return {
        type: loginTypes.REFRESH_TOKEN,
        payload: POST('/oauth2/refresh_token', null)
            .then(res => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Login',
                    message: `Successfully logged in.`,
                });
                return res;
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Login',
                    message: 'Session Expired, please login again.',
                });
                throw err;
            }),
        meta: {
            context: 'Login',
            ignoreNotification: true,
        },
    };
}

function oidcProviderSigninCallback(
    userManager: UserManager,
    OIDCProviderCode: string,
    OIDCProviderName: string,
) {
    const loadingId = notifyLoading({
        title: 'OpenID Connect Provider Login',
        message: 'Login with OpenID Connect Provider in progress...',
    });
    return {
        type: loginTypes.OIDC_PROVIDER_SIGNIN_CALLBACK,
        payload: userManager
            .signinCallback()
            .then(res => {
                OpenIDService.onSuccessfullLogin();
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'OpenID Connect Provider Login',
                    message: `Successfully logged in using OpenID Connect Provider '${OIDCProviderName}'.`,
                });
                return res;
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'OpenID Connect Provider Login',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'OpenID Connect Provider Login',
            ignoreNotification: true,
        },
    };
}

function logout() {
    POST('/oauth2/logout', {});
}

const loginActions = {
    login,
    oidcProviderSigninCallback,
    blazingkraftRefreshToken,
    logout,
};

export default loginActions;
