import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllUsersHeaderComponent from './AllUsersHeaderComponent';

interface AllUsersHeaderProps {
    refreshPageContent: () => void;
}

const AllUsersHeader = ({ refreshPageContent }: AllUsersHeaderProps) => {
    // Map State To Props
    const { isGetAllUsersPending, users } = useSelector((store: ReduxStore) => {
        return {
            isGetAllUsersPending: store.userReducer.isGetAllUsersPending,
            users: store.userReducer.users,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateUser } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.CREATE_USER,
            },
        ],
    });

    return (
        <AllUsersHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllUsersPending}
            usersLength={users.length}
            isAuthorizedCreateUser={isAuthorizedCreateUser}
        />
    );
};

export default AllUsersHeader;
