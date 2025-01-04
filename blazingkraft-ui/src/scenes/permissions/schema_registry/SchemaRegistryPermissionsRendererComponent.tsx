import { Grid } from '@mantine/core';
import SchemaRegistryPermissions from 'common/permissions/SchemaRegistryPermissions';
import { SchemaRegistryDashboardPermissions } from 'common/permissions/schema_registry/SchemaRegistryDashboardPermissions';
import { SchemaRegistryServerPermissions } from 'common/permissions/schema_registry/SchemaRegistryServerPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { CommonFeature } from 'scenes/settings/redux';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface SchemaRegistryPermissionsRendererComponentProps {
    schemaRegistryFeatures: CommonFeature[];
    schemaRegistryPermissions: Map<string, string[]>;
    setSchemaRegistryPermissions: (
        schemaRegistryPermissions: Map<string, string[]>,
    ) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

function initPermissions(
    setSchemaRegistryPermissions: (
        schemaRegistryPermissions: Map<string, string[]>,
    ) => void,
    schemaRegistryFeatures: CommonFeature[],
) {
    const schemaRegistryPermissions = new Map();
    schemaRegistryFeatures.forEach((feature: CommonFeature) => {
        schemaRegistryPermissions.set(
            feature.code,
            SchemaRegistryPermissions.ALL_PERMISSIONS,
        );
    });

    setSchemaRegistryPermissions(schemaRegistryPermissions);
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

function SchemaRegistryPermissionsRendererComponent({
    schemaRegistryFeatures,
    schemaRegistryPermissions,
    setSchemaRegistryPermissions,
    disabled,
    basePermissions,
}: SchemaRegistryPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(
                setSchemaRegistryPermissions,
                schemaRegistryFeatures,
                basePermissions,
            );
        } else {
            initPermissions(
                setSchemaRegistryPermissions,
                schemaRegistryFeatures,
            );
        }
    }, [basePermissions]);

    const [selectedTab, setSelectedTab] = useState<string>(
        schemaRegistryFeatures.length === 0
            ? 'Other'
            : schemaRegistryFeatures[0].code,
    );

    const schemaRegistryPermissionsArray = useMemo(
        () => CommonUtils.mapToArray(schemaRegistryPermissions),
        [schemaRegistryPermissions],
    );

    function commonSetPermissions(key: string) {
        return (permissions: string[]) => {
            const newClusterPermissions = new Map(schemaRegistryPermissions);
            newClusterPermissions.set(key, permissions);
            setSchemaRegistryPermissions(newClusterPermissions);
        };
    }

    function kafkaConnectNameByCode(code: string) {
        const clusterFeature = schemaRegistryFeatures.find(
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
            items={schemaRegistryPermissionsArray.map(({ key, value }) => {
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
                                    SchemaRegistryDashboardPermissions.SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Schema Registry Server"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    SchemaRegistryServerPermissions.SCHEMA_REGISTRY_SERVER_PERMISSIONS_LABELS_BY_PERMISSION
                                }
                                disabled={disabled}
                            />
                            <PermissionsWrapper
                                header="Subjects"
                                permissions={value}
                                setPermissions={commonSetPermissions(key)}
                                permissionLabels={
                                    SubjectPermissions.SUBJECT_PERMISSIONS_LABELS_BY_PERMISSION
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

export default SchemaRegistryPermissionsRendererComponent;
