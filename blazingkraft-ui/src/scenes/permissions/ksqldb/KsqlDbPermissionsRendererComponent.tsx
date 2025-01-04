import { Grid } from '@mantine/core';
import KsqlDbPermissions from 'common/permissions/KsqlDbPermissions';
import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from 'common/permissions/ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from 'common/permissions/ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from 'common/permissions/ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from 'common/permissions/ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from 'common/permissions/ksqldb/KsqlDbTopicPermissions';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { CommonFeature } from 'scenes/settings/redux';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface KsqlDbPermissionsRendererComponentProps {
    ksqlDbFeatures: CommonFeature[];
    ksqlDbPermissions: Map<string, string[]>;
    setKsqlDbPermissions: (ksqlDbPermissions: Map<string, string[]>) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

function initPermissions(
    setKsqlDbPermissions: (ksqlDbPermissions: Map<string, string[]>) => void,
    ksqlDbFeatures: CommonFeature[],
) {
    const ksqlDbPermissions = new Map();
    ksqlDbFeatures.forEach((feature: CommonFeature) => {
        ksqlDbPermissions.set(feature.code, KsqlDbPermissions.ALL_PERMISSIONS);
    });

    setKsqlDbPermissions(ksqlDbPermissions);
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

function KsqlDbPermissionsRendererComponent({
    ksqlDbFeatures,
    ksqlDbPermissions,
    setKsqlDbPermissions,
    disabled,
    basePermissions,
}: KsqlDbPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(
                setKsqlDbPermissions,
                ksqlDbFeatures,
                basePermissions,
            );
        } else {
            initPermissions(setKsqlDbPermissions, ksqlDbFeatures);
        }
    }, [basePermissions]);

    const [selectedTab, setSelectedTab] = useState<string>(
        ksqlDbFeatures.length === 0 ? 'Other' : ksqlDbFeatures[0].code,
    );

    const ksqlDbPermissionsArray = useMemo(
        () => CommonUtils.mapToArray(ksqlDbPermissions),
        [ksqlDbPermissions],
    );

    function commonSetPermissions(key: string) {
        return (permissions: string[]) => {
            const newClusterPermissions = new Map(ksqlDbPermissions);
            newClusterPermissions.set(key, permissions);
            setKsqlDbPermissions(newClusterPermissions);
        };
    }

    function ksqlDbNameByCode(code: string) {
        const clusterFeature = ksqlDbFeatures.find(
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
            items={ksqlDbPermissionsArray.map(({ key, value }) => {
                return {
                    label: ksqlDbNameByCode(key),
                    value: key,
                    children: (
                        <Grid>
                            <PermissionsWrapper
                                header="Dashboard"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbDashboardPermissions.KSQLDB_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Editor"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Queries"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Connectors"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Tables"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Streams"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbStreamPermissions.KSQLDB_STREAM_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Topics"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS_LABELS_BY_PERMISSION
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

export default KsqlDbPermissionsRendererComponent;
