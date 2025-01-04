import { Divider } from '@mantine/core';
import { ICommonPermissions } from 'common/types/server_permissions';
import { useState } from 'react';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ClusterPermissionsRenderer from 'scenes/permissions/cluster/ClusterPermissionsRenderer';
import KafkaConnectPermissionsRenderer from 'scenes/permissions/kafka_connect/KafkaConnectPermissionsRenderer';
import KsqlDbPermissionsRenderer from 'scenes/permissions/ksqldb/KsqlDbPermissionsRenderer';
import ManagementPermissionsRenderer from 'scenes/permissions/management/ManagementPermissionsRenderer';
import PlaygroundPermissionsRenderer from 'scenes/permissions/playground/PlaygroundPermissionsRenderer';
import SchemaRegistryPermissionsRenderer from 'scenes/permissions/schema_registry/SchemaRegistryPermissionsRenderer';

interface ServerPermissionsDetailsBodyComponentProps {
    serverPermissions: ICommonPermissions;
}

const ServerPermissionsDetailsBodyComponent = ({
    serverPermissions,
}: ServerPermissionsDetailsBodyComponentProps) => {
    const [clusterPermissions, setClusterPermissions] = useState<
        Map<string, string[]>
    >(serverPermissions.clusterPermissions);
    const [kafkaConnectPermissions, setKafkaConnectPermissions] = useState<
        Map<string, string[]>
    >(serverPermissions.kafkaConnectPermissions);
    const [schemaRegistryPermissions, setSchemaRegistryPermissions] = useState<
        Map<string, string[]>
    >(serverPermissions.schemaRegistryPermissions);
    const [managementPermissions, setManagementPermissions] = useState<
        string[]
    >(serverPermissions.managementPermissions);
    const [ksqlDbPermissions, setKsqlDbPermissions] = useState<
        Map<string, string[]>
    >(serverPermissions.ksqlDbPermissions);
    const [playgroundPermissions, setPlaygroundPermissions] = useState<
        string[]
    >(serverPermissions.playgroundPermissions);

    return (
        <div className="flex flex-col">
            <Divider label="RBAC" labelPosition="center" />
            <CommonTabs
                container={{
                    variant: 'default',
                    defaultValue: 'Management',
                }}
                items={[
                    {
                        label: 'Management',
                        value: 'Management',
                        children: (
                            <ManagementPermissionsRenderer
                                managementPermissions={managementPermissions}
                                setManagementPermissions={
                                    setManagementPermissions
                                }
                                disabled
                                basePermissions={
                                    serverPermissions.managementPermissions
                                }
                            />
                        ),
                    },
                    {
                        label: 'Clusters',
                        value: 'Clusters',
                        children: (
                            <ClusterPermissionsRenderer
                                clusterPermissions={clusterPermissions}
                                setClusterPermissions={setClusterPermissions}
                                disabled
                                basePermissions={
                                    serverPermissions.clusterPermissions
                                }
                            />
                        ),
                    },
                    {
                        label: 'Kafka Connects',
                        value: 'Kafka Connects',
                        children: (
                            <KafkaConnectPermissionsRenderer
                                kafkaConnectPermissions={
                                    kafkaConnectPermissions
                                }
                                setKafkaConnectPermissions={
                                    setKafkaConnectPermissions
                                }
                                disabled
                                basePermissions={
                                    serverPermissions.kafkaConnectPermissions
                                }
                            />
                        ),
                    },
                    {
                        label: 'Schema Registries',
                        value: 'Schema Registries',
                        children: (
                            <SchemaRegistryPermissionsRenderer
                                schemaRegistryPermissions={
                                    schemaRegistryPermissions
                                }
                                setSchemaRegistryPermissions={
                                    setSchemaRegistryPermissions
                                }
                                disabled
                                basePermissions={
                                    serverPermissions.schemaRegistryPermissions
                                }
                            />
                        ),
                    },
                    {
                        label: 'KsqlDbs',
                        value: 'KsqlDbs',
                        children: (
                            <KsqlDbPermissionsRenderer
                                ksqlDbPermissions={ksqlDbPermissions}
                                setKsqlDbPermissions={setKsqlDbPermissions}
                                disabled
                                basePermissions={
                                    serverPermissions.ksqlDbPermissions
                                }
                            />
                        ),
                    },
                    {
                        label: 'Playground',
                        value: 'Playground',
                        children: (
                            <PlaygroundPermissionsRenderer
                                playgroundPermissions={playgroundPermissions}
                                setPlaygroundPermissions={
                                    setPlaygroundPermissions
                                }
                                disabled
                                basePermissions={
                                    serverPermissions.playgroundPermissions
                                }
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default ServerPermissionsDetailsBodyComponent;
