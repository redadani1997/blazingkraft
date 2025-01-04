import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import OIDCProviderActions from '../redux/actions';
import EditOIDCProviderComponent from './EditOIDCProviderComponent';

const EditOIDCProvider = () => {
    useDocumentTitle('Blazing KRaft - Edit OIDC Provider');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { OIDCProviderCode } = useParams();

    const refreshPageContent = () =>
        dispatch(OIDCProviderActions.getOIDCProviderDetails(OIDCProviderCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <EditOIDCProviderComponent />;
};

export default EditOIDCProvider;
