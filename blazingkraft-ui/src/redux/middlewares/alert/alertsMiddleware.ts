import { notifyError } from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { AlertsClusterHandler } from './AlertsClusterHandler';
import { AlertsDefaultHandler } from './AlertsDefaultHandler';
import { AlertsKafkaConnectHandler } from './AlertsKafkaConnectHandler';
import { AlertsKsqlDbHandler } from './AlertsKsqlDbHandler';
import { AlertsManagementHandler } from './AlertsManagementHandler';
import { AlertsSchemaRegistryHandler } from './AlertsSchemaRegistryHandler';

function handleFulfilledActions(action, dispatch) {
    if (AlertsClusterHandler.handle(action)) {
        return;
    }
    if (AlertsKafkaConnectHandler.handle(action)) {
        return;
    }
    if (AlertsManagementHandler.handle(action)) {
        return;
    }
    if (AlertsKsqlDbHandler.handle(action)) {
        return;
    }
    if (AlertsSchemaRegistryHandler.handle(action)) {
        return;
    }
    if (AlertsDefaultHandler.handle(action)) {
        return;
    }
}

function handleRejectedActions(action, _) {
    const errorMessage = CommonUtils.getRestErrorMessage(action.payload);
    const errorContext = action.meta?.context;
    const ignoreNotification = action.meta?.ignoreNotification;
    if (errorContext && !ignoreNotification) {
        notifyError({ title: errorContext, message: errorMessage });
    }
}

function alertsMiddleware({ dispatch }) {
    return next => action => {
        if (action.type.endsWith('_REJECTED')) {
            handleRejectedActions(action, dispatch);
        }
        if (action.type.endsWith('_FULFILLED')) {
            handleFulfilledActions(action, dispatch);
        }

        return next(action);
    };
}

export default alertsMiddleware;
