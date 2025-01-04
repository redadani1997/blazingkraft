import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ksqlDbActions from '../redux/actions';
import DeleteKsqlDbComponent from './DeleteKsqlDbComponent';

interface DeleteKsqlDbProps {
    ksqlDbToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteKsqlDb = ({
    ksqlDbToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteKsqlDbProps) => {
    // Map State To Props
    const { isDeleteKsqlDbPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteKsqlDbPending: store.ksqlDbReducer.isDeleteKsqlDbPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteKsqlDb = () =>
        dispatch(ksqlDbActions.deleteKsqlDb(ksqlDbToDelete)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteKsqlDbComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteKsqlDb={deleteKsqlDb}
                isDeleteKsqlDbPending={isDeleteKsqlDbPending}
                ksqlDbToDelete={ksqlDbToDelete}
            />
        </>
    );
};

export default DeleteKsqlDb;
