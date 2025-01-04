import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import groupActions, { GroupRequest } from 'scenes/group/redux/actions';
import CreateGroupBodyComponent from './CreateGroupBodyComponent';

const CreateGroupBody = () => {
    // Map State To Props
    const { isCreateGroupPending, isGetConfigurationPending, features } =
        useSelector((store: ReduxStore) => {
            return {
                isCreateGroupPending: store.groupReducer.isCreateGroupPending,
                features: store.settingsReducer.features,
                isGetConfigurationPending:
                    store.settingsReducer.isGetConfigurationPending,
            };
        }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const createGroup = (request: GroupRequest) =>
        dispatch(groupActions.createGroup(request)).then(() =>
            navigate(`/management/groups/${request.code}/details`),
        );

    return (
        <>
            <CreateGroupBodyComponent
                createGroup={createGroup}
                isCreateGroupPending={isCreateGroupPending}
                features={features}
            />
            <LoadingSpinner
                isLoading={isCreateGroupPending || isGetConfigurationPending}
            />
        </>
    );
};

export default CreateGroupBody;
