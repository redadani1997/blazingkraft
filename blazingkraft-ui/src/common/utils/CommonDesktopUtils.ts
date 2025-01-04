import { SET_BLAZINGKRAFT_API_WS_URL } from 'common/websocket/CommonWebSocket';
import { SET_BLAZINGKRAFT_API_URL } from 'rest/RestCalls';
import { CommonValidationUtils } from './CommonValidationUtils';

function isFullDesktop(): boolean {
    return (
        import.meta.env.VITE_BLAZINGKRAFT_PLATFORM === 'desktop' &&
        CommonValidationUtils.isTruthy(window.ipcRenderer)
    );
}

function isDesktop(): boolean {
    return import.meta.env.VITE_BLAZINGKRAFT_PLATFORM === 'desktop';
}

function isWeb(): boolean {
    return import.meta.env.VITE_BLAZINGKRAFT_PLATFORM === 'web';
}

if (isFullDesktop()) {
    postMessage({ payload: 'removeLoading' }, '*');

    window.ipcRenderer.on('SET_BLAZINGKRAFT_API_URL', (_event, message) => {
        SET_BLAZINGKRAFT_API_URL(message);
        SET_BLAZINGKRAFT_API_WS_URL(message);
        DESKTOP_APP_INITIALIZED = true;
    });
}

let DESKTOP_APP_INITIALIZED = false;

function isDesktopAppInitialized(): boolean {
    return DESKTOP_APP_INITIALIZED;
}

const CommonDesktopUtils = {
    isWeb,
    isDesktop,
    isDesktopAppInitialized,
};

export { CommonDesktopUtils };
