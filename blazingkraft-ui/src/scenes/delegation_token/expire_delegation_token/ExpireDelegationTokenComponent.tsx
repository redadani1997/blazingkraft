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
import { TbAlertCircle, TbClock, TbX } from 'react-icons/tb';
import CommonDateTimePicker from 'scenes/common/date/CommonDateTimePicker';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface ExpireDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    expireDelegationToken: (hmac, expiryTimePeriodMs) => void;
    isExpireDelegationTokenPending: boolean;
    delegationTokenToExpire: string;
}

function renderModalBody(
    hmac,
    setHmac,
    expiryTimePeriodMs: number,
    setExpiryTimePeriodMs: Function,
    expiryTimePeriodMsDate,
    setExpiryTimePeriodMsDate,
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
                    Expiry Time:
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
                                setExpiryTimePeriodMs(
                                    CommonTimeUtils.dateToTimestamp(
                                        expiryTimePeriodMsDate,
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
                            setExpiryTimePeriodMs(
                                CommonTimeUtils.dateToTimestamp(
                                    value,
                                    timezone,
                                ),
                            );
                            setExpiryTimePeriodMsDate(value);
                        }}
                        value={expiryTimePeriodMsDate}
                        label="Date"
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonNumberInput
                        label="Timestamp"
                        onChange={value => {
                            setExpiryTimePeriodMs(value);
                        }}
                        value={expiryTimePeriodMs}
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
                color="red"
                leftIcon={<TbClock size="1rem" />}
                onClick={() => action()}
            >
                Expire
            </Button>
        </div>
    );
}

function ExpireDelegationToken({
    isModalOpen,
    setIsModalOpen,
    isExpireDelegationTokenPending,
    expireDelegationToken,
    delegationTokenToExpire,
}: ExpireDelegationTokenProps) {
    const [hmac, setHmac] = useState<string>(delegationTokenToExpire);
    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [expiryTimePeriodMsDate, setExpiryTimePeriodMsDate] = useState<Date>(
        moment(CommonTimeUtils.nowAsDate(timezone)).add(1, 'days').toDate(),
    );
    const [expiryTimePeriodMs, setExpiryTimePeriodMs] = useState<number>(
        CommonTimeUtils.dateToTimestamp(expiryTimePeriodMsDate, timezone),
    );

    useEffect(() => {
        setHmac(delegationTokenToExpire);
    }, [delegationTokenToExpire]);

    const action = () => expireDelegationToken(hmac, expiryTimePeriodMs);
    const modalBody = renderModalBody(
        hmac,
        setHmac,
        expiryTimePeriodMs,
        setExpiryTimePeriodMs,
        expiryTimePeriodMsDate,
        setExpiryTimePeriodMsDate,
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
                    <Text className="pr-2">Delegation Token Expiry</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isExpireDelegationTokenPending}
        />
    );
}

export default ExpireDelegationToken;
