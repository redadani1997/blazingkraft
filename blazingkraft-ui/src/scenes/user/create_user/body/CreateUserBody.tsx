import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import userActions, { UserCreateRequest } from 'scenes/user/redux/actions';
import CreateUserBodyComponent from './CreateUserBodyComponent';

const CreateUserBody = () => {
    // Map State To Props
    const { isCreateUserPending, isGetAllGroupsPending, groups } = useSelector(
        (store: ReduxStore) => {
            return {
                isCreateUserPending: store.userReducer.isCreateUserPending,
                isGetAllGroupsPending: store.groupReducer.isGetAllGroupsPending,
                groups: store.groupReducer.groups,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const createUser = (request: UserCreateRequest) =>
        dispatch(userActions.createUser(request)).then(() =>
            navigate(`/management/users/${request.email}/details`),
        );

    return (
        <>
            <CreateUserBodyComponent
                createUser={createUser}
                isGetAllGroupsPending={isGetAllGroupsPending}
                groups={groups}
            />
            <LoadingSpinner isLoading={isCreateUserPending} />
        </>
    );
};

export default CreateUserBody;
