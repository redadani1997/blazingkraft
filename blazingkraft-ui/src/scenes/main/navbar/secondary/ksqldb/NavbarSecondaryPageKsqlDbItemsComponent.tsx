import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { BsDatabase } from 'react-icons/bs';
import { IoMdReturnLeft } from 'react-icons/io';
import { CommonFeature } from 'scenes/settings/redux';
import { ActiveLink, ActivePage, OpenedLink } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';
import NavbarSecondaryPageKsqlDbItem from './item/NavbarSecondaryPageKsqlDbItem';

interface NavbarSecondaryPageKsqlDbItemsComponentProps {
    isAuthorizedKsqlDbsFeature: boolean;
    ksqlDbFeatures: CommonFeature[];
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

function NavbarSecondaryPageKsqlDbItemsComponent({
    ksqlDbFeatures,
    isAuthorizedKsqlDbsFeature,
    activeLink,
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageKsqlDbItemsComponentProps) {
    if (!isAuthorizedKsqlDbsFeature) return null;
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
                id="KSQLDBS"
                name="KsqlDbs"
                icon={renderIcon(BsDatabase)}
                link="/ksqldbs"
            />
            {ksqlDbFeatures.map(feature => {
                return (
                    <NavbarSecondaryPageKsqlDbItem
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

export default NavbarSecondaryPageKsqlDbItemsComponent;
