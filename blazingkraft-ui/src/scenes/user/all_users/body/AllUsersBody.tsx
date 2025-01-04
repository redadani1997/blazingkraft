import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllUsersBodyComponent from './AllUsersBodyComponent';

interface AllUsersBodyProps {
    setIsDeleteUserModalOpen: (isModalOpen: boolean) => void;
    setUserToDelete: (userEmail: string) => void;
}

const AllUsersBody = ({
    setIsDeleteUserModalOpen,
    setUserToDelete,
}: AllUsersBodyProps) => {
    // Map State To Props
    const { users, isGetAllUsersPending } = useSelector((store: ReduxStore) => {
        return {
            isGetAllUsersPending: store.userReducer.isGetAllUsersPending,
            users: store.userReducer.users,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDeleteUser } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.DELETE_USER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditUser } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: UserPermissions.USER_PERMISSIONS.EDIT_USER,
            },
        ],
    });

    return (
        <AllUsersBodyComponent
            setUserToDelete={setUserToDelete}
            setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
            isGetAllUsersPending={isGetAllUsersPending}
            users={users}
            isAuthorizedEditUser={isAuthorizedEditUser}
            isAuthorizedDeleteUser={isAuthorizedDeleteUser}
        />
    );
};

export default AllUsersBody;
