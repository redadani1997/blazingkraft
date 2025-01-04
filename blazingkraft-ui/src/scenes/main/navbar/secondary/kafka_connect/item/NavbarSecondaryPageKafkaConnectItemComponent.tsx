import { ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsPlug } from 'react-icons/bs';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { ActiveLink, CodeLink, OpenedLink } from 'scenes/main/navbar';
import CommonNavbarCodeLink from 'scenes/main/navbar/common/CommonNavbarCodeLink';

interface NavbarSecondaryPageKafkaConnectItemComponentProps {
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    code: string;
    name: string;
    color: string;
    isAuthorizedKafkaConnectDashboardFeature: boolean;
    isAuthorizedPluginFeature: boolean;
    isAuthorizedConnectorFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageKafkaConnectItemComponent({
    activeLink,
    openedLink,
    setOpenedLink,
    code,
    name,
    color,
    isAuthorizedKafkaConnectDashboardFeature,
    isAuthorizedPluginFeature,
    isAuthorizedConnectorFeature,
}: NavbarSecondaryPageKafkaConnectItemComponentProps) {
    const items: CodeLink[] = [];

    if (isAuthorizedKafkaConnectDashboardFeature) {
        items.push({
            type: 'DASHBOARD',
            name: 'Dashboard',
            link: `/kafka_connects/${code}/dashboard`,
            icon: renderIcon(AiOutlineDashboard),
        });
    }
    if (isAuthorizedPluginFeature) {
        items.push({
            type: 'PLUGIN',
            name: 'Plugins',
            link: `/kafka_connects/${code}/plugins`,
            icon: renderIcon(BsPlug),
        });
    }
    if (isAuthorizedConnectorFeature) {
        items.push({
            type: 'CONNECTOR',
            name: 'Connectors',
            link: `/kafka_connects/${code}/connectors`,
            icon: renderIcon(MdOutlineConnectWithoutContact),
        });
    }

    return (
        <CommonNavbarCodeLink
            id="KAFKA_CONNECTS"
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

export default NavbarSecondaryPageKafkaConnectItemComponent;
