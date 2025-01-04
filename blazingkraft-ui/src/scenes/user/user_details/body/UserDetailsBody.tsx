import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import UserDetailsBodyComponent from './UserDetailsBodyComponent';

const UserDetailsBody = () => {
    // Map State To Props
    const { userDetails, isGetUserDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetUserDetailsPending:
                    store.userReducer.isGetUserDetailsPending,
                userDetails: store.userReducer.userDetails,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <>
            {CommonValidationUtils.isTruthy(userDetails) && (
                <UserDetailsBodyComponent userDetails={userDetails} />
            )}
            <LoadingSpinner isLoading={isGetUserDetailsPending} />
        </>
    );
};

export default UserDetailsBody;
