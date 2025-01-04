import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import serverPermissionsActions, {
    ServerPermissionsRequest,
} from 'scenes/server_permissions/redux/actions';
import EditServerPermissionsBodyComponent from './EditServerPermissionsBodyComponent';

const EditServerPermissionsBody = () => {
    // Map State To Props
    const {
        serverPermissions,
        isGetServerPermissionsPending,
        isEditServerPermissionsPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetServerPermissionsPending:
                store.serverPermissionsReducer.isGetServerPermissionsPending,
            isEditServerPermissionsPending:
                store.serverPermissionsReducer.isEditServerPermissionsPending,
            serverPermissions: store.settingsReducer.serverPermissions,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const editServerPermissions = (
        serverPermissions: ServerPermissionsRequest,
    ) =>
        dispatch(
            serverPermissionsActions.editServerPermissions(serverPermissions),
        ).then(() => {
            navigate('/management/server_permissions');
        });

    return (
        <>
            {CommonValidationUtils.isTruthy(serverPermissions) && (
                <EditServerPermissionsBodyComponent
                    serverPermissions={serverPermissions}
                    editServerPermissions={editServerPermissions}
                />
            )}
            <LoadingSpinner
                isLoading={
                    isGetServerPermissionsPending ||
                    isEditServerPermissionsPending
                }
            />
        </>
    );
};

export default EditServerPermissionsBody;
