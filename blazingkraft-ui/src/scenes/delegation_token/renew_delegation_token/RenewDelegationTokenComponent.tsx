import {
    Alert,
    Button,
    Divider,
    Grid,
    Input,
    Text,
    Textarea,
} from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { MdAutorenew } from 'react-icons/md';
import { TbAlertCircle, TbX } from 'react-icons/tb';
import CommonDateTimePicker from 'scenes/common/date/CommonDateTimePicker';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface RenewDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    renewDelegationToken: (hmac, renewalTimePeriodMs) => void;
    isRenewDelegationTokenPending: boolean;
    delegationTokenToRenew: string;
}

function renderModalBody(
    hmac,
    setHmac,
    renewalTimePeriodMs: number,
    setRenewalTimePeriodMs: Function,
    renewalTimePeriodMsDate,
    setRenewalTimePeriodMsDate,
    timezone,
    setTimezone,
) {
    return (
        <>
            <Input.Wrapper label="HMAC">
                <Textarea
                    minRows={2}
                    maxRows={5}
                    value={hmac}
                    onChange={event => {
                        setHmac(event.target.value);
                    }}
                />
            </Input.Wrapper>

            <Divider className="my-4" />
            <div className="flex pb-2 items-center">
                <Text size="sm" className="italic font-semibold">
                    Renewal Time:
                </Text>
            </div>
            <Grid>
                <Grid.Col span={12} sm={6} md={4}>
                    <Input.Wrapper label="Timezone">
                        <CommonSelect
                            placeholder="Select Timezone"
                            creatable
                            searchable
                            value={timezone}
                            data={CommonTimeUtils.TIMEZONES_OPTIONS}
                            onChange={value => {
                                setRenewalTimePeriodMs(
                                    CommonTimeUtils.dateToTimestamp(
                                        renewalTimePeriodMsDate,
                                        value,
                                    ),
                                );
                                setTimezone(value);
                            }}
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={5}>
                    <CommonDateTimePicker
                        onChange={value => {
                            setRenewalTimePeriodMs(
                                CommonTimeUtils.dateToTimestamp(
                                    value,
                                    timezone,
                                ),
                            );
                            setRenewalTimePeriodMsDate(value);
                        }}
                        value={renewalTimePeriodMsDate}
                        label="Date"
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonNumberInput
                        label="Timestamp"
                        onChange={value => {
                            setRenewalTimePeriodMs(value);
                        }}
                        value={renewalTimePeriodMs}
                        disabled
                    />
                </Grid.Col>
            </Grid>
            <Divider className="my-4" />
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
                className="mb-4"
            >
                <Text>* Please provide the hmac in base64 format.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="blue"
                leftIcon={<MdAutorenew size="1rem" />}
                onClick={() => action()}
            >
                Renew
            </Button>
        </div>
    );
}

function RenewDelegationToken({
    isModalOpen,
    setIsModalOpen,
    isRenewDelegationTokenPending,
    renewDelegationToken,
    delegationTokenToRenew,
}: RenewDelegationTokenProps) {
    const [hmac, setHmac] = useState<string>(delegationTokenToRenew);
    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [renewalTimePeriodMsDate, setRenewalTimePeriodMsDate] =
        useState<Date>(
            moment(CommonTimeUtils.nowAsDate(timezone)).add(1, 'days').toDate(),
        );
    const [renewalTimePeriodMs, setRenewalTimePeriodMs] = useState<number>(
        CommonTimeUtils.dateToTimestamp(renewalTimePeriodMsDate, timezone),
    );

    useEffect(() => {
        setHmac(delegationTokenToRenew);
    }, [delegationTokenToRenew]);

    const action = () => renewDelegationToken(hmac, renewalTimePeriodMs);
    const modalBody = renderModalBody(
        hmac,
        setHmac,
        renewalTimePeriodMs,
        setRenewalTimePeriodMs,
        renewalTimePeriodMsDate,
        setRenewalTimePeriodMsDate,
        timezone,
        setTimezone,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Delegation Token Renewal</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isRenewDelegationTokenPending}
        />
    );
}

export default RenewDelegationToken;
