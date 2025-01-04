import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditServerPermissionsHeaderComponent from './EditServerPermissionsHeaderComponent';

interface EditServerPermissionsHeaderProps {
    refreshPageContent: () => void;
}

const EditServerPermissionsHeader = ({
    refreshPageContent,
}: EditServerPermissionsHeaderProps) => {
    // Map State To Props
    const { isGetServerPermissionsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetServerPermissionsPending:
                    store.serverPermissionsReducer
                        .isGetServerPermissionsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <EditServerPermissionsHeaderComponent
            isRefreshPageContentPending={isGetServerPermissionsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditServerPermissionsHeader;
