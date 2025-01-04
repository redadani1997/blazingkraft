import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import userActions from '../redux/actions';
import UserDetailsComponent from './UserDetailsComponent';

const UserDetails = () => {
    useDocumentTitle('Blazing KRaft - User Details');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { userEmail } = useParams();

    const refreshPageContent = () =>
        dispatch(userActions.getUserDetails(userEmail));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <UserDetailsComponent refreshPageContent={refreshPageContent} />;
};

export default UserDetails;
