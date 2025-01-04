import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import groupActions from '../redux/actions';
import AllGroupsComponent from './AllGroupsComponent';

const AllGroups = () => {
    useDocumentTitle('Blazing KRaft - Groups');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () => dispatch(groupActions.getAllGroups());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllGroupsComponent refreshPageContent={refreshPageContent} />;
};

export default AllGroups;
