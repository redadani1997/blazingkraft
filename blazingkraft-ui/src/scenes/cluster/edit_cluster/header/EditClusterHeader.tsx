import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditClusterHeaderComponent from './EditClusterHeaderComponent';

interface EditClusterHeaderProps {
    refreshPageContent: () => void;
}

const EditClusterHeader = ({ refreshPageContent }: EditClusterHeaderProps) => {
    // Map State To Props
    const { isGetClusterDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetClusterDetailsPending:
                store.clusterReducer.isGetClusterDetailsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <EditClusterHeaderComponent
            isRefreshPageContentPending={isGetClusterDetailsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditClusterHeader;
