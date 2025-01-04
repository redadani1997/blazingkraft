import { ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineSubject } from 'react-icons/md';
import { ActiveLink, CodeLink, OpenedLink } from 'scenes/main/navbar';
import CommonNavbarCodeLink from 'scenes/main/navbar/common/CommonNavbarCodeLink';

interface NavbarSecondaryPageSchemaRegistryItemComponentProps {
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    code: string;
    name: string;
    color: string;
    isAuthorizedSchemaRegistryDashboardFeature: boolean;
    isAuthorizedSubjectFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageSchemaRegistryItemComponent({
    activeLink,
    openedLink,
    setOpenedLink,
    code,
    name,
    color,
    isAuthorizedSchemaRegistryDashboardFeature,
    isAuthorizedSubjectFeature,
}: NavbarSecondaryPageSchemaRegistryItemComponentProps) {
    const items: CodeLink[] = [];

    if (isAuthorizedSchemaRegistryDashboardFeature) {
        items.push({
            type: 'DASHBOARD',
            name: 'Dashboard',
            link: `/schema_registries/${code}/dashboard`,
            icon: renderIcon(AiOutlineDashboard),
        });
    }
    if (isAuthorizedSubjectFeature) {
        items.push({
            type: 'SUBJECT',
            name: 'Subjects',
            link: `/schema_registries/${code}/subjects`,
            icon: renderIcon(MdOutlineSubject),
        });
    }

    return (
        <CommonNavbarCodeLink
            id="SCHEMA_REGISTRIES"
            activeLink={activeLink}
            code={code}
            name={name}
            color={color}
            openedLink={openedLink}
            setOpenedLink={setOpenedLink}
            items={items}
        />
    );
}

export default NavbarSecondaryPageSchemaRegistryItemComponent;
