import { notifyWarning } from 'common/notifications/Notifications';
import { User } from 'oidc-client-ts';
import store from 'redux_config/store';
import loginTypes from 'scenes/login/redux/types';

function onUserLoadedEvent(user: User) {
    console.log('User Loaded');
    store.dispatch({
        type: loginTypes.OIDC_PROVIDER_REFRESH_TOKEN,
        payload: user,
    });
}

function onTokenExpiringEvent() {
    console.log('Token Expiring');
}

function onTokenExpiredEvent() {
    console.log('Token Expired');

    notifyWarning({
        title: 'OpenID Connect Provider Token',
        message: 'Error occurred while refreshing token.',
    });
}

function onSilentRenewErrorEvent() {
    console.log('Silent Renew Error');

    notifyWarning({
        title: 'OpenID Connect Provider Refresh Token',
        message:
            'Error occurred while refreshing token, please try to refresh the page.',
    });
}

function onUserChangedEvent() {
    console.log('User changed');
}

const OpenIDServiceEvents = {
    onUserLoadedEvent,
    onTokenExpiringEvent,
    onTokenExpiredEvent,
    onUserChangedEvent,
    onSilentRenewErrorEvent,
};

export { OpenIDServiceEvents };
