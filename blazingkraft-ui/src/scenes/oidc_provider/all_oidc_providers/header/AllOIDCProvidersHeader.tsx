import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllOIDCProvidersHeaderComponent from './AllOIDCProvidersHeaderComponent';

interface AllOIDCProvidersHeaderProps {
    refreshPageContent: () => void;
}

const AllOIDCProvidersHeader = ({
    refreshPageContent,
}: AllOIDCProvidersHeaderProps) => {
    // Map State To Props
    const { isGetAllOIDCProvidersPending, OIDCProviders } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllOIDCProvidersPending:
                    store.OIDCProviderReducer.isGetAllOIDCProvidersPending,
                OIDCProviders: store.OIDCProviderReducer.OIDCProviders,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateOIDCProvider } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                        .CREATE_OIDC_PROVIDER,
            },
        ],
    });

    return (
        <AllOIDCProvidersHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllOIDCProvidersPending}
            OIDCProvidersLength={OIDCProviders.length}
            isAuthorizedCreateOIDCProvider={isAuthorizedCreateOIDCProvider}
        />
    );
};

export default AllOIDCProvidersHeader;
