import routeTypes from './types';

function setActiveLink(state) {
    return {
        type: routeTypes.SET_ACTIVE_LINK,
        payload: state,
    };
}

const routeActions = {
    setActiveLink,
};

export default routeActions;
