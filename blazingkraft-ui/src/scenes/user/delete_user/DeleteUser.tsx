import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import userActions from '../redux/actions';
import DeleteUserComponent from './DeleteUserComponent';

interface DeleteUserProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    userToDelete: string;
    onSuccess: () => void;
}

const DeleteUser = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
    userToDelete,
}: DeleteUserProps) => {
    // Map State To Props
    const { isDeleteUserPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteUserPending: store.userReducer.isDeleteUserPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteUser = () =>
        dispatch(userActions.deleteUser(userToDelete)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteUserComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteUser={deleteUser}
                isDeleteUserPending={isDeleteUserPending}
                userEmail={userToDelete}
            />
        </>
    );
};

export default DeleteUser;
