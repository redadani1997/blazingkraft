import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import ServerPermissionsDetailsBodyComponent from './ServerPermissionsDetailsBodyComponent';

const ServerPermissionsDetailsBody = () => {
    // Map State To Props
    const { serverPermissions, isGetServerPermissionsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetServerPermissionsPending:
                    store.serverPermissionsReducer
                        .isGetServerPermissionsPending,
                serverPermissions: store.settingsReducer.serverPermissions,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    return (
        <>
            {CommonValidationUtils.isTruthy(serverPermissions) && (
                <ServerPermissionsDetailsBodyComponent
                    serverPermissions={serverPermissions}
                />
            )}
            <LoadingSpinner isLoading={isGetServerPermissionsPending} />
        </>
    );
};

export default ServerPermissionsDetailsBody;
