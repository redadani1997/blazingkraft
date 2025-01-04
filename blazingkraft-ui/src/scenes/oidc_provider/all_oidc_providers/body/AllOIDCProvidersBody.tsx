import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { OIDCProvider } from 'scenes/oidc_provider/redux';
import AllOIDCProvidersBodyComponent from './AllOIDCProvidersBodyComponent';

interface AllOIDCProvidersBodyProps {
    setOIDCProviderToDelete: (OIDCProvider: OIDCProvider) => void;
    setIsDeleteOIDCProviderModalOpen: (isOpen: boolean) => void;
}
const AllOIDCProvidersBody = ({
    setIsDeleteOIDCProviderModalOpen,
    setOIDCProviderToDelete,
}: AllOIDCProvidersBodyProps) => {
    // Map State To Props
    const { OIDCProviders, isGetAllOIDCProvidersPending } = useSelector(
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
    const { isAuthorized: isAuthorizedDeleteOIDCProvider } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                        .DELETE_OIDC_PROVIDER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditOIDCProvider } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                        .EDIT_OIDC_PROVIDER,
            },
        ],
    });

    return (
        <AllOIDCProvidersBodyComponent
            setIsDeleteOIDCProviderModalOpen={setIsDeleteOIDCProviderModalOpen}
            setOIDCProviderToDelete={setOIDCProviderToDelete}
            isGetAllOIDCProvidersPending={isGetAllOIDCProvidersPending}
            OIDCProviders={OIDCProviders}
            isAuthorizedDeleteOIDCProvider={isAuthorizedDeleteOIDCProvider}
            isAuthorizedEditOIDCProvider={isAuthorizedEditOIDCProvider}
        />
    );
};

export default AllOIDCProvidersBody;
