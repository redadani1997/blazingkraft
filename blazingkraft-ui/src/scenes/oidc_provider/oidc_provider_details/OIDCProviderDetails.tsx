import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { OIDCProvider } from '../redux';
import OIDCProviderActions from '../redux/actions';
import OIDCProviderDetailsComponent from './OIDCProviderDetailsComponent';

const OIDCProviderDetails = () => {
    useDocumentTitle('Blazing KRaft - OIDC Provider Details');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { OIDCProviderCode } = useParams();

    const refreshPageContent = () =>
        dispatch(
            OIDCProviderActions.getOIDCProviderDetails(OIDCProviderCode),
        ).then(({ value }: { value: OIDCProvider }) => {
            const { issuer } = value;
            return dispatch(
                OIDCProviderActions.getOIDCProviderWellKnownConfiguration(
                    issuer,
                ),
            );
        });

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <OIDCProviderDetailsComponent refreshPageContent={refreshPageContent} />
    );
};

export default OIDCProviderDetails;
