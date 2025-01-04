import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OIDCProviderActions from '../redux/actions';
import AllOIDCProvidersComponent from './AllOIDCProvidersComponent';

const AllOIDCProviders = () => {
    useDocumentTitle('Blazing KRaft - OIDC Providers');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () =>
        dispatch(OIDCProviderActions.getAllOIDCProviders());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllOIDCProvidersComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllOIDCProviders;
