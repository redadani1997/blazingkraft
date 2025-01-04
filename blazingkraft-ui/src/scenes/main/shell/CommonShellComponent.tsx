import { useMantineTheme } from '@mantine/core';
import classNames from 'classnames';
import CommonStyles from 'common/styles/CommonStyles';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import CommonHeader from '../header/CommonHeader';
import CommonNavBar from '../navbar/CommonNavBar';
import WithCommonSpotlight from '../spotlight/WithCommonSpotlight';
import './index.scss';
import useClickOutsideRef from './useClickOutsideRef';

interface CommonShellComponentProps {
    children: React.ReactNode;
}

const CommonShellComponent = ({ children }: CommonShellComponentProps) => {
    const theme = useMantineTheme();
    const location = useLocation();
    const [opened, setOpened] = useState(true);

    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    const isMedium = useCommonMediaQuery({
        query: `(min-width: ${CommonStyles.MEDIUM_START})`,
    });

    const navbarRef = useRef(null);
    const burgerRef = useRef(null);
    useClickOutsideRef(navbarRef, burgerRef, isSmall, opened, setOpened);

    useEffect(() => {
        if (isSmall) {
            setOpened(false);
        }
    }, [isSmall, location]);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-16 w-full">
                <WithCommonSpotlight>
                    <CommonHeader
                        opened={opened}
                        setOpened={setOpened}
                        burgerRef={burgerRef}
                    />
                </WithCommonSpotlight>
            </div>
            <div
                className="w-full flex max-w-full"
                style={{ height: 'calc(100% - 4rem)', position: 'relative' }}
            >
                <div
                    className={classNames({
                        'shell-navbar-small-width': isSmall,
                        'shell-navbar-medium-width': isMedium && !isSmall,
                        'shell-navbar-closed': !opened,
                        'shell-navbar-opened': opened,
                    })}
                    ref={navbarRef}
                >
                    <CommonNavBar opened={opened} />
                </div>
                <div
                    style={{
                        background:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                        height: '100%',
                    }}
                    className={classNames('h-full', {
                        'shell-content-small-width': isSmall,
                        'shell-content-medium-width': isMedium,
                        'shell-navbar-closed': !opened,
                        'shell-navbar-opened': opened,
                    })}
                >
                    <CommonScrollArea className="w-full h-full">
                        <div className="h-full w-full">{children}</div>
                    </CommonScrollArea>
                </div>
            </div>
        </div>
    );
};

CommonShellComponent.propTypes = {
    children: PropTypes.node,
};

export default CommonShellComponent;
