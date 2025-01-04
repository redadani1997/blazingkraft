import { Grid } from '@mantine/core';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import camelCase from 'lodash.camelcase';
import { useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { GroupRequest } from 'scenes/group/redux/actions';
import ClusterPermissionsRenderer from 'scenes/permissions/cluster/ClusterPermissionsRenderer';
import KafkaConnectPermissionsRenderer from 'scenes/permissions/kafka_connect/KafkaConnectPermissionsRenderer';
import KsqlDbPermissionsRenderer from 'scenes/permissions/ksqldb/KsqlDbPermissionsRenderer';
import ManagementPermissionsRenderer from 'scenes/permissions/management/ManagementPermissionsRenderer';
import PlaygroundPermissionsRenderer from 'scenes/permissions/playground/PlaygroundPermissionsRenderer';
import SchemaRegistryPermissionsRenderer from 'scenes/permissions/schema_registry/SchemaRegistryPermissionsRenderer';
import { Features } from 'scenes/settings/redux';

interface CreateGroupBodyComponentProps {
    createGroup: (request: GroupRequest) => void;
    isCreateGroupPending: boolean;
    features: Features;
}

const CreateGroupBodyComponent = ({
    createGroup,
}: CreateGroupBodyComponentProps) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [clusterPermissions, setClusterPermissions] = useState<
        Map<string, string[]>
    >(new Map());
    const [kafkaConnectPermissions, setKafkaConnectPermissions] = useState<
        Map<string, string[]>
    >(new Map());
    const [schemaRegistryPermissions, setSchemaRegistryPermissions] = useState<
        Map<string, string[]>
    >(new Map());
    const [managementPermissions, setManagementPermissions] = useState<
        string[]
    >([]);
    const [ksqlDbPermissions, setKsqlDbPermissions] = useState<
        Map<string, string[]>
    >(new Map());
    const [playgroundPermissions, setPlaygroundPermissions] = useState<
        string[]
    >([]);

    function doCreate() {
        createGroup({
            name,
            code,
            description,
            clusterPermissions,
            kafkaConnectPermissions,
            schemaRegistryPermissions,
            managementPermissions,
            ksqlDbPermissions,
            playgroundPermissions,
        });
    }

    return (
        <div className="flex flex-col">
            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6} lg={3}>
                    <CommonTextInput
                        placeholder="Name"
                        label="Name"
                        description="Name"
                        value={name}
                        onChange={value => {
                            setName(value);
                            setCode(camelCase(value));
                        }}
                        error={!code ? true : false}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={3}>
                    <CommonTextInput
                        placeholder="Code"
                        label="Code"
                        description="Auto Generated Code"
                        value={code}
                        disabled
                        error={!code ? true : false}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={3}>
                    <CommonTextInput
                        placeholder="Description"
                        label="Description"
                        description="Description"
                        value={description}
                        error={!description ? true : false}
                        onChange={value => {
                            setDescription(value);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={3}>
                    <CommonButton
                        disabled={
                            CommonValidationUtils.isFalsyString(code) ||
                            CommonValidationUtils.isFalsyString(name) ||
                            CommonValidationUtils.isFalsyString(description)
                        }
                        onClick={() => {
                            doCreate();
                        }}
                    >
                        Create
                    </CommonButton>
                </Grid.Col>
            </Grid>

            {/* <Divider label="RBAC" labelPosition="center" /> */}

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
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default CreateGroupBodyComponent;
