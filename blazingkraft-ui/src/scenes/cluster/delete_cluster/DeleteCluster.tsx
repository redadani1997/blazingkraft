import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from '../redux/actions';
import DeleteClusterComponent from './DeleteClusterComponent';

interface DeleteClusterProps {
    clusterToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteCluster = ({
    clusterToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteClusterProps) => {
    // Map State To Props
    const { isDeleteClusterPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteClusterPending: store.clusterReducer.isDeleteClusterPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteCluster = () =>
        dispatch(clusterActions.deleteCluster(clusterToDelete)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteClusterComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteCluster={deleteCluster}
                isDeleteClusterPending={isDeleteClusterPending}
                clusterToDelete={clusterToDelete}
            />
        </>
    );
};

export default DeleteCluster;
