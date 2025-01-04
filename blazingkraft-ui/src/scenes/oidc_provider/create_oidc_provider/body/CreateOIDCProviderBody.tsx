import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import OIDCProviderActions, {
    OIDCProviderRequest,
} from 'scenes/oidc_provider/redux/actions';
import CreateOIDCProviderBodyComponent from './CreateOIDCProviderBodyComponent';

const CreateOIDCProviderBody = () => {
    // Map State To Props
    const { isCreateOIDCProviderPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateOIDCProviderPending:
                store.OIDCProviderReducer.isCreateOIDCProviderPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const testOIDCProviderConnectivities = authority => {
        dispatch(
            OIDCProviderActions.testOIDCProviderBrowserConnectivity(authority),
        );
        dispatch(
            OIDCProviderActions.testOIDCProviderServerConnectivity(authority),
        );
    };
    const createOIDCProvider = (request: OIDCProviderRequest) =>
        dispatch(OIDCProviderActions.createOIDCProvider(request)).then(() =>
            navigate(`/management/oidc_providers/${request.code}/details`),
        );

    // Authorization
    const { isAuthorized: isAuthorizedTestOIDCProviderConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                            .TEST_OIDC_PROVIDER_CONFIGURATION,
                },
            ],
        });

    return (
        <>
            <CreateOIDCProviderBodyComponent
                createOIDCProvider={createOIDCProvider}
                testOIDCProviderConnectivities={testOIDCProviderConnectivities}
                isCreateOIDCProviderPending={isCreateOIDCProviderPending}
                isAuthorizedTestOIDCProviderConfiguration={
                    isAuthorizedTestOIDCProviderConfiguration
                }
            />
            <LoadingSpinner isLoading={isCreateOIDCProviderPending} />
        </>
    );
};

export default CreateOIDCProviderBody;
