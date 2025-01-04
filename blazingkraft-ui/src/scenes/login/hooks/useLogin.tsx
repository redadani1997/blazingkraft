import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { UserManager } from 'oidc-client-ts';
import { useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';

function useLogin() {
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const { properties, token } = useSelector((store: ReduxStore) => {
        return {
            properties: store.settingsReducer.properties,
            token: store.loginReducer.token,
        };
    }, shallowEqual);

    const [getOidcProviderStorage, _] = useCommonLocalStorage({
        key: 'oidc-provider',
    });

    const redirectPath = routerLocation.pathname + routerLocation.search || '/';

    const oidcProviderStorage = useMemo(() => getOidcProviderStorage(), []);

    useEffect(() => {
        if (token) {
            return;
        } else if (CommonValidationUtils.isFalsyString(oidcProviderStorage)) {
            navigate(`/login?redirectPath=${redirectPath}`);
        } else if (oidcProviderStorage === 'blazingkraft') {
            navigate(
                `/login/callback/blazingkraft?redirectPath=${redirectPath}`,
            );
        } else {
            const oidcProvider = properties.oidcProviders.find(
                provider => provider.code === oidcProviderStorage,
            );

            if (CommonValidationUtils.isFalsy(oidcProvider)) {
                navigate(`/login?redirectPath=${redirectPath}`);
                return;
            }

            const userManager = new UserManager({
                client_id: oidcProvider.clientId,
                client_secret: oidcProvider.clientSecret,
                redirect_uri: `${location.origin}/login/callback/${oidcProvider.code}`,
                response_type: 'code',
                scope:
                    oidcProvider.scopes?.join(' ') || 'openid offline_access',
                authority: oidcProvider.issuer,
                disablePKCE: oidcProvider.pkceEnabled === false,
            });
            userManager.signinRedirect({ state: { redirectPath } });
        }
    }, [token]);

    return {
        isConnected: CommonValidationUtils.isTruthy(token),
    };
}

export default useLogin;
