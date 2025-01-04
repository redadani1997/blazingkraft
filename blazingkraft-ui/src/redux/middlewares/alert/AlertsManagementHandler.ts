import { notifySuccess } from 'common/notifications/Notifications';
import dataMaskingTypes from 'scenes/data_masking/redux/types';
import filesTypes from 'scenes/files/redux/types';
import groupTypes from 'scenes/group/redux/types';
import OIDCProviderTypes from 'scenes/oidc_provider/redux/types';
import userTypes from 'scenes/user/redux/types';

function handle(action): boolean {
    switch (action.type) {
        // OIDC Provider
        case OIDCProviderTypes.CREATE_OIDC_PROVIDER_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `OpenID Connect Provider '${name}' was created Successfully.`,
            });
            return true;
        }
        case OIDCProviderTypes.EDIT_OIDC_PROVIDER_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `OpenID Connect Provider '${name}' was edited Successfully.`,
            });
            return true;
        }
        case OIDCProviderTypes.DELETE_OIDC_PROVIDER_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `OpenID Connect Provider '${name}' was deleted Successfully.`,
            });
            return true;
        }

        // Group
        case groupTypes.CREATE_GROUP_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Group '${name}' was created Successfully.`,
            });
            return true;
        }
        case groupTypes.EDIT_GROUP_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Group '${name}' was edited Successfully.`,
            });
            return true;
        }
        case groupTypes.DELETE_GROUP_FULFILLED: {
            const { context, name } = action.meta;
            notifySuccess({
                title: context,
                message: `Group '${name}' was deleted Successfully.`,
            });
            return true;
        }

        // USERS
        case userTypes.CREATE_USER_FULFILLED: {
            const { context, email } = action.meta;
            notifySuccess({
                title: context,
                message: `User '${email}' was created Successfully.`,
            });
            return true;
        }
        case userTypes.EDIT_USER_FULFILLED: {
            const { context, email } = action.meta;
            notifySuccess({
                title: context,
                message: `User '${email}' was edited Successfully.`,
            });
            return true;
        }
        case userTypes.DELETE_USER_FULFILLED: {
            const { context, email } = action.meta;
            notifySuccess({
                title: context,
                message: `User '${email}' was deleted Successfully.`,
            });
            return true;
        }
        case userTypes.EDIT_USER_PASSWORD_FULFILLED: {
            const { context, email } = action.meta;
            notifySuccess({
                title: context,
                message: `User '${email}' password was edited Successfully.`,
            });
            return true;
        }
        case userTypes.EDIT_USER_PASSWORD_WITHOUT_CURRENT_FULFILLED: {
            const { context, email } = action.meta;
            notifySuccess({
                title: context,
                message: `User '${email}' password was edited Successfully.`,
            });
            return true;
        }

        // Files
        case filesTypes.CREATE_FILE_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `File uploaded Successfully.`,
            });
            return true;
        }
        case filesTypes.DELETE_FILE_FULFILLED: {
            const { context, path } = action.meta;
            notifySuccess({
                title: context,
                message: `File '${path}' deleted Successfully.`,
            });
            return true;
        }

        // Data Masking
        case dataMaskingTypes.CREATE_DATA_MASKING_FULFILLED: {
            const { context, dataMaskingCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Data Masking Rule '${dataMaskingCode}' Created Successfully.`,
            });
            return true;
        }
        case dataMaskingTypes.EDIT_DATA_MASKING_FULFILLED: {
            const { context, dataMaskingCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Data Masking Rule '${dataMaskingCode}' Edited Successfully.`,
            });
            return true;
        }
        case dataMaskingTypes.DELETE_DATA_MASKING_FULFILLED: {
            const { context, dataMaskingCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Data Masking Rule '${dataMaskingCode}' Deleted Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsManagementHandler = {
    handle,
};

export { AlertsManagementHandler };
