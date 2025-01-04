import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { IoMdReturnLeft } from 'react-icons/io';
import { SiApachekafka } from 'react-icons/si';
import { CommonFeature } from 'scenes/settings/redux';
import { ActiveLink, ActivePage, OpenedLink } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';
import NavbarSecondaryPageClusterItem from './item/NavbarSecondaryPageClusterItem';

interface NavbarSecondaryPageClusterItemsComponentProps {
    isAuthorizedClustersFeature: boolean;
    clusterFeatures: CommonFeature[];
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    setActivePage: (activePage: ActivePage) => void;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageClusterItemsComponent({
    clusterFeatures,
    isAuthorizedClustersFeature,
    activeLink,
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageClusterItemsComponentProps) {
    if (!isAuthorizedClustersFeature) return null;
    return (
        <div>
            <CommonNavbarLink
                activeLink={activeLink}
                id={null}
                name="Back"
                icon={renderIcon(IoMdReturnLeft)}
                onClick={() => {
                    setActivePage('PRIMARY');
                }}
            />

            <Divider />

            <CommonNavbarLink
                activeLink={activeLink}
                id="CLUSTERS"
                name="Clusters"
                icon={renderIcon(SiApachekafka)}
                link="/clusters"
            />
            {clusterFeatures.map(feature => {
                return (
                    <NavbarSecondaryPageClusterItem
                        key={feature.code}
                        activeLink={activeLink}
                        code={feature.code}
                        name={feature.name}
                        color={feature.color}
                        openedLink={openedLink}
                        setOpenedLink={setOpenedLink}
                    />
                );
            })}
        </div>
    );
}

export default NavbarSecondaryPageClusterItemsComponent;
