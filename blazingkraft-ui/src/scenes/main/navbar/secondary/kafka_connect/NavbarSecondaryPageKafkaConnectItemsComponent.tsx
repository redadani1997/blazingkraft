import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { IoMdReturnLeft } from 'react-icons/io';
import { TbPlugConnected } from 'react-icons/tb';
import { CommonFeature } from 'scenes/settings/redux';
import { ActiveLink, ActivePage, OpenedLink } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';
import NavbarSecondaryPageKafkaConnectItem from './item/NavbarSecondaryPageKafkaConnectItem';

interface NavbarSecondaryPageKafkaConnectItemsComponentProps {
    isAuthorizedKafkaConnectsFeature: boolean;
    kafkaConnectFeatures: CommonFeature[];
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

function NavbarSecondaryPageKafkaConnectItemsComponent({
    kafkaConnectFeatures,
    isAuthorizedKafkaConnectsFeature,
    activeLink,
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageKafkaConnectItemsComponentProps) {
    if (!isAuthorizedKafkaConnectsFeature) return null;
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
                id="KAFKA_CONNECTS"
                name="Kafka Connects"
                icon={renderIcon(TbPlugConnected)}
                link="/kafka_connects"
            />
            {kafkaConnectFeatures.map(feature => {
                return (
                    <NavbarSecondaryPageKafkaConnectItem
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

export default NavbarSecondaryPageKafkaConnectItemsComponent;
