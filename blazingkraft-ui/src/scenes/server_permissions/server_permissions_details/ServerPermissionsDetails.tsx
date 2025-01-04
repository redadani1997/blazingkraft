import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import serverPermissionsActions from '../redux/actions';
import ServerPermissionsDetailsComponent from './ServerPermissionsDetailsComponent';

const ServerPermissionsDetails = () => {
    useDocumentTitle('Blazing KRaft - Server Permissions');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () =>
        dispatch(serverPermissionsActions.getServerPermissions());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <ServerPermissionsDetailsComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default ServerPermissionsDetails;
