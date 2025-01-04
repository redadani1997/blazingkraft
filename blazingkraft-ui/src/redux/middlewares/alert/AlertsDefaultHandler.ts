import { notifySuccess } from 'common/notifications/Notifications';
import loginTypes from 'scenes/login/redux/types';

function handle(action): boolean {
    switch (action.type) {
        case loginTypes.LOGIN_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Successfully logged in`,
            });
            return;
        }

        default:
            return false;
    }
}

const AlertsDefaultHandler = {
    handle,
};

export { AlertsDefaultHandler };
