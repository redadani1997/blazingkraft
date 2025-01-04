import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { BiHome } from 'react-icons/bi';
import { BsController, BsDatabase, BsFolder2Open } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { SiApachekafka } from 'react-icons/si';
import { TbPlugConnected } from 'react-icons/tb';
import { ActiveLink, ActivePage } from '..';
import CommonNavbarLink from '../common/CommonNavbarLink';

interface NavbarPrimaryPageComponentProps {
    activeLink: ActiveLink;
    setActivePage: (activePage: ActivePage) => void;
    isAuthorizedManagementFeature: boolean;
    isAuthorizedPlaygroundFeature: boolean;
    isAuthorizedKafkaConnectsFeature: boolean;
    isAuthorizedKsqlDbsFeature: boolean;
    isAuthorizedSchemaRegistriesFeature: boolean;
    isAuthorizedClustersFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarPrimaryPageComponent({
    activeLink,
    setActivePage,
    isAuthorizedManagementFeature,
    isAuthorizedPlaygroundFeature,
    isAuthorizedKafkaConnectsFeature,
    isAuthorizedKsqlDbsFeature,
    isAuthorizedSchemaRegistriesFeature,
    isAuthorizedClustersFeature,
}: NavbarPrimaryPageComponentProps) {
    return (
        <div>
            <CommonNavbarLink
                activeLink={activeLink}
                icon={renderIcon(BiHome)}
                name="Home"
                id="HOME"
                link="/home"
            />

            <Divider />
            {isAuthorizedManagementFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(MdOutlineManageAccounts)}
                        name="Management"
                        id="MANAGEMENT"
                        onClick={() => {
                            setActivePage('MANAGEMENT');
                        }}
                    />

                    <Divider />
                </>
            )}
            {isAuthorizedClustersFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(SiApachekafka)}
                        name="Clusters"
                        id="CLUSTERS"
                        onClick={() => {
                            setActivePage('CLUSTERS');
                        }}
                    />

                    <Divider />
                </>
            )}
            {isAuthorizedKafkaConnectsFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(TbPlugConnected)}
                        name="Kafka Connects"
                        id="KAFKA_CONNECTS"
                        onClick={() => {
                            setActivePage('KAFKA_CONNECTS');
                        }}
                    />

                    <Divider />
                </>
            )}
            {isAuthorizedSchemaRegistriesFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(BsFolder2Open)}
                        name="Schema Registries"
                        id="SCHEMA_REGISTRIES"
                        onClick={() => {
                            setActivePage('SCHEMA_REGISTRIES');
                        }}
                    />

                    <Divider />
                </>
            )}
            {isAuthorizedKsqlDbsFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(BsDatabase)}
                        name="KsqlDbs"
                        id="KSQLDBS"
                        onClick={() => {
                            setActivePage('KSQLDBS');
                        }}
                    />

                    <Divider />
                </>
            )}
            {isAuthorizedPlaygroundFeature && (
                <>
                    <CommonNavbarLink
                        activeLink={activeLink}
                        icon={renderIcon(BsController)}
                        name="Playground"
                        id="PLAYGROUND"
                        onClick={() => {
                            setActivePage('PLAYGROUND');
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default NavbarPrimaryPageComponent;
