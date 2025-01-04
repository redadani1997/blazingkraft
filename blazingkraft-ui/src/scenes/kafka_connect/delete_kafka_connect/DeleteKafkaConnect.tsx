import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import kafkaConnectActions from '../redux/actions';
import DeleteKafkaConnectComponent from './DeleteKafkaConnectComponent';

interface DeleteKafkaConnectProps {
    kafkaConnectToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteKafkaConnect = ({
    kafkaConnectToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteKafkaConnectProps) => {
    // Map State To Props
    const { isDeleteKafkaConnectPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteKafkaConnectPending:
                store.kafkaConnectReducer.isDeleteKafkaConnectPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteKafkaConnect = () =>
        dispatch(
            kafkaConnectActions.deleteKafkaConnect(kafkaConnectToDelete),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteKafkaConnectComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteKafkaConnect={deleteKafkaConnect}
                isDeleteKafkaConnectPending={isDeleteKafkaConnectPending}
                kafkaConnectToDelete={kafkaConnectToDelete}
            />
        </>
    );
};

export default DeleteKafkaConnect;
