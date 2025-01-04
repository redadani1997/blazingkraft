import { Card, Text, ThemeIcon, createStyles } from '@mantine/core';
import classNames from 'classnames';
import { notifyError } from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { UserManager } from 'oidc-client-ts';
import { useCallback, useMemo } from 'react';
import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { SiAuth0, SiOkta } from 'react-icons/si';
import { TbShieldCheckeredFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
import { BlazingKraftPropertiesOIDCProvider } from 'scenes/settings/redux';

interface OIDCProviderLoginComponentProps {
    oidcProvider: BlazingKraftPropertiesOIDCProvider;
    setIsLoadingOIDCConfiguration: (isLoading: boolean) => void;
}

function renderProviderIcon(oidcProvider: BlazingKraftPropertiesOIDCProvider) {
    switch (oidcProvider.providerType) {
        case 'Keycloak':
            return (
                <ThemeIcon variant="light" size={30}>
                    <TbShieldCheckeredFilled size={20} />
                </ThemeIcon>
            );
        case 'Auth0':
            return (
                <ThemeIcon variant="light" size={30}>
                    <SiAuth0 size={20} />
                </ThemeIcon>
            );
        case 'Okta':
            return (
                <ThemeIcon variant="light" size={30}>
                    <SiOkta size={20} />
                </ThemeIcon>
            );
        case 'Google':
            return (
                <ThemeIcon variant="light" size={30}>
                    <AiOutlineGoogle size={20} />
                </ThemeIcon>
            );
        case 'Facebook':
            return (
                <ThemeIcon variant="light" size={30}>
                    <AiFillFacebook size={20} />
                </ThemeIcon>
            );
        case 'Github':
            return (
                <ThemeIcon variant="light" size={30}>
                    <BsGithub size={20} />
                </ThemeIcon>
            );
        default:
            return (
                <ThemeIcon variant="light" size={30}>
                    <TbShieldCheckeredFilled size={20} />
                </ThemeIcon>
            );
    }
}

const useStyles = createStyles(theme => ({
    hover: {
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[1],
        },
    },
}));

function OIDCProviderLoginComponent({
    oidcProvider,
    setIsLoadingOIDCConfiguration,
}: OIDCProviderLoginComponentProps) {
    const { classes } = useStyles();

    const providerIcon = useMemo(() => {
        return renderProviderIcon(oidcProvider);
    }, [oidcProvider]);

    const [searchParams] = useSearchParams({});

    const redirectPath = searchParams.get('redirectPath') || '/';

    const doLogin = useCallback(() => {
        setIsLoadingOIDCConfiguration(true);
        const userManager = new UserManager({
            client_id: oidcProvider.clientId,
            client_secret: oidcProvider.clientSecret,
            redirect_uri: `${location.origin}/login/callback/${oidcProvider.code}`,
            response_type: 'code',
            scope: oidcProvider.scopes?.join(' ') || 'openid offline_access',
            authority: oidcProvider.issuer,
            disablePKCE: oidcProvider.pkceEnabled === false,
        });
        userManager
            .signinRedirect({ state: { redirectPath } })
            .then(res => {
                setIsLoadingOIDCConfiguration(false);
                return res;
            })
            .catch(err => {
                setIsLoadingOIDCConfiguration(false);
                notifyError({
                    title: 'OpenID Connect Provider Login',
                    message: `Error when trying to login using ${
                        oidcProvider.name
                    }: '${CommonUtils.getRestErrorMessage(err)}'.`,
                });
                throw err;
            });
        // userManager.startSilentRenew();
    }, [oidcProvider]);

    return (
        <Card
            className={classNames(classes.hover, 'mt-3 py-2 cursor-pointer')}
            withBorder
            onClick={() => {
                doLogin();
            }}
        >
            <div className="flex w-full justify-center items-center">
                {providerIcon}
                <div className="flex flex-col pl-3">
                    <Text>{oidcProvider.name}</Text>
                </div>
            </div>
        </Card>
    );
}

export default OIDCProviderLoginComponent;
