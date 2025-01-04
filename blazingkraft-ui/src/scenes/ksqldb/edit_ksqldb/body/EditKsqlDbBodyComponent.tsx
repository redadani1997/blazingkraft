import { Checkbox, Divider, Grid, Input, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTextareaInput from 'scenes/common/input/CommonTextareaInput';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import FilesManagementButton from 'scenes/files/button/FilesManagementButton';
import { KsqlDbDetails } from 'scenes/ksqldb/redux';

interface EditClusterBodyComponentProps {
    isTestKsqlDbJmxConnectivityPending: boolean;
    testKsqlDbJmxConnectivity: (jmxUrl, jmxEnvironment) => void;
    testKsqlDbClientConnectivity: (
        host,
        port,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
        keyStoreEnabled,
        keyStore,
        keyStorePassword,
        trustStoreEnabled,
        trustStore,
        trustStorePassword,
        useTls,
        verifyHost,
        useAlpn,
        executeQueryMaxResultRows,
    ) => void;
    editKsqlDb: (
        color,
        host,
        port,
        basicAuthEnabled,
        basicAuthUsername,
        basicAuthPassword,
        keyStoreEnabled,
        keyStore,
        keyStorePassword,
        trustStoreEnabled,
        trustStore,
        trustStorePassword,
        useTls,
        verifyHost,
        useAlpn,
        executeQueryMaxResultRows,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment: string,
    ) => void;
    isTestKsqlDbClientConnectivityPending: boolean;
    isAuthorizedTestKsqlDbConnectivity: boolean;
    ksqlDbDetails: KsqlDbDetails;
}

const EditClusterBodyComponent = ({
    testKsqlDbClientConnectivity,
    editKsqlDb,
    isTestKsqlDbClientConnectivityPending,
    isAuthorizedTestKsqlDbConnectivity,
    ksqlDbDetails,
    isTestKsqlDbJmxConnectivityPending,
    testKsqlDbJmxConnectivity,
}: EditClusterBodyComponentProps) => {
    const [ksqlDbName, setKsqlDbName] = useState(null);
    const [ksqlDbCode, setKsqlDbCode] = useState(null);
    const [ksqlDbColor, setKsqlDbColor] = useState('#819c4bff');
    const [ksqlDbHost, setKsqlDbHost] = useState('ksqldb-server');
    const [ksqlDbPort, setKsqlDbPort] = useState<number | ''>(8088);
    const [ksqlDbBasicAuthEnabled, setKsqlDbBasicAuthEnabled] = useState(false);
    const [ksqlDbBasicAuthUsername, setKsqlDbBasicAuthUsername] =
        useState(null);
    const [ksqlDbBasicAuthPassword, setKsqlDbBasicAuthPassword] =
        useState(null);
    const [ksqlDbKeyStoreEnabled, setKsqlDbKeyStoreEnabled] = useState(false);
    const [ksqlDbKeyStore, setKsqlDbKeyStore] = useState(null);
    const [ksqlDbKeyStorePassword, setKsqlDbKeyStorePassword] = useState(null);
    const [ksqlDbTrustStoreEnabled, setKsqlDbTrustStoreEnabled] =
        useState(false);
    const [ksqlDbTrustStore, setKsqlDbTrustStore] = useState(null);
    const [ksqlDbTrustStorePassword, setKsqlDbTrustStorePassword] =
        useState(null);
    const [ksqlDbUseTls, setKsqlDbUseTls] = useState(null);
    const [ksqlDbVerifyHost, setKsqlDbVerifyHost] = useState(null);
    const [ksqlDbUseAlpn, setKsqlDbUseAlpn] = useState(null);
    const [
        ksqlDbExecuteQueryMaxResultRows,
        setKsqlDbExecuteQueryMaxResultRows,
    ] = useState(1000);

    const [jmxEnabled, setJmxEnabled] = useState(false);
    const [jmxUrl, setJmxUrl] = useState(
        'service:jmx:rmi:///jndi/rmi://ksqldb-server:1099/jmxrmi',
    );
    const [jmxEnvironment, setJmxEnvironment] = useState(
        CommonUtils.beautifyJson({
            'jmx.remote.credentials': ['userid', 'password'],
        }),
    );

    useEffect(() => {
        setKsqlDbName(ksqlDbDetails.name);
        setKsqlDbCode(ksqlDbDetails.code);
        setKsqlDbColor(ksqlDbDetails.color);
        setKsqlDbHost(ksqlDbDetails.host);
        setKsqlDbPort(ksqlDbDetails.port);
        setKsqlDbBasicAuthEnabled(ksqlDbDetails.basicAuthEnabled);
        setKsqlDbBasicAuthUsername(ksqlDbDetails.basicAuthUsername);
        setKsqlDbBasicAuthPassword(ksqlDbDetails.basicAuthPassword);
        setKsqlDbKeyStoreEnabled(ksqlDbDetails.keyStoreEnabled);
        setKsqlDbKeyStore(ksqlDbDetails.keyStore);
        setKsqlDbKeyStorePassword(ksqlDbDetails.keyStorePassword);
        setKsqlDbTrustStoreEnabled(ksqlDbDetails.trustStoreEnabled);
        setKsqlDbTrustStore(ksqlDbDetails.trustStore);
        setKsqlDbTrustStorePassword(ksqlDbDetails.trustStorePassword);
        setKsqlDbUseTls(ksqlDbDetails.useTls);
        setKsqlDbVerifyHost(ksqlDbDetails.verifyHost);
        setKsqlDbUseAlpn(ksqlDbDetails.useAlpn);
        setKsqlDbExecuteQueryMaxResultRows(
            ksqlDbDetails.executeQueryMaxResultRows,
        );
        setJmxEnabled(ksqlDbDetails.jmxEnabled);
        setJmxUrl(ksqlDbDetails.jmxUrl);
        setJmxEnvironment(
            CommonUtils.beautifyJson(ksqlDbDetails.jmxEnvironment || {}),
        );
    }, [ksqlDbDetails]);

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="ksqldb-name-input-id"
                            label="KsqlDb Name"
                            description="KsqlDb Name"
                            placeholder="KsqlDb Name"
                            onChange={value => {
                                setKsqlDbName(value);
                                setKsqlDbCode(camelCase(value));
                            }}
                            value={ksqlDbName}
                            error={!ksqlDbCode ? true : false}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="ksqldb-code-input-id"
                            label="KsqlDb Code"
                            placeholder="KsqlDb Code"
                            description="Auto Generated KsqlDb Code"
                            value={ksqlDbCode}
                            error={!ksqlDbCode ? true : false}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonColorInput
                            description="KsqlDb Color"
                            label="Color"
                            value={ksqlDbColor}
                            onChange={value => {
                                setKsqlDbColor(value);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3} xl={3}>
                        <CommonTextareaInput
                            id="ksqldb-host-input-id"
                            label="KsqlDb Host"
                            description="KsqlDb Host"
                            placeholder="KsqlDb Host"
                            onChange={value => {
                                setKsqlDbHost(value);
                            }}
                            value={ksqlDbHost}
                            error={!ksqlDbHost ? true : false}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={1} xl={1}>
                        <CommonNumberInput
                            id="ksqldb-port-input-id"
                            label="Port"
                            description="Port"
                            placeholder="Port"
                            onChange={value => {
                                setKsqlDbPort(value);
                            }}
                            value={ksqlDbPort}
                            error={!ksqlDbPort ? true : false}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonButton
                            onClick={() => {
                                editKsqlDb(
                                    ksqlDbColor,
                                    ksqlDbHost,
                                    ksqlDbPort,
                                    ksqlDbBasicAuthEnabled,
                                    ksqlDbBasicAuthUsername,
                                    ksqlDbBasicAuthPassword,
                                    ksqlDbKeyStoreEnabled,
                                    ksqlDbKeyStore,
                                    ksqlDbKeyStorePassword,
                                    ksqlDbTrustStoreEnabled,
                                    ksqlDbTrustStore,
                                    ksqlDbTrustStorePassword,
                                    ksqlDbUseTls,
                                    ksqlDbVerifyHost,
                                    ksqlDbUseAlpn,
                                    ksqlDbExecuteQueryMaxResultRows,
                                    jmxEnabled,
                                    jmxUrl,
                                    jmxEnvironment,
                                );
                            }}
                        >
                            Edit
                        </CommonButton>
                    </Grid.Col>
                    {isAuthorizedTestKsqlDbConnectivity && (
                        <Grid.Col span={12} sm={6} md={4} xl={4}>
                            <CommonButton
                                variant="light"
                                onClick={() => {
                                    if (jmxEnabled) {
                                        testKsqlDbJmxConnectivity(
                                            jmxUrl,
                                            jmxEnvironment,
                                        );
                                    }
                                    testKsqlDbClientConnectivity(
                                        ksqlDbHost,
                                        ksqlDbPort,
                                        ksqlDbBasicAuthEnabled,
                                        ksqlDbBasicAuthUsername,
                                        ksqlDbBasicAuthPassword,
                                        ksqlDbKeyStoreEnabled,
                                        ksqlDbKeyStore,
                                        ksqlDbKeyStorePassword,
                                        ksqlDbTrustStoreEnabled,
                                        ksqlDbTrustStore,
                                        ksqlDbTrustStorePassword,
                                        ksqlDbUseTls,
                                        ksqlDbVerifyHost,
                                        ksqlDbUseAlpn,
                                        ksqlDbExecuteQueryMaxResultRows,
                                    );
                                }}
                                loading={
                                    isTestKsqlDbClientConnectivityPending ||
                                    isTestKsqlDbJmxConnectivityPending
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
                                    <Divider
                                        label="Basic"
                                        labelPosition="center"
                                    />
                                    <Grid className="py-2">
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={2}
                                            xl={2}
                                        >
                                            <CommonCheckbox
                                                label="Basic Auth Enabled"
                                                checked={ksqlDbBasicAuthEnabled}
                                                onChange={() => {
                                                    setKsqlDbBasicAuthEnabled(
                                                        !ksqlDbBasicAuthEnabled,
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
                                                    setKsqlDbBasicAuthUsername(
                                                        value,
                                                    );
                                                }}
                                                value={ksqlDbBasicAuthUsername}
                                                disabled={
                                                    !ksqlDbBasicAuthEnabled
                                                }
                                                error={
                                                    ksqlDbBasicAuthEnabled &&
                                                    !ksqlDbBasicAuthUsername
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
                                                    setKsqlDbBasicAuthPassword(
                                                        value,
                                                    );
                                                }}
                                                value={ksqlDbBasicAuthPassword}
                                                disabled={
                                                    !ksqlDbBasicAuthEnabled
                                                }
                                                error={
                                                    ksqlDbBasicAuthEnabled &&
                                                    !ksqlDbBasicAuthPassword
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Divider
                                        label="Key Store"
                                        labelPosition="center"
                                    />
                                    <Grid className="py-2">
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={2}
                                            xl={2}
                                        >
                                            <Input.Wrapper label="Key Store Enabled">
                                                <Checkbox
                                                    checked={
                                                        ksqlDbKeyStoreEnabled
                                                    }
                                                    onChange={() => {
                                                        setKsqlDbKeyStoreEnabled(
                                                            !ksqlDbKeyStoreEnabled,
                                                        );
                                                    }}
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                            className="flex flex-col"
                                        >
                                            <Text size="sm">
                                                Key Store File
                                            </Text>
                                            <FilesManagementButton
                                                setValue={setKsqlDbKeyStore}
                                                value={ksqlDbKeyStore}
                                            />
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                        >
                                            <CommonTextInput
                                                label="Key Store Password"
                                                placeholder="Key Store Password"
                                                onChange={value => {
                                                    setKsqlDbKeyStorePassword(
                                                        value,
                                                    );
                                                }}
                                                value={ksqlDbKeyStorePassword}
                                                disabled={
                                                    !ksqlDbKeyStoreEnabled
                                                }
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Divider
                                        label="Trust Store"
                                        labelPosition="center"
                                    />
                                    <Grid className="py-2">
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={2}
                                            xl={2}
                                        >
                                            <Input.Wrapper label="Trust Store Enabled">
                                                <Checkbox
                                                    checked={
                                                        ksqlDbTrustStoreEnabled
                                                    }
                                                    onChange={() => {
                                                        setKsqlDbTrustStoreEnabled(
                                                            !ksqlDbTrustStoreEnabled,
                                                        );
                                                    }}
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                            className="flex flex-col"
                                        >
                                            <Text size="sm">
                                                Trust Store File
                                            </Text>
                                            <FilesManagementButton
                                                setValue={setKsqlDbTrustStore}
                                                value={ksqlDbTrustStore}
                                            />
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={4}
                                            xl={4}
                                        >
                                            <CommonTextInput
                                                label="Trust Store Password"
                                                placeholder="Trust Store Password"
                                                onChange={value => {
                                                    setKsqlDbTrustStorePassword(
                                                        value,
                                                    );
                                                }}
                                                value={ksqlDbTrustStorePassword}
                                                disabled={
                                                    !ksqlDbTrustStoreEnabled
                                                }
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            ),
                        },
                        {
                            label: 'Complementary',
                            value: 'Complementary',
                            children: (
                                <div className="flex flex-col">
                                    <Grid>
                                        <Grid.Col span={12} sm={6} md={4}>
                                            <CommonNumberInput
                                                value={
                                                    ksqlDbExecuteQueryMaxResultRows
                                                }
                                                onChange={value => {
                                                    setKsqlDbExecuteQueryMaxResultRows(
                                                        value,
                                                    );
                                                }}
                                                label="Execute Query Max Result Rows"
                                                placeholder="Execute Query Max Result Rows"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={3}>
                                            <Input.Wrapper label="Use Tls">
                                                <Checkbox
                                                    checked={ksqlDbUseTls}
                                                    onChange={() => {
                                                        setKsqlDbUseTls(
                                                            !ksqlDbUseTls,
                                                        );
                                                    }}
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={3}>
                                            <Input.Wrapper label="Verify Host">
                                                <Checkbox
                                                    checked={ksqlDbVerifyHost}
                                                    onChange={() => {
                                                        setKsqlDbVerifyHost(
                                                            !ksqlDbVerifyHost,
                                                        );
                                                    }}
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={2}>
                                            <Input.Wrapper label="Use Alpn">
                                                <Checkbox
                                                    checked={ksqlDbUseAlpn}
                                                    onChange={() => {
                                                        setKsqlDbUseAlpn(
                                                            !ksqlDbUseAlpn,
                                                        );
                                                    }}
                                                />
                                            </Input.Wrapper>
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

export default EditClusterBodyComponent;
