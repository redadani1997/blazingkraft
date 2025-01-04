import { notifySuccess } from 'common/notifications/Notifications';
import schemaRegistryTypes from 'scenes/schema_registry/redux/types';

function handle(action): boolean {
    switch (action.type) {
        case schemaRegistryTypes.CREATE_SCHEMA_REGISTRY_FULFILLED: {
            const { context, schemaRegistryCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Schema Registry '${schemaRegistryCode}' created Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.EDIT_SCHEMA_REGISTRY_FULFILLED: {
            const { context, schemaRegistryCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Schema Registry '${schemaRegistryCode}' edited Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.DELETE_SCHEMA_REGISTRY_FULFILLED: {
            const { context, schemaRegistryCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Schema Registry '${schemaRegistryCode}' deleted Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.CREATE_SUBJECT_FULFILLED: {
            const { context, subject } = action.meta;
            notifySuccess({
                title: context,
                message: `Subject ${subject} created Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.CREATE_SUBJECT_VERSION_FULFILLED: {
            const { context, subject } = action.meta;
            notifySuccess({
                title: context,
                message: `New Version for Subject ${subject} created Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.DELETE_SUBJECT_FULFILLED: {
            const { context, subject } = action.meta;
            notifySuccess({
                title: context,
                message: `Subject ${subject} Deleted Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.UPDATE_SUBJECT_COMPATIBILITY_FULFILLED: {
            const { context, subject } = action.meta;
            notifySuccess({
                title: context,
                message: `Subject ${subject} Compatibility Updated Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY_FULFILLED: {
            const { context, schemaRegistryCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Schema Registry ${schemaRegistryCode} Compatibility Updated Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.UPDATE_SUBJECT_MODE_FULFILLED: {
            const { context, subject } = action.meta;
            notifySuccess({
                title: context,
                message: `Subject ${subject} Mode Updated Successfully.`,
            });
            return true;
        }
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_MODE_FULFILLED: {
            const { context, schemaRegistryCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Schema Registry ${schemaRegistryCode} Mode Updated Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsSchemaRegistryHandler = {
    handle,
};

export { AlertsSchemaRegistryHandler };
