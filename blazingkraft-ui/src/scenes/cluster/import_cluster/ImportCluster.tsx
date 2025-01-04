import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from '../redux/actions';
import ImportClusterComponent from './ImportClusterComponent';

interface ImportClusterProps {
    isModalOpen: boolean;
    setIsModalOpen: (boolean) => void;
    onSuccess: () => void;
}

const ImportCluster = ({
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: ImportClusterProps) => {
    // Map State To Props
    const { isImportClusterPending } = useSelector((store: ReduxStore) => {
        return {
            isImportClusterPending: store.clusterReducer.isImportClusterPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const importCluster = zipFile =>
        dispatch(clusterActions.importCluster(zipFile)).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <ImportClusterComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                importCluster={importCluster}
                isImportClusterPending={isImportClusterPending}
            />
        </>
    );
};

export default ImportCluster;
