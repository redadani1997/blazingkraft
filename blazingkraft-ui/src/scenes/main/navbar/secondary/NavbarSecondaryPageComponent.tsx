import { useEffect, useState } from 'react';
import { ActiveLink, ActivePage, OpenedLink } from '..';
import NavbarSecondaryPageClusterItems from './cluster/NavbarSecondaryPageClusterItems';
import NavbarSecondaryPageKafkaConnectItems from './kafka_connect/NavbarSecondaryPageKafkaConnectItems';
import NavbarSecondaryPageKsqlDbItems from './ksqldb/NavbarSecondaryPageKsqlDbItems';
import NavbarSecondaryPageManagementItems from './management/NavbarSecondaryPageManagementItems';
import NavbarSecondaryPagePlaygroundItems from './playground/NavbarSecondaryPagePlaygroundItems';
import NavbarSecondaryPageSchemaRegistryItems from './schema_registry/NavbarSecondaryPageSchemaRegistryItems';

interface NavbarSecondaryPageComponentProps {
    activeLink: ActiveLink;
    activePage: ActivePage;
    setActivePage: (activePage: ActivePage) => void;
}
function NavbarSecondaryPageComponent({
    activeLink,
    activePage,
    setActivePage,
}: NavbarSecondaryPageComponentProps) {
    const [openedLink, setOpenedLink] = useState<OpenedLink | undefined>(
        undefined,
    );

    useEffect(() => {
        setOpenedLink({
            id: activeLink.id,
            code: activeLink.code,
        });
    }, [activeLink]);

    if (activePage === 'CLUSTERS') {
        return (
            <NavbarSecondaryPageClusterItems
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                setActivePage={setActivePage}
            />
        );
    }

    if (activePage === 'KAFKA_CONNECTS') {
        return (
            <NavbarSecondaryPageKafkaConnectItems
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                setActivePage={setActivePage}
            />
        );
    }

    if (activePage === 'SCHEMA_REGISTRIES') {
        return (
            <NavbarSecondaryPageSchemaRegistryItems
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                setActivePage={setActivePage}
            />
        );
    }

    if (activePage === 'KSQLDBS') {
        return (
            <NavbarSecondaryPageKsqlDbItems
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                setActivePage={setActivePage}
            />
        );
    }

    if (activePage === 'MANAGEMENT') {
        return (
            <NavbarSecondaryPageManagementItems setActivePage={setActivePage} />
        );
    }

    if (activePage === 'PLAYGROUND') {
        return (
            <NavbarSecondaryPagePlaygroundItems setActivePage={setActivePage} />
        );
    }

    return <></>;
}

export default NavbarSecondaryPageComponent;
