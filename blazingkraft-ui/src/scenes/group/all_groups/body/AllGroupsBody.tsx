import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { IGroupToDelete } from 'scenes/group/delete_group/DeleteGroup';
import AllGroupsBodyComponent from './AllGroupsBodyComponent';

interface AllGroupsBodyProps {
    setIsDeleteGroupModalOpen: (isDeleteGroupModalOpen: boolean) => void;
    setGroupToDelete: (groupToDelete: IGroupToDelete) => void;
}

const AllGroupsBody = ({
    setIsDeleteGroupModalOpen,
    setGroupToDelete,
}: AllGroupsBodyProps) => {
    // Map State To Props
    const { groups, isGetAllGroupsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllGroupsPending: store.groupReducer.isGetAllGroupsPending,
                groups: store.groupReducer.groups,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDeleteGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: GroupPermissions.GROUP_PERMISSIONS.DELETE_GROUP,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: GroupPermissions.GROUP_PERMISSIONS.EDIT_GROUP,
            },
        ],
    });

    return (
        <AllGroupsBodyComponent
            isAuthorizedDeleteGroup={isAuthorizedDeleteGroup}
            isAuthorizedEditGroup={isAuthorizedEditGroup}
            setIsDeleteGroupModalOpen={setIsDeleteGroupModalOpen}
            setGroupToDelete={setGroupToDelete}
            isGetAllGroupsPending={isGetAllGroupsPending}
            groups={groups}
        />
    );
};

export default AllGroupsBody;
