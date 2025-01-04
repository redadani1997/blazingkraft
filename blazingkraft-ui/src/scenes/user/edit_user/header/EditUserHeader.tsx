import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditUserHeaderComponent from './EditUserHeaderComponent';

interface EditUserHeaderProps {
    refreshPageContent: () => void;
}

const EditUserHeader = ({ refreshPageContent }: EditUserHeaderProps) => {
    // Map State To Props
    const { isEditUserPending, isGetAllGroupsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isEditUserPending: store.userReducer.isEditUserPending,
                isGetAllGroupsPending: store.groupReducer.isGetAllGroupsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <EditUserHeaderComponent
            isRefreshPageContentPending={
                isEditUserPending || isGetAllGroupsPending
            }
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditUserHeader;
