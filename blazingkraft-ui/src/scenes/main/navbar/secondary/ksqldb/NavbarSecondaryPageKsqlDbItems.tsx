import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage, OpenedLink } from '../..';
import NavbarSecondaryPageKsqlDbItemsComponent from './NavbarSecondaryPageKsqlDbItemsComponent';

interface NavbarSecondaryPageKsqlDbItemsProps {
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPageKsqlDbItems = ({
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageKsqlDbItemsProps) => {
    // Map State To Props
    const { activeLink, features } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKsqlDbsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
            },
        ],
    });

    if (CommonValidationUtils.isFalsy(features)) {
        return <></>;
    }
    const { ksqlDbFeatures } = features;

    return (
        <NavbarSecondaryPageKsqlDbItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            ksqlDbFeatures={ksqlDbFeatures}
            openedLink={openedLink}
            setOpenedLink={setOpenedLink}
            isAuthorizedKsqlDbsFeature={isAuthorizedKsqlDbsFeature}
        />
    );
};

export default NavbarSecondaryPageKsqlDbItems;
