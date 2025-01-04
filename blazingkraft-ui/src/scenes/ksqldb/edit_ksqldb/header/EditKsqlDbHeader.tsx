import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditKsqlDbHeaderComponent from './EditKsqlDbHeaderComponent';

interface EditKsqlDbHeaderProps {
    refreshPageContent: () => void;
}

const EditKsqlDbHeader = ({ refreshPageContent }: EditKsqlDbHeaderProps) => {
    // Map State To Props
    const { isGetKsqlDbDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetKsqlDbDetailsPending:
                store.ksqlDbReducer.isGetKsqlDbDetailsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <EditKsqlDbHeaderComponent
            isRefreshPageContentPending={isGetKsqlDbDetailsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditKsqlDbHeader;
