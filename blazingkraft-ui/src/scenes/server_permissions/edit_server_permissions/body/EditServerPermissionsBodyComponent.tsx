import { Divider, Grid } from '@mantine/core';
import { ICommonPermissions } from 'common/types/server_permissions';
import { useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ClusterPermissionsRenderer from 'scenes/permissions/cluster/ClusterPermissionsRenderer';
import KafkaConnectPermissionsRenderer from 'scenes/permissions/kafka_connect/KafkaConnectPermissionsRenderer';
import KsqlDbPermissionsRenderer from 'scenes/permissions/ksqldb/KsqlDbPermissionsRenderer';
import ManagementPermissionsRenderer from 'scenes/permissions/management/ManagementPermissionsRenderer';
import PlaygroundPermissionsRenderer from 'scenes/permissions/playground/PlaygroundPermissionsRenderer';
import SchemaRegistryPermissionsRenderer from 'scenes/permissions/schema_registry/SchemaRegistryPermissionsRenderer';
import { ServerPermissionsRequest } from 'scenes/server_permissions/redux/actions';

interface EditServerPermissionsBodyComponentProps {
    serverPermissions: ICommonPermissions;
    editServerPermissions: (
        serverPermissions: ServerPermissionsRequest,
    ) => Promise<void>;
}

const EditServerPermissionsBodyComponent = ({
    serverPermissions,
    editServerPermissions,
}: EditServerPermissionsBodyComponentProps) => {
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

    function doEdit() {
        const serverPermissionsRequest: ServerPermissionsRequest = {
            clusterPermissions: clusterPermissions,
            kafkaConnectPermissions: kafkaConnectPermissions,
            schemaRegistryPermissions: schemaRegistryPermissions,
            managementPermissions: managementPermissions,
            ksqlDbPermissions: ksqlDbPermissions,
            playgroundPermissions: playgroundPermissions,
        };
        editServerPermissions(serverPermissionsRequest);
    }

    return (
        <div className="flex flex-col">
            <Grid className=" mb-4">
                <Grid.Col span={12} md={6} lg={3}>
                    <CommonButton
                        onClick={() => {
                            doEdit();
                        }}
                    >
                        Edit
                    </CommonButton>
                </Grid.Col>
            </Grid>
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

export default EditServerPermissionsBodyComponent;
