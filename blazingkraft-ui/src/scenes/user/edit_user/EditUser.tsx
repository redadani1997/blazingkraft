import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import userActions from '../redux/actions';
import EditUserComponent from './EditUserComponent';

const EditUser = () => {
    useDocumentTitle('Blazing KRaft - Edit User');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { userEmail } = useParams();

    const refreshPageContent = () =>
        dispatch(userActions.getUserDetails(userEmail));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <EditUserComponent refreshPageContent={refreshPageContent} />;
};

export default EditUser;
