import { Grid } from '@mantine/core';
import ClusterPermissions from 'common/permissions/ClusterPermissions';
import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { ClusterDashboardPermissions } from 'common/permissions/cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { StreamPermissions } from 'common/permissions/cluster/StreamPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { CommonFeature } from 'scenes/settings/redux';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface ClusterPermissionsRendererComponentProps {
    clusterFeatures: CommonFeature[];
    clusterPermissions: Map<string, string[]>;
    basePermissions?: Map<string, string[]>;
    setClusterPermissions: (clusterPermissions: Map<string, string[]>) => void;
    disabled?: boolean;
}

function initPermissions(
    setPermissions: (permissions: Map<string, string[]>) => void,
    clusterFeatures: CommonFeature[],
) {
    const permissions = new Map();
    clusterFeatures.forEach((clusterFeature: CommonFeature) => {
        permissions.set(
            clusterFeature.code,
            ClusterPermissions.ALL_PERMISSIONS,
        );
    });

    setPermissions(permissions);
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

function ClusterPermissionsRendererComponent({
    clusterFeatures,
    clusterPermissions,
    setClusterPermissions,
    disabled,
    basePermissions,
}: ClusterPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(
                setClusterPermissions,
                clusterFeatures,
                basePermissions,
            );
        } else {
            initPermissions(setClusterPermissions, clusterFeatures);
        }
    }, [basePermissions]);

    const [selectedTab, setSelectedTab] = useState<string>(
        clusterFeatures.length === 0 ? null : clusterFeatures[0].code,
    );

    const clusterPermissionsArray = useMemo(
        () => CommonUtils.mapToArray(clusterPermissions),
        [clusterPermissions],
    );

    function commonSetPermissions(key: string) {
        return (permissions: string[]) => {
            const newClusterPermissions = new Map(clusterPermissions);
            newClusterPermissions.set(key, permissions);
            setClusterPermissions(newClusterPermissions);
        };
    }

    function clusterNameByCode(code: string) {
        const clusterFeature = clusterFeatures.find(
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
            items={clusterPermissionsArray.map(({ key, value }) => {
                return {
                    label: clusterNameByCode(key),
                    value: key,
                    children: (
                        <Grid>
                            <PermissionsWrapper
                                header="Dashboard"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    ClusterDashboardPermissions.CLUSTER_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Topics"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    TopicPermissions.TOPIC_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Producer"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    ProducerPermissions.PRODUCER_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Consumer"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    ConsumerPermissions.CONSUMER_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Consumer Groups"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="ACLs"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    AclPermissions.ACL_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Delegation Tokens"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Quotas"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    QuotaPermissions.QUOTA_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Streams"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    StreamPermissions.STREAM_PERMISSIONS_LABELS_BY_PERMISSION
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

export default ClusterPermissionsRendererComponent;
