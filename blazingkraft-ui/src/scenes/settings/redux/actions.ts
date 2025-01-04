import { GET } from 'rest/RestCalls';
import settingsTypes from './types';

function getConfiguration() {
    return {
        type: settingsTypes.GET_CONFIGURATION,
        payload: GET(`/settings/configuration`),
        meta: { context: 'Configuration' },
    };
}

function getProperties() {
    return {
        type: settingsTypes.GET_PROPERTIES,
        payload: GET(`/settings/properties`).then(data => {
            // IMPORTANT: This is mandatory when the server hasn't started yet and
            //            the response is an HTML page due to caching.
            if (!data || !data.oidcProviders) {
                throw new Error(
                    `Properties Response is Malformed => '${data}'`,
                );
            }
            return data;
        }),
        meta: { context: 'Properties', ignoreNotification: true },
    };
}

const settingsActions = {
    getConfiguration,
    getProperties,
};

export default settingsActions;
