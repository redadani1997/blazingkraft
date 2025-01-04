import { Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { OIDCProviderUtils } from 'common/utils/OIDCProviderUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
import CommonCopy from 'scenes/common/copy/CommonCopy';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonMultiSelect from 'scenes/common/select/CommonMultiSelect';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { OIDCProvider } from 'scenes/oidc_provider/redux';

interface OIDCProviderDetailsBodyComponentProps {
    OIDCProviderDetails: OIDCProvider;
    OIDCProviderWellKnownConfiguration: {
        [key: string]: any;
    };
}

const OIDCProviderDetailsBodyComponent = ({
    OIDCProviderDetails,
    OIDCProviderWellKnownConfiguration,
}: OIDCProviderDetailsBodyComponentProps) => {
    const [name, setName] = useState(OIDCProviderDetails.name);
    const [code, setCode] = useState(OIDCProviderDetails.code);
    const [issuer, setIssuer] = useState(OIDCProviderDetails.issuer);
    const [clientId, setClientId] = useState(OIDCProviderDetails.clientId);
    const [clientSecret, setClientSecret] = useState(
        OIDCProviderDetails.clientSecret,
    );
    const [pkceEnabled, setPkceEnabled] = useState(
        OIDCProviderDetails.pkceEnabled,
    );
    const [providerType, setProviderType] = useState(
        OIDCProviderDetails.providerType,
    );
    const [scopes, setScopes] = useState<string[]>(OIDCProviderDetails.scopes);

    useEffect(() => {
        setName(OIDCProviderDetails.name);
        setCode(OIDCProviderDetails.code);
        setIssuer(OIDCProviderDetails.issuer);
        setClientId(OIDCProviderDetails.clientId);
        setClientSecret(OIDCProviderDetails.clientSecret);
        setPkceEnabled(OIDCProviderDetails.pkceEnabled);
        setProviderType(OIDCProviderDetails.providerType);
        setScopes(OIDCProviderDetails.scopes);
    }, [OIDCProviderDetails]);

    return (
        <CommonTabs
            container={{
                variant: 'default',
                defaultValue: 'Settings',
                className: 'h-full',
            }}
            items={[
                {
                    label: 'Settings',
                    value: 'Settings',
                    children: (
                        <div className="flex flex-col">
                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={3}>
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
                                        disabled
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} md={3}>
                                    <CommonTextInput
                                        placeholder="Code"
                                        label="Code"
                                        description="Auto Generated Code"
                                        value={code}
                                        disabled
                                        error={!code ? true : false}
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={6}>
                                    <CommonTextInput
                                        placeholder="No Issuer Selected"
                                        label={
                                            <Text className="flex items-center">
                                                Issuer
                                                <CommonCopy
                                                    text={issuer}
                                                    actionIconClassName="pl-2"
                                                />
                                            </Text>
                                        }
                                        value={issuer}
                                        onChange={value => {
                                            setIssuer(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>
                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={6}>
                                    <CommonTextInput
                                        placeholder="No Client ID Selected"
                                        label={
                                            <Text className="flex items-center">
                                                Client ID
                                                <CommonCopy
                                                    text={clientId}
                                                    actionIconClassName="pl-2"
                                                />
                                            </Text>
                                        }
                                        value={clientId}
                                        onChange={value => {
                                            setClientId(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>
                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={6}>
                                    <CommonTextInput
                                        placeholder="No Client Secret Selected"
                                        label={
                                            <Text className="flex items-center">
                                                Client Secret
                                                <CommonCopy
                                                    text={clientSecret}
                                                    actionIconClassName="pl-2"
                                                />
                                            </Text>
                                        }
                                        value={clientSecret}
                                        onChange={value => {
                                            setClientSecret(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid className="items-end pb-4">
                                <Grid.Col span={12} md={6}>
                                    <CommonMultiSelect
                                        data={
                                            OIDCProviderUtils.COMMON_SCOPES_OPTIONS
                                        }
                                        placeholder="Scopes"
                                        label="Scopes"
                                        value={scopes}
                                        creatable
                                        onChange={(value: string[]) => {
                                            if (
                                                !value ||
                                                value.includes('openid') ===
                                                    false
                                            ) {
                                                return;
                                            }
                                            setScopes(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid className="items-start pb-4">
                                <Grid.Col span={12} md={4}>
                                    <CommonSelect
                                        data={
                                            OIDCProviderUtils.COMMON_PROVIDER_TYPES_OPTIONS
                                        }
                                        placeholder="Provider Type"
                                        label="Provider Type"
                                        value={providerType}
                                        creatable
                                        onChange={value => {
                                            setProviderType(value);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} md={2}>
                                    <CommonCheckbox
                                        label="PKCE Enabled"
                                        checked={pkceEnabled}
                                        onChange={() => {
                                            setPkceEnabled(!pkceEnabled);
                                        }}
                                        disabled
                                    />
                                </Grid.Col>
                            </Grid>
                        </div>
                    ),
                },

                {
                    label: 'Well Known Configuration',
                    value: 'Well Known Configuration',
                    children: (
                        <CommonEditorWrapper minHeight="23rem">
                            <CommonEditor
                                content={CommonUtils.beautifyJson(
                                    OIDCProviderWellKnownConfiguration,
                                )}
                                defaultValue={CommonUtils.beautifyJson(
                                    OIDCProviderWellKnownConfiguration,
                                )}
                                onContentChange={null}
                                language="json"
                                readOnly
                            />
                        </CommonEditorWrapper>
                    ),
                },
            ]}
        />
    );
};

export default OIDCProviderDetailsBodyComponent;
