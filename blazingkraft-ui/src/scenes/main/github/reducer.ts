import { ReduxAction } from 'redux_config/.';
import { GithubReducerState, IGithubRelease } from '.';
import githubTypes from './types';

const CURRENT_GITHUB_RELEASE = {
    id: -1,
    body: '1.1.0',
    name: '1.1.0',
    tag_name: '1.1.0',
};

const initialState: GithubReducerState = {
    isGetLatestReleasePending: false,
    latestRelease: CURRENT_GITHUB_RELEASE,
    currentRelease: CURRENT_GITHUB_RELEASE,
};

function computeLatestRelease(payload): IGithubRelease {
    try {
        if (!payload || !payload.name) {
            return CURRENT_GITHUB_RELEASE;
        }
        return {
            id: payload.id,
            body: payload.body,
            name: payload.name,
            tag_name: payload.tag_name,
        };
    } catch (err) {
        return CURRENT_GITHUB_RELEASE;
    }
}

function githubReducer(
    state = initialState,
    action: ReduxAction,
): GithubReducerState {
    switch (action.type) {
        // GET_LATEST_RELEASE
        case githubTypes.GET_LATEST_RELEASE_PENDING:
            return {
                ...state,
                isGetLatestReleasePending: true,
            };
        case githubTypes.GET_LATEST_RELEASE_FULFILLED: {
            return {
                ...state,
                isGetLatestReleasePending: false,
                latestRelease: computeLatestRelease(action.payload),
            };
        }
        case githubTypes.GET_LATEST_RELEASE_REJECTED:
            return {
                ...state,
                isGetLatestReleasePending: false,
                latestRelease: CURRENT_GITHUB_RELEASE,
            };

        default:
            return state;
    }
}

export default githubReducer;
