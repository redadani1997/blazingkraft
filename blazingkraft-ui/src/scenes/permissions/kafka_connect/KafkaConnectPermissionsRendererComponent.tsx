import { Grid } from '@mantine/core';
import KafkaConnectPermissions from 'common/permissions/KafkaConnectPermissions';
import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from 'common/permissions/kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { CommonFeature } from 'scenes/settings/redux';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface KafkaConnectPermissionsRendererComponentProps {
    kafkaConnectFeatures: CommonFeature[];
    kafkaConnectPermissions: Map<string, string[]>;
    setKafkaConnectPermissions: (
        kafkaConnectPermissions: Map<string, string[]>,
    ) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

function initPermissions(
    setKafkaConnectPermissions: (
        kafkaConnectPermissions: Map<string, string[]>,
    ) => void,
    kafkaConnectFeatures: CommonFeature[],
) {
    const kafkaConnectPermissions = new Map();
    kafkaConnectFeatures.forEach((feature: CommonFeature) => {
        kafkaConnectPermissions.set(
            feature.code,
            KafkaConnectPermissions.ALL_PERMISSIONS,
        );
    });

    setKafkaConnectPermissions(kafkaConnectPermissions);
}

function constructPermissions(
    setPermissions: (permissions: Map<string, string[]>) => void,
    features: CommonFeature[],
    basePermissions: Map<string, string[]>,
) {
    const permissions = new Map();
    features.forEach((feature: CommonFeature) => {
        permissions.set(feature.code, basePermissions.get(feature.code) || []);
    });

    setPermissions(permissions);
}

function KafkaConnectPermissionsRendererComponent({
    kafkaConnectFeatures,
    kafkaConnectPermissions,
    setKafkaConnectPermissions,
    disabled,
    basePermissions,
}: KafkaConnectPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(
                setKafkaConnectPermissions,
                kafkaConnectFeatures,
                basePermissions,
            );
        } else {
            initPermissions(setKafkaConnectPermissions, kafkaConnectFeatures);
        }
    }, [basePermissions]);

    const [selectedTab, setSelectedTab] = useState<string>(
        kafkaConnectFeatures.length === 0
            ? 'Other'
            : kafkaConnectFeatures[0].code,
    );

    const kafkaConnectPermissionsArray = useMemo(
        () => CommonUtils.mapToArray(kafkaConnectPermissions),
        [kafkaConnectPermissions],
    );

    function commonSetPermissions(key: string) {
        return (permissions: string[]) => {
            const newClusterPermissions = new Map(kafkaConnectPermissions);
            newClusterPermissions.set(key, permissions);
            setKafkaConnectPermissions(newClusterPermissions);
        };
    }

    function kafkaConnectNameByCode(code: string) {
        const clusterFeature = kafkaConnectFeatures.find(
            (clusterFeature: CommonFeature) => clusterFeature.code === code,
        );
        return clusterFeature ? clusterFeature.name : code;
    }

    return (
        <CommonTabs
            container={{
                variant: 'pills',
                value: selectedTab,
                onTabChange: (value: string) => {
                    setSelectedTab(value);
                },
            }}
            items={kafkaConnectPermissionsArray.map(({ key, value }) => {
                return {
                    label: kafkaConnectNameByCode(key),
                    value: key,
                    children: (
                        <Grid>
                            <PermissionsWrapper
                                header="Dashboard"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KafkaConnectDashboardPermissions.KAFKA_CONNECT_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Plugins"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    PluginPermissions.PLUGIN_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Connectors"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    ConnectorPermissions.CONNECTOR_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                        </Grid>
                    ),
                };
            })}
        />
    );
}

export default KafkaConnectPermissionsRendererComponent;
