import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { BsFolder2Open } from 'react-icons/bs';
import { IoMdReturnLeft } from 'react-icons/io';
import { CommonFeature } from 'scenes/settings/redux';
import { ActiveLink, ActivePage, OpenedLink } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';
import NavbarSecondaryPageSchemaRegistryItem from './item/NavbarSecondaryPageSchemaRegistryItem';

interface NavbarSecondaryPageSchemaRegistryItemsComponentProps {
    isAuthorizedSchemaRegistrysFeature: boolean;
    schemaRegistryFeatures: CommonFeature[];
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

function NavbarSecondaryPageSchemaRegistryItemsComponent({
    schemaRegistryFeatures,
    isAuthorizedSchemaRegistrysFeature,
    activeLink,
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageSchemaRegistryItemsComponentProps) {
    if (!isAuthorizedSchemaRegistrysFeature) return null;
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
                id="SCHEMA_REGISTRIES"
                name="Schema Registries"
                icon={renderIcon(BsFolder2Open)}
                link="/schema_registries"
            />
            {schemaRegistryFeatures.map(feature => {
                return (
                    <NavbarSecondaryPageSchemaRegistryItem
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

export default NavbarSecondaryPageSchemaRegistryItemsComponent;
