import {
    ActionIcon,
    Header,
    Text,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core';
import BlazingKraftSymbol from 'assets/blazingkraft/BlazingKraftSymbol.png';
import CommonStyles from 'common/styles/CommonStyles';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FiAlertTriangle } from 'react-icons/fi';
import { TbMoonStars, TbSun } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import CommonCode from 'scenes/common/code/CommonCode';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';

const UnRestrictedHeader = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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

    return (
        <Header height={'100%'} className="w-full px-2">
            <CommonScrollArea className="h-full w-full">
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center ml-4">
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

                    {!isSmall && (
                        <div className="flex">
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
                        </div>
                    )}
                </div>
            </CommonScrollArea>
        </Header>
    );
};

export default UnRestrictedHeader;
