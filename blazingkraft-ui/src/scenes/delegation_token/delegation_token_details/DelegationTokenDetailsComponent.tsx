import { Alert, Grid, Input, Text } from '@mantine/core';
import { DelegationToken } from 'common/types/delegation_token';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { DelegationTokenUtils } from 'common/utils/DelegationTokenUtils';
import { useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface DelegationTokenDetailsComponentProps {
    delegationToken: DelegationToken | null;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

function renderModalBody(
    delegationToken: DelegationToken | null,
    timezone: string,
    setTimezone: Function,
) {
    if (CommonValidationUtils.isFalsy(delegationToken)) return <></>;
    return (
        <div className="flex flex-col">
            <Grid>
                <Grid.Col span={12}>
                    <Input.Wrapper label="Timezone">
                        <CommonSelect
                            placeholder="Select Timezone"
                            creatable
                            searchable
                            value={timezone}
                            data={CommonTimeUtils.TIMEZONES_OPTIONS}
                            onChange={value => setTimezone(value)}
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>
            <Grid className="pt-4">
                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Issued At"
                        content={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.issueTimestamp,
                            timezone,
                            undefined,
                        )}
                        copyText={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.issueTimestamp,
                            timezone,
                            undefined,
                        )}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Expires At"
                        content={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.expiryTimestamp,
                            timezone,
                            undefined,
                        )}
                        copyText={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.expiryTimestamp,
                            timezone,
                            undefined,
                        )}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Max Timestamp"
                        content={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.maxTimestamp,
                            timezone,
                            undefined,
                        )}
                        copyText={CommonTimeUtils.timestampToFormattedDate(
                            delegationToken.tokenInformation.maxTimestamp,
                            timezone,
                            undefined,
                        )}
                    />
                </Grid.Col>

                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Owner"
                        content={DelegationTokenUtils.formatOwner(
                            delegationToken.tokenInformation.owner,
                        )}
                        copyText={DelegationTokenUtils.formatOwner(
                            delegationToken.tokenInformation.owner,
                        )}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Requester"
                        content={DelegationTokenUtils.formatRequester(
                            delegationToken.tokenInformation.tokenRequester,
                        )}
                        copyText={DelegationTokenUtils.formatRequester(
                            delegationToken.tokenInformation.tokenRequester,
                        )}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={4}>
                    <CommonCardDetails
                        title="Renewers"
                        content={DelegationTokenUtils.formatRenewers(
                            delegationToken.tokenInformation.renewers,
                        )}
                        copyText={DelegationTokenUtils.formatRenewers(
                            delegationToken.tokenInformation.renewers,
                        )}
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <CommonCardDetails
                        title="Token ID"
                        content={delegationToken.tokenInformation.tokenId}
                        copyText={delegationToken.tokenInformation.tokenId}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <CommonCardDetails
                        title="HMAC"
                        content={delegationToken.hmac}
                        copyText={delegationToken.hmac}
                    />
                </Grid.Col>
            </Grid>

            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Info"
                color="blue"
                className="mt-4"
            >
                <Text>
                    * The Timezone input is only used to display the timestamps
                    in a readable format.
                </Text>
                <Text>
                    * The hmac is the signature of the delegation token and it's
                    stored as a byte array, the value displayed is a base64
                    representation.
                </Text>
            </Alert>
        </div>
    );
}

function DelegationTokenDetailsComponent({
    isModalOpen,
    delegationToken,
    setIsModalOpen,
}: DelegationTokenDetailsComponentProps) {
    const [timezone, setTimezone] = useState(CommonTimeUtils.CURRENT_TIMEZONE);
    const modalBody = renderModalBody(delegationToken, timezone, setTimezone);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Delegation Token Details</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
        />
    );
}

export default DelegationTokenDetailsComponent;
