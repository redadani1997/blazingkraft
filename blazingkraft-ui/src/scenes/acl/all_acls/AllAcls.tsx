import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import aclActions, { AclBindingRequest } from '../redux/actions';
import AllAclsComponent from './AllAclsComponent';

const AllAcls = () => {
    useDocumentTitle('Blazing KRaft - ACLs');

    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const acl: AclBindingRequest = {
        principal: null,
        resourceType: 'ANY',
        resourceName: null,
        operation: 'ANY',
        permissionType: 'ANY',
        patternType: 'ANY',
        host: null,
    };

    const refreshPageContent = () =>
        dispatch(aclActions.getAclBindings(acl, clusterCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllAclsComponent refreshPageContent={refreshPageContent} />;
};

export default AllAcls;
