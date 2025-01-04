import { Alert, Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import { ClusterMeta } from 'scenes/cluster/redux';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTextareaInput from 'scenes/common/input/CommonTextareaInput';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { KafkaConnectDetails } from 'scenes/kafka_connect/redux';

interface EditKafkaConnectBodyComponentProps {
    isTestKafkaConnectJmxConnectivityPending: boolean;
    testKafkaConnectJmxConnectivity: (jmxUrl, jmxEnvironment) => void;
    clusters: ClusterMeta[];
    testKafkaConnectClientConnectivity: (
        url: string,
        basicAuthEnabled: boolean,
        basicAuthUsername: string,
        basicAuthPassword: string,
    ) => void;
    editKafkaConnect: (
        color: string,
        clusterCode: string,
        url: string,
        basicAuthEnabled: boolean,
        basicAuthUsername: string,
        basicAuthPassword: string,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment: string,
    ) => void;
    isTestKafkaConnectClientConnectivityPending: boolean;
    isAuthorizedTestKafkaConnectConnectivity: boolean;
    isGetAllClustersPending: boolean;
    kafkaConnectDetails: KafkaConnectDetails;
}

const EditKafkaConnectBodyComponent = ({
    clusters,
    testKafkaConnectClientConnectivity,
    editKafkaConnect,
    isTestKafkaConnectClientConnectivityPending,
    isAuthorizedTestKafkaConnectConnectivity,
    isGetAllClustersPending,
    kafkaConnectDetails,
    isTestKafkaConnectJmxConnectivityPending,
    testKafkaConnectJmxConnectivity,
}: EditKafkaConnectBodyComponentProps) => {
    const [kafkaConnectName, setKafkaConnectName] = useState(null);
    const [kafkaConnectCode, setKafkaConnectCode] = useState(null);
    const [kafkaConnectColor, setKafkaConnectColor] = useState('#819c4bff');
    const [kafkaConnectClusterCode, setKafkaConnectClusterCode] =
        useState(null);
    const [kafkaConnectUrl, setKafkaConnectUrl] = useState(null);
    const [kafkaConnectBasicAuthEnabled, setKafkaConnectBasicAuthEnabled] =
        useState(false);
    const [kafkaConnectBasicAuthUsername, setKafkaConnectBasicAuthUsername] =
        useState(null);
    const [kafkaConnectBasicAuthPassword, setKafkaConnectBasicAuthPassword] =
        useState(null);

    const [jmxEnabled, setJmxEnabled] = useState(false);
    const [jmxUrl, setJmxUrl] = useState(
        'service:jmx:rmi:///jndi/rmi://kafka-connect:9997/jmxrmi',
    );
    const [jmxEnvironment, setJmxEnvironment] = useState(
        CommonUtils.beautifyJson({
            'jmx.remote.credentials': ['userid', 'password'],
        }),
    );

    useEffect(() => {
        setKafkaConnectName(kafkaConnectDetails.name);
        setKafkaConnectCode(kafkaConnectDetails.code);
        setKafkaConnectColor(kafkaConnectDetails.color);
        setKafkaConnectClusterCode(kafkaConnectDetails.clusterCode);
        setKafkaConnectUrl(kafkaConnectDetails.url);
        setKafkaConnectBasicAuthEnabled(kafkaConnectDetails.basicAuthEnabled);
        setKafkaConnectBasicAuthUsername(kafkaConnectDetails.basicAuthUsername);
        setKafkaConnectBasicAuthPassword(kafkaConnectDetails.basicAuthPassword);
        setJmxEnabled(kafkaConnectDetails.jmxEnabled);
        setJmxUrl(kafkaConnectDetails.jmxUrl);
        setJmxEnvironment(
            CommonUtils.beautifyJson(kafkaConnectDetails.jmxEnvironment || {}),
        );
    }, [kafkaConnectDetails]);

    const clusterOptions = useMemo(
        () =>
            clusters.map(cluster => ({
                label: cluster.name,
                value: cluster.code,
            })),
        [clusters],
    );

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="kafka-connect-name-input-id"
                            label="Kafka Connect Name"
                            description="Kafka Connect Name"
                            placeholder="Kafka Connect Name"
                            onChange={value => {
                                setKafkaConnectName(value);
                                setKafkaConnectCode(camelCase(value));
                            }}
                            value={kafkaConnectName}
                            error={!kafkaConnectCode ? true : false}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="kafka-connect-code-input-id"
                            label="Kafka Connect Code"
                            placeholder="Kafka Connect Code"
                            description="Auto Generated Kafka Connect Code"
                            value={kafkaConnectCode}
                            error={!kafkaConnectCode ? true : false}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonColorInput
                            description="Kafka Connect Color"
                            label="Kafka Connect Color"
                            value={kafkaConnectColor}
                            onChange={value => {
                                setKafkaConnectColor(value);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextareaInput
                            id="kafka-connect-url-input-id"
                            label="Kafka Connect Url"
                            description="Kafka Connect Url"
                            placeholder="Kafka Connect Url"
                            onChange={value => {
                                setKafkaConnectUrl(value);
                            }}
                            value={kafkaConnectUrl}
                            error={!kafkaConnectUrl ? true : false}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonButton
                            onClick={() => {
                                editKafkaConnect(
                                    kafkaConnectColor,
                                    kafkaConnectClusterCode,
                                    kafkaConnectUrl,
                                    kafkaConnectBasicAuthEnabled,
                                    kafkaConnectBasicAuthUsername,
                                    kafkaConnectBasicAuthPassword,
                                    jmxEnabled,
                                    jmxUrl,
                                    jmxEnvironment,
                                );
                            }}
                        >
                            Edit
                        </CommonButton>
                    </Grid.Col>
                    {isAuthorizedTestKafkaConnectConnectivity && (
                        <Grid.Col span={12} sm={6} md={4} xl={4}>
                            <CommonButton
                                variant="light"
                                onClick={() => {
                                    if (jmxEnabled) {
                                        testKafkaConnectJmxConnectivity(
                                            jmxUrl,
                                            jmxEnvironment,
                                        );
                                    }
                                    testKafkaConnectClientConnectivity(
                                        kafkaConnectUrl,
                                        kafkaConnectBasicAuthEnabled,
                                        kafkaConnectBasicAuthUsername,
                                        kafkaConnectBasicAuthPassword,
                                    );
                                }}
                                loading={
                                    isTestKafkaConnectClientConnectivityPending ||
                                    isTestKafkaConnectJmxConnectivityPending
                                }
                            >
                                Test Connectivity
                            </CommonButton>
                        </Grid.Col>
                    )}
                </Grid>

                <CommonTabs
                    container={{
                        variant: 'default',
                        defaultValue: 'Security',
                        className: 'h-full',
                    }}
                    items={[
                        {
                            label: 'Security',
                            value: 'Security',
                            children: (
                                <div className="flex flex-col">
                                    <Alert
                                        icon={<TbAlertCircle size="1.4rem" />}
                                        title="Info"
                                        color="blue"
                                        className="mb-4"
                                    >
                                        <Text>
                                            If your Kafka Connect Broker
                                            supports Basic Auth, you can enable
                                            it here.
                                        </Text>
                                    </Alert>
                                    <Grid>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={2}
                                            xl={2}
                                        >
                                            <CommonCheckbox
                                                label="Basic Auth Enabled"
                                                checked={
                                                    kafkaConnectBasicAuthEnabled
                                                }
                                                onChange={() => {
                                                    setKafkaConnectBasicAuthEnabled(
                                                        !kafkaConnectBasicAuthEnabled,
                                                    );
                                                }}
                                            />
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                        >
                                            <CommonTextInput
                                                label="Basic Auth Username"
                                                placeholder="Basic Auth Username"
                                                onChange={value => {
                                                    setKafkaConnectBasicAuthUsername(
                                                        value,
                                                    );
                                                }}
                                                value={
                                                    kafkaConnectBasicAuthUsername
                                                }
                                                disabled={
                                                    !kafkaConnectBasicAuthEnabled
                                                }
                                                error={
                                                    kafkaConnectBasicAuthEnabled &&
                                                    !kafkaConnectBasicAuthUsername
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                        >
                                            <CommonTextInput
                                                label="Basic Auth Password"
                                                placeholder="Basic Auth Password"
                                                onChange={value => {
                                                    setKafkaConnectBasicAuthPassword(
                                                        value,
                                                    );
                                                }}
                                                value={
                                                    kafkaConnectBasicAuthPassword
                                                }
                                                disabled={
                                                    !kafkaConnectBasicAuthEnabled
                                                }
                                                error={
                                                    kafkaConnectBasicAuthEnabled &&
                                                    !kafkaConnectBasicAuthPassword
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            ),
                        },
                        {
                            label: 'Cluster',
                            value: 'Cluster',
                            children: (
                                <div className="flex flex-col">
                                    <Alert
                                        icon={<TbAlertCircle size="1.4rem" />}
                                        title="Info"
                                        color="blue"
                                        className="mb-4"
                                    >
                                        <Text>
                                            Selecting a Cluster is not
                                            mandatory, for the moment the only
                                            usage is being able to goto the
                                            topics page directly from the
                                            connectors page.
                                        </Text>
                                    </Alert>
                                    <Grid>
                                        <Grid.Col span={12} sm={6} md={4}>
                                            <CommonSelect
                                                label="Cluster"
                                                onChange={value => {
                                                    setKafkaConnectClusterCode(
                                                        value,
                                                    );
                                                }}
                                                placeholder="Select a Cluster"
                                                data={clusterOptions}
                                                value={kafkaConnectClusterCode}
                                                loading={
                                                    isGetAllClustersPending
                                                }
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            ),
                        },
                        {
                            label: 'Monitoring',
                            value: 'Monitoring',
                            children: (
                                <div className="h-full w-full flex flex-col">
                                    <Grid className="flex-1">
                                        <Grid.Col span={12} md={6}>
                                            <Grid>
                                                <Grid.Col span={12}>
                                                    <CommonCheckbox
                                                        label="JMX Enabled"
                                                        onChange={() => {
                                                            setJmxEnabled(
                                                                !jmxEnabled,
                                                            );
                                                        }}
                                                        checked={jmxEnabled}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        onChange={setJmxUrl}
                                                        value={jmxUrl}
                                                        disabled={!jmxEnabled}
                                                        placeholder="Select a JMX Url"
                                                    />
                                                </Grid.Col>
                                            </Grid>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            md={6}
                                            className="pt-4"
                                        >
                                            <CommonEditorWrapper minHeight="15rem">
                                                <CommonEditor
                                                    content={jmxEnvironment}
                                                    defaultValue={
                                                        jmxEnvironment
                                                    }
                                                    onContentChange={
                                                        setJmxEnvironment
                                                    }
                                                    readOnly={!jmxEnabled}
                                                    language="json"
                                                />
                                            </CommonEditorWrapper>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default EditKafkaConnectBodyComponent;
