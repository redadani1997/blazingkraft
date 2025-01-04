import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import userActions from '../redux/actions';
import EditUserPasswordComponent from './EditUserPasswordComponent';

interface EditUserPasswordProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const EditUserPassword = ({
    isModalOpen,
    setIsModalOpen,
}: EditUserPasswordProps) => {
    // Map State To Props
    const { isEditUserPasswordPending } = useSelector((store: ReduxStore) => {
        return {
            isEditUserPasswordPending:
                store.userReducer.isEditUserPasswordPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { userEmail } = useParams();

    const editUserPassword = (currentPassword, password, passwordConfirm) =>
        dispatch(
            userActions.editUserPassword(
                userEmail,
                currentPassword,
                password,
                passwordConfirm,
            ),
        ).then(() => {
            setIsModalOpen(false);
        });

    return (
        <>
            <EditUserPasswordComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editUserPassword={editUserPassword}
                isEditUserPasswordPending={isEditUserPasswordPending}
            />
        </>
    );
};

export default EditUserPassword;
