import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UserDetailsHeaderComponent from './UserDetailsHeaderComponent';

interface UserDetailsHeaderProps {
    refreshPageContent: () => void;
}

const UserDetailsHeader = ({ refreshPageContent }: UserDetailsHeaderProps) => {
    // Map State To Props
    const { isGetUserDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetUserDetailsPending: store.userReducer.isGetUserDetailsPending,
            userDetails: store.userReducer.userDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedEditUser } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.EDIT_USER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditUserPassword } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.EDIT_USER_PASSWORD,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditUserPasswordWithoutCurrent } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        UserPermissions.USER_PERMISSIONS
                            .EDIT_USER_PASSWORD_WITHOUT_CURRENT,
                },
            ],
        });
    const { isAuthorized: isAuthorizedDeleteUser } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.DELETE_USER,
            },
        ],
    });

    return (
        <UserDetailsHeaderComponent
            isRefreshPageContentPending={isGetUserDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedEditUser={isAuthorizedEditUser}
            isAuthorizedEditUserPassword={isAuthorizedEditUserPassword}
            isAuthorizedEditUserPasswordWithoutCurrent={
                isAuthorizedEditUserPasswordWithoutCurrent
            }
            isAuthorizedDeleteUser={isAuthorizedDeleteUser}
        />
    );
};

export default UserDetailsHeader;
