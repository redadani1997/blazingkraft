import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import OIDCProviderActions, {
    OIDCProviderRequest,
} from 'scenes/oidc_provider/redux/actions';
import EditOIDCProviderBodyComponent from './EditOIDCProviderBodyComponent';

const EditOIDCProviderBody = () => {
    // Map State To Props
    const {
        isEditOIDCProviderPending,
        OIDCProviderDetails,
        isGetOIDCProviderDetailsPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isEditOIDCProviderPending:
                store.OIDCProviderReducer.isEditOIDCProviderPending,
            OIDCProviderDetails: store.OIDCProviderReducer.OIDCProviderDetails,
            isGetOIDCProviderDetailsPending:
                store.OIDCProviderReducer.isGetOIDCProviderDetailsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { OIDCProviderCode } = useParams();

    const testOIDCProviderConnectivities = authority => {
        dispatch(
            OIDCProviderActions.testOIDCProviderBrowserConnectivity(authority),
        );
        dispatch(
            OIDCProviderActions.testOIDCProviderServerConnectivity(authority),
        );
    };
    const editOIDCProvider = (request: OIDCProviderRequest) =>
        dispatch(
            OIDCProviderActions.editOIDCProvider(OIDCProviderCode, request),
        ).then(() =>
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

    if (CommonValidationUtils.isFalsy(OIDCProviderDetails)) {
        return null;
    }

    return (
        <>
            <EditOIDCProviderBodyComponent
                editOIDCProvider={editOIDCProvider}
                testOIDCProviderConnectivities={testOIDCProviderConnectivities}
                isEditOIDCProviderPending={isEditOIDCProviderPending}
                OIDCProviderDetails={OIDCProviderDetails}
                isAuthorizedTestOIDCProviderConfiguration={
                    isAuthorizedTestOIDCProviderConfiguration
                }
            />
            <LoadingSpinner
                isLoading={
                    isEditOIDCProviderPending || isGetOIDCProviderDetailsPending
                }
            />
        </>
    );
};

export default EditOIDCProviderBody;
