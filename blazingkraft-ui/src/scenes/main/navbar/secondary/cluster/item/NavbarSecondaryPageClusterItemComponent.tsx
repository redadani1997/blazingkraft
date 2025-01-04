import { ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { AiOutlineDashboard, AiOutlineGroup } from 'react-icons/ai';
import { GiSplashyStream } from 'react-icons/gi';
import { MdOutlineTopic } from 'react-icons/md';
import { SiJsonwebtokens } from 'react-icons/si';
import {
    TbArrowBigDownLines,
    TbArrowBigUpLines,
    TbScale,
    TbShieldLock,
} from 'react-icons/tb';
import { ActiveLink, CodeLink, OpenedLink } from 'scenes/main/navbar';
import CommonNavbarCodeLink from 'scenes/main/navbar/common/CommonNavbarCodeLink';

interface NavbarSecondaryPageClusterItemComponentProps {
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    code: string;
    name: string;
    color: string;
    isAuthorizedClusterDashboardFeature: boolean;
    isAuthorizedTopicFeature: boolean;
    isAuthorizedProducerFeature: boolean;
    isAuthorizedConsumerFeature: boolean;
    isAuthorizedConsumerGroupFeature: boolean;
    isAuthorizedAclFeature: boolean;
    isAuthorizedDelegationTokenFeature: boolean;
    isAuthorizedQuotaFeature: boolean;
    isAuthorizedStreamsFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageClusterItemComponent({
    activeLink,
    openedLink,
    setOpenedLink,
    code,
    name,
    color,
    isAuthorizedClusterDashboardFeature,
    isAuthorizedTopicFeature,
    isAuthorizedProducerFeature,
    isAuthorizedConsumerFeature,
    isAuthorizedConsumerGroupFeature,
    isAuthorizedAclFeature,
    isAuthorizedDelegationTokenFeature,
    isAuthorizedQuotaFeature,
    isAuthorizedStreamsFeature,
}: NavbarSecondaryPageClusterItemComponentProps) {
    const items: CodeLink[] = [];

    if (isAuthorizedClusterDashboardFeature) {
        items.push({
            type: 'DASHBOARD',
            name: 'Dashboard',
            link: `/clusters/${code}/dashboard`,
            icon: renderIcon(AiOutlineDashboard),
        });
    }
    if (isAuthorizedTopicFeature) {
        items.push({
            type: 'TOPIC',
            name: 'Topics',
            link: `/clusters/${code}/topics`,
            icon: renderIcon(MdOutlineTopic),
        });
    }
    if (isAuthorizedProducerFeature) {
        items.push({
            type: 'PRODUCER',
            name: 'Producer',
            link: `/clusters/${code}/producer/blazing_producer`,
            icon: renderIcon(TbArrowBigUpLines),
        });
    }
    if (isAuthorizedConsumerFeature) {
        items.push({
            type: 'CONSUMER',
            name: 'Consumer',
            link: `/clusters/${code}/consumer/blazing_consumer`,
            icon: renderIcon(TbArrowBigDownLines),
        });
    }
    if (isAuthorizedConsumerGroupFeature) {
        items.push({
            type: 'CONSUMER_GROUP',
            name: 'Consumer Groups',
            link: `/clusters/${code}/consumer_groups`,
            icon: renderIcon(AiOutlineGroup),
        });
    }
    if (isAuthorizedAclFeature) {
        items.push({
            type: 'ACL',
            name: 'ACL',
            link: `/clusters/${code}/acls`,
            icon: renderIcon(TbShieldLock),
        });
    }
    if (isAuthorizedDelegationTokenFeature) {
        items.push({
            type: 'DELEGATION_TOKEN',
            name: 'Delegation Tokens',
            link: `/clusters/${code}/delegation_tokens`,
            icon: renderIcon(SiJsonwebtokens),
        });
    }
    if (isAuthorizedQuotaFeature) {
        items.push({
            type: 'QUOTAS',
            name: 'Quotas',
            link: `/clusters/${code}/quotas`,
            icon: renderIcon(TbScale),
        });
    }
    if (isAuthorizedStreamsFeature) {
        items.push({
            type: 'STREAMS',
            name: 'Streams',
            link: `/clusters/${code}/streams`,
            icon: renderIcon(GiSplashyStream),
        });
    }

    return (
        <CommonNavbarCodeLink
            id="CLUSTERS"
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

export default NavbarSecondaryPageClusterItemComponent;
