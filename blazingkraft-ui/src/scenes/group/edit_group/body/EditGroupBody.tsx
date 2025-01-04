import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import groupActions, { GroupRequest } from 'scenes/group/redux/actions';
import EditGroupBodyComponent from './EditGroupBodyComponent';

const EditGroupBody = () => {
    // Map State To Props
    const {
        isEditGroupPending,
        isGetConfigurationPending,
        isGetGroupDetailsPending,
        groupDetails,
    } = useSelector((store: ReduxStore) => {
        return {
            isEditGroupPending: store.groupReducer.isEditGroupPending,
            groupDetails: store.groupReducer.groupDetails,
            isGetGroupDetailsPending:
                store.groupReducer.isGetGroupDetailsPending,
            isGetConfigurationPending:
                store.settingsReducer.isGetConfigurationPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { groupCode } = useParams();

    const editGroup = (request: GroupRequest) =>
        dispatch(groupActions.editGroup(groupCode, request)).then(() =>
            navigate(`/management/groups/${request.code}/details`),
        );

    return (
        <>
            {CommonValidationUtils.isTruthy(groupDetails) && (
                <EditGroupBodyComponent
                    editGroup={editGroup}
                    groupDetails={groupDetails}
                />
            )}
            <LoadingSpinner
                isLoading={
                    isEditGroupPending ||
                    isGetConfigurationPending ||
                    isGetGroupDetailsPending
                }
            />
        </>
    );
};

export default EditGroupBody;
