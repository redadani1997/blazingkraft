import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { KafkaConnectDetails } from 'scenes/kafka_connect/redux';

interface KafkaConnectDashboardDetailsComponentProps {
    kafkaConnectDetails: KafkaConnectDetails;
}

const KafkaConnectDashboardDetailsComponent = ({
    kafkaConnectDetails,
}: KafkaConnectDashboardDetailsComponentProps) => {
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

    useEffect(() => {
        setKafkaConnectName(kafkaConnectDetails.name);
        setKafkaConnectCode(kafkaConnectDetails.code);
        setKafkaConnectColor(kafkaConnectDetails.color);
        setKafkaConnectClusterCode(kafkaConnectDetails.clusterCode);
        setKafkaConnectUrl(kafkaConnectDetails.url);
        setKafkaConnectBasicAuthEnabled(kafkaConnectDetails.basicAuthEnabled);
        setKafkaConnectBasicAuthUsername(kafkaConnectDetails.basicAuthUsername);
        setKafkaConnectBasicAuthPassword(kafkaConnectDetails.basicAuthPassword);
    }, [kafkaConnectDetails]);

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
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="kafka-connect-url-input-id"
                            label="Kafka Connect Url"
                            description="Kafka Connect Url"
                            placeholder="Kafka Connect Url"
                            onChange={value => {
                                setKafkaConnectUrl(value);
                            }}
                            value={kafkaConnectUrl}
                            error={!kafkaConnectUrl ? true : false}
                            disabled
                        />
                    </Grid.Col>
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                    <Grid>
                                        <Grid.Col span={12} sm={6} md={4}>
                                            <CommonSelect
                                                label="Cluster"
                                                onChange={value => {
                                                    setKafkaConnectClusterCode(
                                                        value,
                                                    );
                                                }}
                                                disabled
                                                placeholder="No Cluster Selected"
                                                data={[]}
                                                value={kafkaConnectClusterCode}
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
                                                        disabled
                                                        checked={
                                                            kafkaConnectDetails.jmxEnabled
                                                        }
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        value={
                                                            kafkaConnectDetails.jmxUrl
                                                        }
                                                        placeholder="Select a JMX Url"
                                                        disabled
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
                                                    content={CommonUtils.beautifyJson(
                                                        kafkaConnectDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    defaultValue={CommonUtils.beautifyJson(
                                                        kafkaConnectDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    readOnly
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

export default KafkaConnectDashboardDetailsComponent;
