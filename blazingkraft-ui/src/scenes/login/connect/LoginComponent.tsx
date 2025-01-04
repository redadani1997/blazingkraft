import { Alert, Divider, Paper, Text, useMantineTheme } from '@mantine/core';
import classNames from 'classnames';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import CommonStyles from 'common/styles/CommonStyles';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonPasswordInput from 'scenes/common/input/CommonPasswordInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import UnRestrictedHeader from 'scenes/main/header/UnRestrictedHeader';
import { BlazingKraftProperties } from 'scenes/settings/redux';
import OIDCProviderLogin from '../oidc_provider_login/OIDCProviderLogin';

interface LoginComponentProps {
    isLoginPending: boolean;
    properties: BlazingKraftProperties;
    login: (email: string, password: string) => Promise<void>;
}

function LoginComponent({
    isLoginPending,
    login,
    properties,
}: LoginComponentProps) {
    const loginInputRef = useRef<HTMLInputElement>(null);

    const theme = useMantineTheme();
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoadingOIDCConfiguration, setIsLoadingOIDCConfiguration] =
        useState(false);

    const doLogin = () => {
        login(email, password);
    };

    useEffect(() => {
        loginInputRef.current?.focus();
    }, []);

    const [getIsFirstApplicationUsage, setIsFirstApplicationUsage] =
        useCommonLocalStorage({
            key: 'Is First Application Usage',
        });

    const isFirstApplicationUsage = useMemo(
        () => getIsFirstApplicationUsage() !== 'false',
        [],
    );

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-16 w-full">
                <UnRestrictedHeader />
            </div>
            <div
                className="w-full flex flex-col max-w-full"
                style={{ height: 'calc(100% - 4rem)', position: 'relative' }}
            >
                <CommonScrollArea className="w-full h-full">
                    <div className="w-full h-full flex flex-col justify-center">
                        <div className="flex justify-center">
                            <Text
                                variant="gradient"
                                gradient={{
                                    from: 'violet',
                                    to: 'yellow',
                                    deg: 100,
                                }}
                                fw={1000}
                                fz={isSmall ? 40 : 75}
                                className="text-center"
                            >
                                Blazing KRaft
                            </Text>
                        </div>
                        <div className="flex w-full justify-center">
                            <div
                                className={classNames('p-4', {
                                    'w-1/2': !isSmall,
                                    'w-full': isSmall,
                                })}
                            >
                                <Paper
                                    radius="md"
                                    p="xl"
                                    withBorder
                                    style={{
                                        position: 'relative',
                                        backgroundColor:
                                            theme.colorScheme === 'dark'
                                                ? theme.colors.dark[6]
                                                : theme.colors.gray[2],
                                    }}
                                    shadow="xl"
                                >
                                    {isFirstApplicationUsage && (
                                        <Alert
                                            icon={
                                                <TbAlertCircle size="1.4rem" />
                                            }
                                            title="Info"
                                            color="blue"
                                            className="mb-4"
                                        >
                                            <Text>
                                                First time here? Use the
                                                following credentials:
                                            </Text>
                                            <Text className="pt-3">
                                                <span className="pr-2">
                                                    Email:
                                                </span>
                                                <span className="font-extrabold italic">
                                                    admin
                                                </span>
                                                <span className="pl-6 pr-2">
                                                    Password:
                                                </span>
                                                <span className="font-extrabold italic">
                                                    admin
                                                </span>
                                            </Text>
                                        </Alert>
                                    )}
                                    <CommonTextInput
                                        textInputRef={loginInputRef}
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={setEmail}
                                        onEnterPress={doLogin}
                                    />
                                    <CommonPasswordInput
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={setPassword}
                                        className="my-2"
                                        onEnterPress={doLogin}
                                    />
                                    <CommonButton
                                        className="mt-4"
                                        onClick={doLogin}
                                    >
                                        Login
                                    </CommonButton>

                                    {properties.oidcProviders.length > 0 && (
                                        <>
                                            <Divider
                                                label="Or Connect With"
                                                labelPosition="center"
                                                className="mt-4 mb-0"
                                            />

                                            {properties.oidcProviders.map(
                                                oidcProvider => (
                                                    <OIDCProviderLogin
                                                        key={`${oidcProvider.name} _ ${oidcProvider.code} `}
                                                        oidcProvider={
                                                            oidcProvider
                                                        }
                                                        setIsLoadingOIDCConfiguration={
                                                            setIsLoadingOIDCConfiguration
                                                        }
                                                    />
                                                ),
                                            )}
                                        </>
                                    )}

                                    <LoadingSpinner
                                        isLoading={
                                            isLoginPending ||
                                            isLoadingOIDCConfiguration
                                        }
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </CommonScrollArea>
            </div>
        </div>
    );
}

export default LoginComponent;
