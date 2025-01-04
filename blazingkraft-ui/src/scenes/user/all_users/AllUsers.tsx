import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import AllUsersComponent from './AllUsersComponent';

const AllUsers = () => {
    useDocumentTitle('Blazing KRaft - Users');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () => dispatch(userActions.getAllUsers());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllUsersComponent refreshPageContent={refreshPageContent} />;
};

export default AllUsers;
