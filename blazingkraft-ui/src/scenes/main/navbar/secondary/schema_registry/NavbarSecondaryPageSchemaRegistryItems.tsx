import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage, OpenedLink } from '../..';
import NavbarSecondaryPageSchemaRegistryItemsComponent from './NavbarSecondaryPageSchemaRegistryItemsComponent';

interface NavbarSecondaryPageSchemaRegistryItemsProps {
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPageSchemaRegistryItems = ({
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageSchemaRegistryItemsProps) => {
    // Map State To Props
    const { activeLink, features } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedSchemaRegistrysFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                },
            ],
        });

    if (CommonValidationUtils.isFalsy(features)) {
        return <></>;
    }
    const { schemaRegistryFeatures } = features;

    return (
        <NavbarSecondaryPageSchemaRegistryItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            schemaRegistryFeatures={schemaRegistryFeatures}
            openedLink={openedLink}
            setOpenedLink={setOpenedLink}
            isAuthorizedSchemaRegistrysFeature={
                isAuthorizedSchemaRegistrysFeature
            }
        />
    );
};

export default NavbarSecondaryPageSchemaRegistryItems;
