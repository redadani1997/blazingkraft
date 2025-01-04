import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage, OpenedLink } from '../..';
import NavbarSecondaryPageClusterItemsComponent from './NavbarSecondaryPageClusterItemsComponent';

interface NavbarSecondaryPageClusterItemsProps {
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPageClusterItems = ({
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageClusterItemsProps) => {
    // Map State To Props
    const { activeLink, features } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedClustersFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
            },
        ],
    });

    if (CommonValidationUtils.isFalsy(features)) {
        return <></>;
    }
    const { clusterFeatures } = features;

    return (
        <NavbarSecondaryPageClusterItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            clusterFeatures={clusterFeatures}
            openedLink={openedLink}
            setOpenedLink={setOpenedLink}
            isAuthorizedClustersFeature={isAuthorizedClustersFeature}
        />
    );
};

export default NavbarSecondaryPageClusterItems;
