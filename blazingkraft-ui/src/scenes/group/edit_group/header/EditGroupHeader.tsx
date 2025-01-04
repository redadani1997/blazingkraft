import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditGroupHeaderComponent from './EditGroupHeaderComponent';

interface EditGroupHeaderProps {
    refreshPageContent: () => void;
}

const EditGroupHeader = ({ refreshPageContent }: EditGroupHeaderProps) => {
    // Map State To Props
    const { isGetGroupDetailsPending, isEditGroupPending, groupDetails } =
        useSelector((store: ReduxStore) => {
            return {
                isGetGroupDetailsPending:
                    store.groupReducer.isGetGroupDetailsPending,
                isEditGroupPending: store.groupReducer.isEditGroupPending,
                groupDetails: store.groupReducer.groupDetails,
            };
        }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <EditGroupHeaderComponent
            groupDetails={groupDetails}
            isRefreshPageContentPending={
                isGetGroupDetailsPending || isEditGroupPending
            }
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditGroupHeader;
