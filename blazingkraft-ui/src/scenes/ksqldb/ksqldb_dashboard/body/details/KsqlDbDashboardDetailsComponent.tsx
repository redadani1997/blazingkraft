import { Checkbox, Divider, Grid, Input, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import FilesManagementButton from 'scenes/files/button/FilesManagementButton';
import { KsqlDbDetails } from 'scenes/ksqldb/redux';

interface KsqlDbDashboardDetailsComponentProps {
    ksqlDbDetails: KsqlDbDetails;
}

const KsqlDbDashboardDetailsComponent = ({
    ksqlDbDetails,
}: KsqlDbDashboardDetailsComponentProps) => {
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
                            value={ksqlDbDetails.name}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonTextInput
                            id="ksqldb-code-input-id"
                            label="KsqlDb Code"
                            placeholder="KsqlDb Code"
                            description="Auto Generated KsqlDb Code"
                            value={ksqlDbDetails.code}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={4} xl={4}>
                        <CommonColorInput
                            description="KsqlDb Color"
                            label="Color"
                            value={ksqlDbDetails.color}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3} xl={3}>
                        <CommonTextInput
                            id="ksqldb-host-input-id"
                            label="KsqlDb Host"
                            description="KsqlDb Host"
                            placeholder="KsqlDb Host"
                            value={ksqlDbDetails.host}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={1} xl={1}>
                        <CommonNumberInput
                            id="ksqldb-port-input-id"
                            label="Port"
                            description="Port"
                            placeholder="Port"
                            value={ksqlDbDetails.port}
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
                                                checked={
                                                    ksqlDbDetails.basicAuthEnabled
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
                                                label="Basic Auth Username"
                                                placeholder="Basic Auth Username"
                                                value={
                                                    ksqlDbDetails.basicAuthUsername
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
                                                label="Basic Auth Password"
                                                placeholder="Basic Auth Password"
                                                value={
                                                    ksqlDbDetails.basicAuthPassword
                                                }
                                                disabled
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
                                                        ksqlDbDetails.keyStoreEnabled
                                                    }
                                                    disabled
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
                                                setValue={() => {
                                                    // no-op
                                                }}
                                                value={ksqlDbDetails.keyStore}
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
                                                label="Key Store Password"
                                                placeholder="Key Store Password"
                                                value={
                                                    ksqlDbDetails.keyStorePassword
                                                }
                                                disabled
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
                                                        ksqlDbDetails.trustStoreEnabled
                                                    }
                                                    disabled
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
                                                setValue={() => {
                                                    // no-op
                                                }}
                                                value={ksqlDbDetails.trustStore}
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
                                                label="Trust Store Password"
                                                placeholder="Trust Store Password"
                                                value={
                                                    ksqlDbDetails.trustStorePassword
                                                }
                                                disabled
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
                                                    ksqlDbDetails.executeQueryMaxResultRows
                                                }
                                                label="Execute Query Max Result Rows"
                                                placeholder="Execute Query Max Result Rows"
                                                disabled
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={3}>
                                            <Input.Wrapper label="Use Tls">
                                                <Checkbox
                                                    checked={
                                                        ksqlDbDetails.useTls
                                                    }
                                                    disabled
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={3}>
                                            <Input.Wrapper label="Verify Host">
                                                <Checkbox
                                                    checked={
                                                        ksqlDbDetails.verifyHost
                                                    }
                                                    disabled
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col span={12} sm={6} md={2}>
                                            <Input.Wrapper label="Use Alpn">
                                                <Checkbox
                                                    checked={
                                                        ksqlDbDetails.useAlpn
                                                    }
                                                    disabled
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
                                                        disabled
                                                        checked={
                                                            ksqlDbDetails.jmxEnabled
                                                        }
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        value={
                                                            ksqlDbDetails.jmxUrl
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
                                                        ksqlDbDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    defaultValue={CommonUtils.beautifyJson(
                                                        ksqlDbDetails.jmxEnvironment ||
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

export default KsqlDbDashboardDetailsComponent;
