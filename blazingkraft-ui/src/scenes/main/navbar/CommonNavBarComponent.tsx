import { Navbar, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { Features } from 'scenes/settings/redux';
import { ActiveLink, ActivePage } from '.';
import NavbarPrimaryPage from './primary/NavbarPrimaryPage';
import NavbarSecondaryPage from './secondary/NavbarSecondaryPage';
import NavbarUser from './user/NavbarUser';

interface CommonNavBarComponentProps {
    activeLink: ActiveLink;
    features: Features;
    opened: boolean;
}

function CommonNavBarComponent({
    activeLink,
    opened,
}: CommonNavBarComponentProps) {
    const theme = useMantineTheme();
    const [activePage, setActivePage] = useState<ActivePage>('PRIMARY');

    useEffect(() => {
        if (activeLink.id === 'HOME' || activeLink.id === 'NOT_FOUND') {
            setActivePage('PRIMARY');
        } else {
            setActivePage(activeLink.id);
        }
    }, [activeLink]);

    return (
        <Navbar className="h-full">
            <div className="flex flex-col h-full w-full">
                <div className="flex-1">
                    <CommonScrollArea className="relative h-full w-full">
                        {activePage === 'PRIMARY' && (
                            <NavbarPrimaryPage setActivePage={setActivePage} />
                        )}
                        {activePage !== 'PRIMARY' && (
                            <NavbarSecondaryPage
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </CommonScrollArea>
                </div>
                <div className="h-auto max-h-40 overflow-hidden">
                    <NavbarUser opened={opened} />
                </div>
            </div>
        </Navbar>
    );
}
export default CommonNavBarComponent;
