import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import groupActions from 'scenes/group/redux/actions';
import CreateUserComponent from './CreateUserComponent';

const CreateUser = () => {
    useDocumentTitle('Blazing KRaft - Create User');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getAllGroups = () => dispatch(groupActions.getAllGroups());

    useEffect(() => {
        getAllGroups();
    }, []);

    return (
        <>
            <CreateUserComponent />
        </>
    );
};

export default CreateUser;
