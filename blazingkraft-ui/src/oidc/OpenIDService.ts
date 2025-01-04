import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { OpenIDServiceEvents } from './OpenIDServiceEvents';

let userManager: UserManager = null;

const devModeInterval = null;

function constructUserManager(settings: UserManagerSettings): UserManager {
    if (userManager) {
        cleanupUserManager();
    }

    userManager = new UserManager(settings);

    return userManager;
}

function onSuccessfullLogin(): void {
    // devModeInterval = setInterval(() => {
    // userManager
    //     .getUser()
    //     .then(arg => console.log('Expires In ...', arg.expires_in));
    // }, 10000);

    userManager.events.addUserLoaded(OpenIDServiceEvents.onUserLoadedEvent);

    userManager.events.addAccessTokenExpired(
        OpenIDServiceEvents.onTokenExpiredEvent,
    );

    userManager.events.addAccessTokenExpiring(
        OpenIDServiceEvents.onTokenExpiringEvent,
    );

    userManager.events.addSilentRenewError(
        OpenIDServiceEvents.onSilentRenewErrorEvent,
    );

    userManager.events.addUserSessionChanged(
        OpenIDServiceEvents.onUserChangedEvent,
    );
}

function cleanupUserManager(): void {
    if (userManager === null) {
        return;
    }

    devModeInterval.clearInterval();

    userManager.events.removeUserLoaded(OpenIDServiceEvents.onUserLoadedEvent);

    userManager.events.removeAccessTokenExpired(
        OpenIDServiceEvents.onTokenExpiredEvent,
    );

    userManager.events.removeAccessTokenExpiring(
        OpenIDServiceEvents.onTokenExpiringEvent,
    );

    userManager.events.removeSilentRenewError(
        OpenIDServiceEvents.onSilentRenewErrorEvent,
    );

    userManager.events.removeUserSessionChanged(
        OpenIDServiceEvents.onUserChangedEvent,
    );

    userManager = null;
}

const OpenIDService = {
    constructUserManager,
    cleanupUserManager,
    onSuccessfullLogin,
};

export { OpenIDService };
