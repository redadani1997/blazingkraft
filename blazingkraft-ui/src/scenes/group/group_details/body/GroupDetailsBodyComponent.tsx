import { Grid } from '@mantine/core';
import { GroupDetails } from 'common/types/group';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ClusterPermissionsRenderer from 'scenes/permissions/cluster/ClusterPermissionsRenderer';
import KafkaConnectPermissionsRenderer from 'scenes/permissions/kafka_connect/KafkaConnectPermissionsRenderer';
import KsqlDbPermissionsRenderer from 'scenes/permissions/ksqldb/KsqlDbPermissionsRenderer';
import ManagementPermissionsRenderer from 'scenes/permissions/management/ManagementPermissionsRenderer';
import PlaygroundPermissionsRenderer from 'scenes/permissions/playground/PlaygroundPermissionsRenderer';
import SchemaRegistryPermissionsRenderer from 'scenes/permissions/schema_registry/SchemaRegistryPermissionsRenderer';
import GroupAdditionalDetails from './additional_details/GroupAdditionalDetails';

interface GroupDetailsBodyComponentProps {
    groupDetails: GroupDetails;
}

const GroupDetailsBodyComponent = ({
    groupDetails,
}: GroupDetailsBodyComponentProps) => {
    const [name, setName] = useState(groupDetails.name);
    const [code, setCode] = useState(groupDetails.code);
    const [description, setDescription] = useState(groupDetails.description);
    const [clusterPermissions, setClusterPermissions] = useState<
        Map<string, string[]>
    >(groupDetails.clusterPermissions);
    const [kafkaConnectPermissions, setKafkaConnectPermissions] = useState<
        Map<string, string[]>
    >(groupDetails.kafkaConnectPermissions);
    const [schemaRegistryPermissions, setSchemaRegistryPermissions] = useState<
        Map<string, string[]>
    >(groupDetails.schemaRegistryPermissions);
    const [managementPermissions, setManagementPermissions] = useState<
        string[]
    >(groupDetails.managementPermissions);
    const [ksqlDbPermissions, setKsqlDbPermissions] = useState<
        Map<string, string[]>
    >(groupDetails.ksqlDbPermissions);
    const [playgroundPermissions, setPlaygroundPermissions] = useState<
        string[]
    >(groupDetails.playgroundPermissions);

    useEffect(() => {
        setName(groupDetails.name);
        setCode(groupDetails.code);
        setDescription(groupDetails.description);
    }, [groupDetails]);

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: 'Main Details',
            }}
            items={[
                {
                    label: 'Main Details',
                    value: 'Main Details',
                    children: (
                        <div className="flex flex-col">
                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={6} lg={3}>
                                    <CommonTextInput
                                        placeholder="Name"
                                        label="Name"
                                        value={name}
                                        onChange={value => {
                                            setName(value);
                                            setCode(camelCase(value));
                                        }}
                                        error={!code ? true : false}
                                        disabled
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} md={6} lg={3}>
                                    <CommonTextInput
                                        placeholder="Code"
                                        label="Code"
                                        value={code}
                                        disabled
                                        error={!code ? true : false}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} md={6} lg={3}>
                                    <CommonTextInput
                                        placeholder="Description"
                                        label="Description"
                                        value={description}
                                        error={!description ? true : false}
                                        onChange={value => {
                                            setDescription(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>

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
                                                managementPermissions={
                                                    managementPermissions
                                                }
                                                setManagementPermissions={
                                                    setManagementPermissions
                                                }
                                                disabled
                                                basePermissions={
                                                    groupDetails.managementPermissions
                                                }
                                            />
                                        ),
                                    },
                                    {
                                        label: 'Clusters',
                                        value: 'Clusters',
                                        children: (
                                            <ClusterPermissionsRenderer
                                                clusterPermissions={
                                                    clusterPermissions
                                                }
                                                setClusterPermissions={
                                                    setClusterPermissions
                                                }
                                                disabled
                                                basePermissions={
                                                    groupDetails.clusterPermissions
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
                                                    groupDetails.kafkaConnectPermissions
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
                                                    groupDetails.schemaRegistryPermissions
                                                }
                                            />
                                        ),
                                    },
                                    {
                                        label: 'KsqlDbs',
                                        value: 'KsqlDbs',
                                        children: (
                                            <KsqlDbPermissionsRenderer
                                                ksqlDbPermissions={
                                                    ksqlDbPermissions
                                                }
                                                setKsqlDbPermissions={
                                                    setKsqlDbPermissions
                                                }
                                                disabled
                                                basePermissions={
                                                    groupDetails.ksqlDbPermissions
                                                }
                                            />
                                        ),
                                    },
                                    {
                                        label: 'Playground',
                                        value: 'Playground',
                                        children: (
                                            <PlaygroundPermissionsRenderer
                                                playgroundPermissions={
                                                    playgroundPermissions
                                                }
                                                setPlaygroundPermissions={
                                                    setPlaygroundPermissions
                                                }
                                                disabled
                                                basePermissions={
                                                    groupDetails.playgroundPermissions
                                                }
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    ),
                },
                {
                    label: 'Users Details',
                    value: 'Users Details',
                    children: (
                        <GroupAdditionalDetails groupDetails={groupDetails} />
                    ),
                },
            ]}
        />
    );
};

export default GroupDetailsBodyComponent;
