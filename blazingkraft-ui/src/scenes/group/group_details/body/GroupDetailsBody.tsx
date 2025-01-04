import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import GroupDetailsBodyComponent from './GroupDetailsBodyComponent';

const GroupDetailsBody = () => {
    // Map State To Props
    const { groupDetails, isGetGroupDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetGroupDetailsPending:
                    store.groupReducer.isGetGroupDetailsPending,
                groupDetails: store.groupReducer.groupDetails,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <>
            {CommonValidationUtils.isTruthy(groupDetails) && (
                <GroupDetailsBodyComponent groupDetails={groupDetails} />
            )}
            <LoadingSpinner isLoading={isGetGroupDetailsPending} />
        </>
    );
};

export default GroupDetailsBody;
