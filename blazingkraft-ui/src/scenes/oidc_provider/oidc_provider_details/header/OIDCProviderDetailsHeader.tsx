import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import OIDCProviderDetailsHeaderComponent from './OIDCProviderDetailsHeaderComponent';

interface OIDCProviderDetailsHeaderProps {
    refreshPageContent: () => void;
}

const OIDCProviderDetailsHeader = ({
    refreshPageContent,
}: OIDCProviderDetailsHeaderProps) => {
    // Map State To Props
    const {
        isGetOIDCProviderDetailsPending,
        OIDCProviderDetails,
        isGetOIDCProviderWellKnownConfigurationPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetOIDCProviderDetailsPending:
                store.OIDCProviderReducer.isGetOIDCProviderDetailsPending,
            OIDCProviderDetails: store.OIDCProviderReducer.OIDCProviderDetails,
            isGetOIDCProviderWellKnownConfigurationPending:
                store.OIDCProviderReducer
                    .isGetOIDCProviderWellKnownConfigurationPending,
        };
    }, shallowEqual);

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
        <OIDCProviderDetailsHeaderComponent
            OIDCProviderDetails={OIDCProviderDetails}
            isRefreshPageContentPending={
                isGetOIDCProviderDetailsPending ||
                isGetOIDCProviderWellKnownConfigurationPending
            }
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteOIDCProvider={isAuthorizedDeleteOIDCProvider}
            isAuthorizedEditOIDCProvider={isAuthorizedEditOIDCProvider}
        />
    );
};

export default OIDCProviderDetailsHeader;
