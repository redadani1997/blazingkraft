import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import userActions from '../redux/actions';
import EditUserPasswordWithoutCurrentComponent from './EditUserPasswordWithoutCurrentComponent';

interface EditUserPasswordWithoutCurrentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const EditUserPasswordWithoutCurrent = ({
    isModalOpen,
    setIsModalOpen,
}: EditUserPasswordWithoutCurrentProps) => {
    // Map State To Props
    const { isEditUserPasswordWithoutCurrentPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isEditUserPasswordWithoutCurrentPending:
                    store.userReducer.isEditUserPasswordWithoutCurrentPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { userEmail } = useParams();

    const editUserPasswordWithoutCurrent = (password, passwordConfirm) =>
        dispatch(
            userActions.editUserPasswordWithoutCurrent(
                userEmail,
                password,
                passwordConfirm,
            ),
        ).then(() => {
            setIsModalOpen(false);
        });

    return (
        <>
            <EditUserPasswordWithoutCurrentComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editUserPasswordWithoutCurrent={editUserPasswordWithoutCurrent}
                isEditUserPasswordWithoutCurrentPending={
                    isEditUserPasswordWithoutCurrentPending
                }
            />
        </>
    );
};

export default EditUserPasswordWithoutCurrent;
