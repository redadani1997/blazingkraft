import { notifySuccess } from 'common/notifications/Notifications';
import ksqlDbTypes from 'scenes/ksqldb/redux/types';
import ksqlDbEcosystemTypes from 'scenes/ksqldb_ecosystem/redux/types';

function handle(action): boolean {
    switch (action.type) {
        case ksqlDbTypes.CREATE_KSQLDB_FULFILLED: {
            const { context, ksqlDbCode } = action.meta;
            notifySuccess({
                title: context,
                message: `KsqlDb '${ksqlDbCode}' created Successfully.`,
            });
            return true;
        }
        case ksqlDbTypes.EDIT_KSQLDB_FULFILLED: {
            const { context, ksqlDbCode } = action.meta;
            notifySuccess({
                title: context,
                message: `KsqlDb '${ksqlDbCode}' edited Successfully.`,
            });
            return true;
        }
        case ksqlDbTypes.DELETE_KSQLDB_FULFILLED: {
            const { context, ksqlDbCode } = action.meta;
            notifySuccess({
                title: context,
                message: `KsqlDb '${ksqlDbCode}' deleted Successfully.`,
            });
            return true;
        }
        case ksqlDbEcosystemTypes.CREATE_KSQLDB_CONNECTOR_FULFILLED: {
            const { context, connectorName } = action.meta;
            notifySuccess({
                title: context,
                message: `KsqlDb Connector '${connectorName}' created Successfully.`,
            });
            return true;
        }
        case ksqlDbEcosystemTypes.DELETE_KSQLDB_CONNECTOR_FULFILLED: {
            const { context, connectorName } = action.meta;
            notifySuccess({
                title: context,
                message: `KsqlDb Connector '${connectorName}' deleted Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsKsqlDbHandler = {
    handle,
};

export { AlertsKsqlDbHandler };
