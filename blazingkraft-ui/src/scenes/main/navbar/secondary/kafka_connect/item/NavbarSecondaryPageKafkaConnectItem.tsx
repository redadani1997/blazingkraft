import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from 'common/permissions/kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActiveLink, OpenedLink } from 'scenes/main/navbar';
import NavbarSecondaryPageKafkaConnectItemComponent from './NavbarSecondaryPageKafkaConnectItemComponent';

interface NavbarSecondaryPageKafkaConnectItemProps {
    code: string;
    name: string;
    color: string;
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
}

const NavbarSecondaryPageKafkaConnectItem = ({
    activeLink,
    code,
    name,
    color,
    openedLink,
    setOpenedLink,
}: NavbarSecondaryPageKafkaConnectItemProps) => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKafkaConnectDashboardFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'KAFKA_CONNECT',
                    permission:
                        KafkaConnectDashboardPermissions
                            .KAFKA_CONNECT_DASHBOARD_PERMISSIONS
                            .KAFKA_CONNECT_DASHBOARD_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedPluginFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    PluginPermissions.PLUGIN_PERMISSIONS.PLUGIN_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedConnectorFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS
                        .CONNECTOR_FEATURE_ENABLED,
            },
        ],
    });

    if (
        isAuthorizedKafkaConnectDashboardFeature ||
        isAuthorizedPluginFeature ||
        isAuthorizedConnectorFeature
    ) {
        return (
            <NavbarSecondaryPageKafkaConnectItemComponent
                activeLink={activeLink}
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                code={code}
                name={name}
                color={color}
                isAuthorizedKafkaConnectDashboardFeature={
                    isAuthorizedKafkaConnectDashboardFeature
                }
                isAuthorizedPluginFeature={isAuthorizedPluginFeature}
                isAuthorizedConnectorFeature={isAuthorizedConnectorFeature}
            />
        );
    }
    return <></>;
};

export default NavbarSecondaryPageKafkaConnectItem;
