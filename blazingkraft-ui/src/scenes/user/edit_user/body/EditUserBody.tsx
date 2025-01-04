import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import userActions, { UserEditRequest } from 'scenes/user/redux/actions';
import EditUserBodyComponent from './EditUserBodyComponent';

const EditUserBody = () => {
    // Map State To Props
    const {
        userDetails,
        isGetUserDetailsPending,
        isEditUserPending,
        groups,
        isGetAllGroupsPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isEditUserPending: store.userReducer.isEditUserPending,
            isGetUserDetailsPending: store.userReducer.isGetUserDetailsPending,
            userDetails: store.userReducer.userDetails,
            groups: store.groupReducer.groups,
            isGetAllGroupsPending: store.groupReducer.isGetAllGroupsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { userEmail } = useParams();

    const editUser = (request: UserEditRequest) =>
        dispatch(userActions.editUser(userEmail, request)).then(() => {
            navigate(`/management/users/${request.email}/details`);
        });

    return (
        <>
            {CommonValidationUtils.isTruthy(userDetails) && (
                <EditUserBodyComponent
                    groups={groups}
                    isGetAllGroupsPending={isGetAllGroupsPending}
                    userDetails={userDetails}
                    editUser={editUser}
                />
            )}
            <LoadingSpinner
                isLoading={isEditUserPending || isGetUserDetailsPending}
            />
        </>
    );
};

export default EditUserBody;
