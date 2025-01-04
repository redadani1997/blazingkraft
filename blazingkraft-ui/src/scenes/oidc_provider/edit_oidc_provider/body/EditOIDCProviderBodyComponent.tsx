import { Grid } from '@mantine/core';
import { OIDCProviderUtils } from 'common/utils/OIDCProviderUtils';
import camelCase from 'lodash.camelcase';
import { useEffect, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonMultiSelect from 'scenes/common/select/CommonMultiSelect';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { OIDCProvider } from 'scenes/oidc_provider/redux';
import { OIDCProviderRequest } from 'scenes/oidc_provider/redux/actions';

interface EditOIDCProviderBodyComponentProps {
    testOIDCProviderConnectivities: (authority: string) => void;
    editOIDCProvider: (request: OIDCProviderRequest) => void;
    isEditOIDCProviderPending: boolean;
    OIDCProviderDetails: OIDCProvider;
    isAuthorizedTestOIDCProviderConfiguration: boolean;
}

const EditOIDCProviderBodyComponent = ({
    isEditOIDCProviderPending,
    testOIDCProviderConnectivities,
    editOIDCProvider,
    OIDCProviderDetails,
    isAuthorizedTestOIDCProviderConfiguration,
}: EditOIDCProviderBodyComponentProps) => {
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

    function doEdit() {
        editOIDCProvider({
            name,
            code,
            issuer,
            clientId,
            clientSecret,
            pkceEnabled,
            scopes,
            providerType,
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
                    <div className="flex">
                        <CommonButton
                            onClick={() => {
                                doEdit();
                            }}
                        >
                            Edit
                        </CommonButton>
                        {isAuthorizedTestOIDCProviderConfiguration && (
                            <CommonButton
                                className="ml-3"
                                variant="light"
                                onClick={() => {
                                    testOIDCProviderConnectivities(issuer);
                                }}
                                loading={isEditOIDCProviderPending}
                            >
                                Test Connectivity
                            </CommonButton>
                        )}
                    </div>
                </Grid.Col>
            </Grid>

            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6}>
                    <CommonTextInput
                        placeholder="Issuer"
                        label="Issuer"
                        value={issuer}
                        onChange={value => {
                            setIssuer(value);
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6}>
                    <CommonTextInput
                        placeholder="Client ID"
                        label="Client ID"
                        value={clientId}
                        onChange={value => {
                            setClientId(value);
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6}>
                    <CommonTextInput
                        placeholder="Client Secret"
                        label="Client Secret"
                        value={clientSecret}
                        onChange={value => {
                            setClientSecret(value);
                        }}
                    />
                </Grid.Col>
            </Grid>

            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6}>
                    <CommonMultiSelect
                        data={OIDCProviderUtils.COMMON_SCOPES_OPTIONS}
                        placeholder="Scopes"
                        label="Scopes"
                        value={scopes}
                        creatable
                        onChange={(value: string[]) => {
                            if (
                                !value ||
                                value.includes('openid') === false ||
                                value.includes('offline_access') === false
                            ) {
                                return;
                            }
                            setScopes(value);
                        }}
                    />
                </Grid.Col>
            </Grid>

            <Grid className="items-start pb-4">
                <Grid.Col span={12} md={4}>
                    <CommonSelect
                        data={OIDCProviderUtils.COMMON_PROVIDER_TYPES_OPTIONS}
                        placeholder="Provider Type"
                        label="Provider Type"
                        value={providerType}
                        creatable
                        onChange={value => {
                            setProviderType(value);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={2}>
                    <CommonCheckbox
                        label="PKCE Enabled"
                        checked={pkceEnabled}
                        onChange={() => {
                            setPkceEnabled(!pkceEnabled);
                        }}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default EditOIDCProviderBodyComponent;
