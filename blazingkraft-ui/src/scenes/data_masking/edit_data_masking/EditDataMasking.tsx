import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { IDataMasking } from '../redux';
import dataMaskingActions, { IDataMaskingRequest } from '../redux/actions';
import EditDataMaskingComponent from './EditDataMaskingComponent';

interface EditDataMaskingProps {
    dataMaskingToEdit: IDataMasking;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const EditDataMasking = ({
    dataMaskingToEdit,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: EditDataMaskingProps) => {
    // Map State To Props
    const { isEditDataMaskingPending } = useSelector((store: ReduxStore) => {
        return {
            isEditDataMaskingPending:
                store.dataMaskingReducer.isEditDataMaskingPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const editDataMasking = (request: IDataMaskingRequest): Promise<any> =>
        dispatch(
            dataMaskingActions.editDataMasking(
                dataMaskingToEdit?.code,
                request,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <EditDataMaskingComponent
                dataMaskingToEdit={dataMaskingToEdit}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editDataMasking={editDataMasking}
                isEditDataMaskingPending={isEditDataMaskingPending}
            />
        </>
    );
};

export default EditDataMasking;
