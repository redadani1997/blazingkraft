import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import serverPermissionsActions from '../redux/actions';
import EditServerPermissionsComponent from './EditServerPermissionsComponent';

const EditServerPermissions = () => {
    useDocumentTitle('Blazing KRaft - Edit Server Permissions');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () =>
        dispatch(serverPermissionsActions.getServerPermissions());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <EditServerPermissionsComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditServerPermissions;
