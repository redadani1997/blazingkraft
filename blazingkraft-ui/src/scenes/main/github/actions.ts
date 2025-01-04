import axios from 'axios';
import githubTypes from './types';

function getLatestRelease() {
    return {
        type: githubTypes.GET_LATEST_RELEASE,
        payload: axios
            .get(
                'https://api.github.com/repos/redadani1997/blazingkraft/releases/latest',
            )
            .then(payload => payload.data),
        meta: {
            context: 'Github Release',
            ignoreNotification: true,
        },
    };
}

const githubActions = {
    getLatestRelease,
};

export default githubActions;
