import { Grid } from '@mantine/core';
import { GroupDetails } from 'common/types/group';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
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

interface EditGroupBodyComponentProps {
    editGroup: (request: GroupRequest) => void;
    groupDetails: GroupDetails;
}

const EditGroupBodyComponent = ({
    editGroup,
    groupDetails,
}: EditGroupBodyComponentProps) => {
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

    function doEdit() {
        editGroup({
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
                            doEdit();
                        }}
                    >
                        Edit
                    </CommonButton>
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
                                managementPermissions={managementPermissions}
                                setManagementPermissions={
                                    setManagementPermissions
                                }
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
                                clusterPermissions={clusterPermissions}
                                setClusterPermissions={setClusterPermissions}
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
                                ksqlDbPermissions={ksqlDbPermissions}
                                setKsqlDbPermissions={setKsqlDbPermissions}
                                basePermissions={groupDetails.ksqlDbPermissions}
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
                                    groupDetails.playgroundPermissions
                                }
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default EditGroupBodyComponent;
