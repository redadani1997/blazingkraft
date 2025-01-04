import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import clusterActions from '../redux/actions';
import ExportClusterComponent from './ExportClusterComponent';

interface ExportClusterProps {
    clusterToExport: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const ExportCluster = ({
    clusterToExport,
    isModalOpen,
    setIsModalOpen,
}: ExportClusterProps) => {
    // Map State To Props
    const { isExportClusterPending } = useSelector((store: ReduxStore) => {
        return {
            isExportClusterPending: store.clusterReducer.isExportClusterPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const exportCluster = () =>
        dispatch(clusterActions.exportCluster(clusterToExport)).then(() => {
            setIsModalOpen(false);
        });

    return (
        <>
            <ExportClusterComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                exportCluster={exportCluster}
                isExportClusterPending={isExportClusterPending}
                clusterToExport={clusterToExport}
            />
        </>
    );
};

export default ExportCluster;
