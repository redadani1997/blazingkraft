import { ReduxAction } from 'redux_config/.';
import { RouteReducerState } from '.';
import clusterTypes from './types';

const initialState: RouteReducerState = {
    activeLink: {
        id: null,
        type: null,
        code: null,
    },
};

function routeReducer(
    state = initialState,
    action: ReduxAction,
): RouteReducerState {
    switch (action.type) {
        // SET_ACTIVE_LINK
        case clusterTypes.SET_ACTIVE_LINK:
            return {
                ...state,
                activeLink: action.payload,
            };

        default:
            return state;
    }
}

export default routeReducer;
