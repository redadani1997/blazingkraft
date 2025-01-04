import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import groupActions from '../redux/actions';
import EditGroupComponent from './EditGroupComponent';

const EditGroup = () => {
    useDocumentTitle('Blazing KRaft - Edit Group');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { groupCode } = useParams();

    const refreshPageContent = () =>
        dispatch(groupActions.getGroupDetails(groupCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <EditGroupComponent refreshPageContent={refreshPageContent} />;
};

export default EditGroup;
