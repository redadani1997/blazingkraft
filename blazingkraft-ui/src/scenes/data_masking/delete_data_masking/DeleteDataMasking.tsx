import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import dataMaskingActions from '../redux/actions';
import DeleteDataMaskingComponent from './DeleteDataMaskingComponent';

interface DeleteDataMaskingProps {
    dataMaskingToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteDataMasking = ({
    dataMaskingToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteDataMaskingProps) => {
    // Map State To Props
    const { isDeleteDataMaskingPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteDataMaskingPending:
                store.dataMaskingReducer.isDeleteDataMaskingPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteDataMasking = () =>
        dispatch(
            dataMaskingActions.deleteDataMasking(dataMaskingToDelete),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteDataMaskingComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteDataMasking={deleteDataMasking}
                isDeleteDataMaskingPending={isDeleteDataMaskingPending}
                dataMaskingToDelete={dataMaskingToDelete}
            />
        </>
    );
};

export default DeleteDataMasking;
