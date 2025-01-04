import {
    ActionIcon,
    Burger,
    Header,
    Text,
    Tooltip,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import BlazingKraftSymbol from 'assets/blazingkraft/BlazingKraftSymbol.png';
import CommonStyles from 'common/styles/CommonStyles';
import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FiAlertTriangle } from 'react-icons/fi';
import { TbLogout, TbMoonStars, TbSearch, TbSun } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReduxStore } from 'redux_config/reducers';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonCode from 'scenes/common/code/CommonCode';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import loginActions from 'scenes/login/redux/actions';

interface CommonHeaderProps {
    opened: boolean;
    setOpened: Function;
    burgerRef: any;
}

const CommonHeader = ({ opened, setOpened, burgerRef }: CommonHeaderProps) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const spotlight = useSpotlight();
    const isMedium = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.MEDIUM_END})`,
    });
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    // Map State To Props
    const { currentRelease, latestRelease } = useSelector(
        (store: ReduxStore) => {
            return {
                currentRelease: store.githubReducer.currentRelease,
                latestRelease: store.githubReducer.latestRelease,
            };
        },
        shallowEqual,
    );

    const navigate = useNavigate();

    const logout = () => loginActions.logout();

    return (
        <Header height={'100%'} className="w-full px-2">
            <CommonScrollArea className="h-full w-full">
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center">
                        <Burger
                            opened={opened}
                            onClick={() => setOpened(!opened)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr={isSmall ? 'xs' : 'xl'}
                            ref={burgerRef}
                        />
                        {!isSmall && (
                            <div className="flex h-6 justify-center items-center">
                                <img
                                    className="h-full"
                                    src={BlazingKraftSymbol}
                                />
                            </div>
                        )}
                        <div className="pl-2 flex justify-center items-center">
                            <div className="text-center">
                                <Text
                                    onClick={() => navigate('/home')}
                                    className="cursor-pointer"
                                    variant="gradient"
                                    gradient={{
                                        from: 'violet',
                                        to: 'yellow',
                                        deg: 100,
                                    }}
                                    fw={1000}
                                    fz={20}
                                >
                                    Blazing KRaft
                                </Text>
                            </div>
                        </div>
                        {!isSmall && (
                            <div className="ml-2">
                                {currentRelease.name !== latestRelease.name ? (
                                    <Tooltip
                                        label={
                                            <Text className="flex">
                                                The new version
                                                <Text className="px-1 font-bold">
                                                    {latestRelease.name}
                                                </Text>{' '}
                                                is available
                                            </Text>
                                        }
                                        position="right"
                                    >
                                        <div className="items-center flex">
                                            <CommonCode className="flex items-center">
                                                {currentRelease.name}
                                                <FiAlertTriangle
                                                    color="red"
                                                    className="ml-2"
                                                />
                                            </CommonCode>
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <CommonCode className="flex items-center">
                                        {currentRelease.name}
                                    </CommonCode>
                                )}
                            </div>
                        )}
                        <ActionIcon
                            variant="default"
                            onClick={() => toggleColorScheme()}
                            size={30}
                            className="ml-3"
                        >
                            {colorScheme === 'light' ? (
                                <TbSun size={16} />
                            ) : (
                                <TbMoonStars size={16} />
                            )}
                        </ActionIcon>
                    </div>
                    {!isMedium && (
                        <div className="px-2">
                            <CommonButton
                                variant="outline"
                                radius="md"
                                onClick={() => spotlight.openSpotlight()}
                                color="gray"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <TbSearch size="1rem" />
                                        <span className="pl-3">Actions...</span>
                                    </div>
                                    <Text
                                        className="flex items-center font-extrabold w-full pl-20"
                                        color="dimmed"
                                    >
                                        <CommonCode>mod + /</CommonCode>
                                    </Text>
                                </div>
                            </CommonButton>
                        </div>
                    )}
                    <div className="flex">
                        {!isSmall && (
                            <>
                                <ActionIcon
                                    component="a"
                                    target="_blank"
                                    href="https://github.com/redadani1997/blazingkraft"
                                    radius="md"
                                    className="mx-1"
                                    variant="outline"
                                    size="2.2rem"
                                >
                                    <BsGithub size="1.4rem" />
                                </ActionIcon>
                                <ActionIcon
                                    component="a"
                                    target="_blank"
                                    href="https://discord.gg/mWhWshHMAz"
                                    radius="md"
                                    className="mx-1"
                                    variant="outline"
                                    size="2.2rem"
                                    color="blue"
                                >
                                    <BsDiscord size="1.4rem" />
                                </ActionIcon>
                                <ActionIcon
                                    component="a"
                                    target="_blank"
                                    href="https://www.blazingkraft.com"
                                    radius="md"
                                    className="mx-1"
                                    variant="outline"
                                    size="2.2rem"
                                    color="cyan"
                                >
                                    <CgWebsite size="1.4rem" />
                                </ActionIcon>
                            </>
                        )}
                        {CommonDesktopUtils.isWeb() && (
                            <ActionIcon
                                onClick={() => {
                                    // It is so important to have the link + onclick to force a
                                    // rerender of the login page, as i'm so lazy to figure out
                                    // how to logout a user connected via an oidc provider.
                                    logout();
                                    navigate('/login', { replace: true });
                                    window.location.reload();
                                }}
                                radius="md"
                                className="mx-1"
                                variant="outline"
                                size="2.2rem"
                                color="green"
                            >
                                <TbLogout size="1.4rem" />
                            </ActionIcon>
                        )}
                    </div>
                </div>
            </CommonScrollArea>
        </Header>
    );
};

export default CommonHeader;
