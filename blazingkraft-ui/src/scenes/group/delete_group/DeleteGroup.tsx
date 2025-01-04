import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import groupActions from '../redux/actions';
import DeleteGroupComponent from './DeleteGroupComponent';

export interface IGroupToDelete {
    code: string;
    name: string;
    description: string;
    numberOfUsers: number;
}

interface DeleteGroupProps {
    groupToDelete: IGroupToDelete;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteGroup = ({
    groupToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteGroupProps) => {
    // Map State To Props
    const { isDeleteGroupPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteGroupPending: store.groupReducer.isDeleteGroupPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteGroup = (deleteUsers: boolean) =>
        dispatch(
            deleteUsers
                ? groupActions.deleteGroupWithUsers(
                      groupToDelete?.code,
                      groupToDelete?.name,
                  )
                : groupActions.deleteGroup(
                      groupToDelete?.code,
                      groupToDelete?.name,
                  ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    // Authorization
    const { isAuthorized: isAuthorizedDeleteGroupWithUsers } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        GroupPermissions.GROUP_PERMISSIONS
                            .DELETE_GROUP_WITH_USERS,
                },
            ],
        },
    );

    return (
        <>
            <DeleteGroupComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteGroup={deleteGroup}
                isDeleteGroupPending={isDeleteGroupPending}
                groupToDelete={groupToDelete}
                isAuthorizedDeleteGroupWithUsers={
                    isAuthorizedDeleteGroupWithUsers
                }
            />
        </>
    );
};

export default DeleteGroup;
