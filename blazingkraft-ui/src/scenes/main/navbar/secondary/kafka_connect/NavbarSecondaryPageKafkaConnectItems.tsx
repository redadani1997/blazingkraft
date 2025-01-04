import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage, OpenedLink } from '../..';
import NavbarSecondaryPageKafkaConnectItemsComponent from './NavbarSecondaryPageKafkaConnectItemsComponent';

interface NavbarSecondaryPageKafkaConnectItemsProps {
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPageKafkaConnectItems = ({
    openedLink,
    setOpenedLink,
    setActivePage,
}: NavbarSecondaryPageKafkaConnectItemsProps) => {
    // Map State To Props
    const { activeLink, features } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKafkaConnectsFeature } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementKafkaConnectPermissions
                            .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                            .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                },
            ],
        },
    );

    if (CommonValidationUtils.isFalsy(features)) {
        return <></>;
    }
    const { kafkaConnectFeatures } = features;

    return (
        <NavbarSecondaryPageKafkaConnectItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            kafkaConnectFeatures={kafkaConnectFeatures}
            openedLink={openedLink}
            setOpenedLink={setOpenedLink}
            isAuthorizedKafkaConnectsFeature={isAuthorizedKafkaConnectsFeature}
        />
    );
};

export default NavbarSecondaryPageKafkaConnectItems;
