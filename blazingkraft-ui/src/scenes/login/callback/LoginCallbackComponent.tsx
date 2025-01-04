import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { User, UserManager } from 'oidc-client-ts';
import { OpenIDService } from 'oidc/OpenIDService';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlazingKraftProperties } from 'scenes/settings/redux';

interface LoginCallbackComponentProps {
    properties: BlazingKraftProperties;
    oidcProviderSigninCallback: (
        userManager: UserManager,
        OIDCProviderCode: string,
        OIDCProviderName: string,
    ) => Promise<any>;
}

function LoginCallbackComponent({
    properties,
    oidcProviderSigninCallback,
}: LoginCallbackComponentProps) {
    const { OIDCProviderCode } = useParams();
    const navigate = useNavigate();

    const [getIsFirstApplicationUsage, setIsFirstApplicationUsage] =
        useCommonLocalStorage({
            key: 'Is First Application Usage',
        });
    const [getOidcProviderStorage, setOidcProviderStorage] =
        useCommonLocalStorage({
            key: 'oidc-provider',
        });

    const oidcProvider = useMemo(() => {
        const provider = properties.oidcProviders.find(
            provider => provider.code === OIDCProviderCode,
        );
        return provider || null;
    }, [OIDCProviderCode, properties]);

    if (CommonValidationUtils.isFalsy(oidcProvider)) {
        return <></>;
    }

    useEffect(() => {
        const userManager = OpenIDService.constructUserManager({
            client_id: oidcProvider.clientId,
            client_secret: oidcProvider.clientSecret,
            redirect_uri: `${location.origin}/login/callback/${oidcProvider.code}`,
            response_type: 'code',
            scope: oidcProvider.scopes?.join(' ') || 'openid offline_access',
            authority: oidcProvider.issuer,
            disablePKCE: oidcProvider.pkceEnabled === false,
        });

        oidcProviderSigninCallback(
            userManager,
            OIDCProviderCode,
            oidcProvider.name,
        )
            .then(response => {
                setIsFirstApplicationUsage('false');
                setOidcProviderStorage(oidcProvider.code);
                const user: User | null = response.value;
                const redirectPath = user?.state?.redirectPath || '/';
                navigate(redirectPath, { replace: true });
            })
            .catch(() => {
                navigate(`/login`);
            });
    }, []);

    return <></>;
}

export default LoginCallbackComponent;
