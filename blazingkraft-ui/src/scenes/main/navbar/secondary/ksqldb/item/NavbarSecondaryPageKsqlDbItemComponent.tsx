import { ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsFiletypeSql, BsTable } from 'react-icons/bs';
import { GiSplashyStream } from 'react-icons/gi';
import { MdOutlineConnectWithoutContact, MdOutlineTopic } from 'react-icons/md';
import { ActiveLink, CodeLink, OpenedLink } from 'scenes/main/navbar';
import CommonNavbarCodeLink from 'scenes/main/navbar/common/CommonNavbarCodeLink';

interface NavbarSecondaryPageKsqlDbItemComponentProps {
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    code: string;
    name: string;
    color: string;
    isAuthorizedKsqlDbDashboardFeature: boolean;
    isAuthorizedKsqlDbConnectorFeature: boolean;
    isAuthorizedKsqlDbTableFeature: boolean;
    isAuthorizedKsqlDbTopicFeature: boolean;
    isAuthorizedKsqlDbStreamFeature: boolean;
    isAuthorizedKsqlDbQueryFeature: boolean;
    isAuthorizedKsqlDbEditorFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageKsqlDbItemComponent({
    activeLink,
    openedLink,
    setOpenedLink,
    code,
    name,
    color,
    isAuthorizedKsqlDbDashboardFeature,
    isAuthorizedKsqlDbConnectorFeature,
    isAuthorizedKsqlDbTableFeature,
    isAuthorizedKsqlDbTopicFeature,
    isAuthorizedKsqlDbStreamFeature,
    isAuthorizedKsqlDbQueryFeature,
    isAuthorizedKsqlDbEditorFeature,
}: NavbarSecondaryPageKsqlDbItemComponentProps) {
    const items: CodeLink[] = [];

    if (isAuthorizedKsqlDbDashboardFeature) {
        items.push({
            type: 'DASHBOARD',
            name: 'Dashboard',
            link: `/ksqldbs/${code}/dashboard`,
            icon: renderIcon(AiOutlineDashboard),
        });
    }
    if (isAuthorizedKsqlDbEditorFeature) {
        items.push({
            type: 'EDITOR',
            name: 'Editor',
            link: `/ksqldbs/${code}/editor`,
            icon: renderIcon(BiNotepad),
        });
    }
    if (isAuthorizedKsqlDbQueryFeature) {
        items.push({
            type: 'QUERY',
            name: 'Queries',
            link: `/ksqldbs/${code}/queries`,
            icon: renderIcon(BsFiletypeSql),
        });
    }
    if (isAuthorizedKsqlDbConnectorFeature) {
        items.push({
            type: 'CONNECTOR',
            name: 'Connectors',
            link: `/ksqldbs/${code}/connectors`,
            icon: renderIcon(MdOutlineConnectWithoutContact),
        });
    }
    if (isAuthorizedKsqlDbTableFeature) {
        items.push({
            type: 'TABLE',
            name: 'Tables',
            link: `/ksqldbs/${code}/tables`,
            icon: renderIcon(BsTable),
        });
    }
    if (isAuthorizedKsqlDbTopicFeature) {
        items.push({
            type: 'TOPIC',
            name: 'Topics',
            link: `/ksqldbs/${code}/topics`,
            icon: renderIcon(MdOutlineTopic),
        });
    }
    if (isAuthorizedKsqlDbStreamFeature) {
        items.push({
            type: 'STREAM',
            name: 'Streams',
            link: `/ksqldbs/${code}/streams`,
            icon: renderIcon(GiSplashyStream),
        });
    }

    return (
        <CommonNavbarCodeLink
            id="KSQLDBS"
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

export default NavbarSecondaryPageKsqlDbItemComponent;
