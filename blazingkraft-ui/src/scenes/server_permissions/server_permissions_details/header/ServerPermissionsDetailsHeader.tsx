import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import ServerPermissionsDetailsHeaderComponent from './ServerPermissionsDetailsHeaderComponent';

interface ServerPermissionsDetailsHeaderProps {
    refreshPageContent: () => void;
}

const ServerPermissionsDetailsHeader = ({
    refreshPageContent,
}: ServerPermissionsDetailsHeaderProps) => {
    // Map State To Props
    const { isGetServerPermissionsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetServerPermissionsPending:
                    store.serverPermissionsReducer
                        .isGetServerPermissionsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedEditServerPermissions } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ServerPermissions.SERVER_PERMISSIONS
                            .EDIT_SERVER_PERMISSIONS,
                },
            ],
        });

    return (
        <ServerPermissionsDetailsHeaderComponent
            isRefreshPageContentPending={isGetServerPermissionsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedEditServerPermissions={
                isAuthorizedEditServerPermissions
            }
        />
    );
};

export default ServerPermissionsDetailsHeader;
