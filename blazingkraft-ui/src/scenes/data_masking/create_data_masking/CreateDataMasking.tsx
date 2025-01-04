import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import dataMaskingActions, { IDataMaskingRequest } from '../redux/actions';
import CreateDataMaskingComponent from './CreateDataMaskingComponent';

interface CreateDataMaskingProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const CreateDataMasking = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: CreateDataMaskingProps) => {
    // Map State To Props
    const { isCreateDataMaskingPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateDataMaskingPending:
                store.dataMaskingReducer.isCreateDataMaskingPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const createDataMasking = (request: IDataMaskingRequest): Promise<any> =>
        dispatch(dataMaskingActions.createDataMasking(request)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <CreateDataMaskingComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                createDataMasking={createDataMasking}
                isCreateDataMaskingPending={isCreateDataMaskingPending}
            />
        </>
    );
};

export default CreateDataMasking;
