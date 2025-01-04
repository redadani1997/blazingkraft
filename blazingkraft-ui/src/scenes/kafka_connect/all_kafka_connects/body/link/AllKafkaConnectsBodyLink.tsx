import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from 'common/permissions/kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { useMemo } from 'react';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKafkaConnectsBodyLinkComponent from './AllKafkaConnectsBodyLinkComponent';

interface AllKafkaConnectsBodyLinkProps {
    code: string;
    name: string;
}

const AllKafkaConnectsBodyLink = ({
    code,
    name,
}: AllKafkaConnectsBodyLinkProps) => {
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

    const goto = useMemo(() => {
        if (isAuthorizedConnectorFeature) {
            return `/kafka_connects/${code}/connectors`;
        }
        if (isAuthorizedPluginFeature) {
            return `/kafka_connects/${code}/plugins`;
        }
        if (isAuthorizedKafkaConnectDashboardFeature) {
            return `/kafka_connects/${code}/dashboard`;
        }
        return null;
    }, [
        code,
        isAuthorizedConnectorFeature,
        isAuthorizedPluginFeature,
        isAuthorizedKafkaConnectDashboardFeature,
    ]);

    return <AllKafkaConnectsBodyLinkComponent goto={goto} name={name} />;
};

export default AllKafkaConnectsBodyLink;
