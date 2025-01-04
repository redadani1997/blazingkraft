import {
    ActionIcon,
    Alert,
    Button,
    Checkbox,
    Divider,
    Grid,
    Input,
    Text,
    Tooltip,
} from '@mantine/core';
import { KafkaPrincipal } from 'common/types/delegation_token';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import moment from 'moment';
import { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TbAlertCircle, TbCirclePlus, TbPlus, TbX } from 'react-icons/tb';
import CommonDateTimePicker from 'scenes/common/date/CommonDateTimePicker';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface CreateDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    createDelegationToken: (
        owner: KafkaPrincipal,
        renewers: KafkaPrincipal[],
        maxLifeTimeMs,
    ) => void;
    isCreateDelegationTokenPending: boolean;
}

function renderModalBody(
    owner: KafkaPrincipal,
    setOwner: Function,
    renewers: KafkaPrincipalRenewer[],
    setRenewers: Function,
    maxLifeTimeMs: number,
    setMaxLifeTimeMs: Function,
    maxLifeTimeMsDate,
    setMaxLifeTimeMsDate,
    maxLifeTimeMsEnabled,
    setMaxLifeTimeMsEnabled,
    timezone,
    setTimezone,
) {
    return (
        <>
            <Text size="sm" className="italic font-semibold">
                Owner:
            </Text>
            <Grid>
                <Grid.Col span={12} sm={4}>
                    <CommonTextInput
                        label="Principal Type"
                        placeholder="Principal Type"
                        value={owner.principalType}
                        onChange={value => {
                            setOwner({
                                ...owner,
                                principalType: value,
                            });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} sm={4}>
                    <CommonTextInput
                        label="Principal Name"
                        placeholder="Principal Name"
                        value={owner.principalName}
                        onChange={value => {
                            setOwner({
                                ...owner,
                                principalName: value,
                            });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} sm={4}>
                    <Input.Wrapper label="Token Authenticated">
                        <Checkbox
                            className="pt-2"
                            checked={owner.tokenAuthenticated}
                            onChange={() =>
                                setOwner({
                                    ...owner,
                                    tokenAuthenticated:
                                        !owner.tokenAuthenticated,
                                })
                            }
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>
            <Divider className="my-4" />
            <div className="flex items-center">
                <Text size="sm" className="italic font-semibold">
                    Renewers:
                </Text>
                <ActionIcon
                    color="blue"
                    className="ml-2"
                    onClick={() => {
                        setRenewers([
                            ...renewers,
                            {
                                principalType: '',
                                principalName: '',
                                tokenAuthenticated: false,
                                lineId:
                                    renewers.length > 0
                                        ? Math.max(
                                              ...renewers.map(
                                                  renewer => renewer.lineId,
                                              ),
                                          ) + 1
                                        : 0,
                            },
                        ]);
                    }}
                >
                    <TbCirclePlus size="1.4rem" />
                </ActionIcon>
            </div>
            {renewers.map(renewer => {
                return (
                    <Grid key={renewer.lineId}>
                        <Grid.Col span={12} sm={4}>
                            <div className="flex items-end w-full">
                                <Tooltip label="Remove Line">
                                    <ActionIcon
                                        className="mr-4"
                                        onClick={() => {
                                            const newRenewers = renewers.filter(
                                                _renewer =>
                                                    renewer.lineId !==
                                                    _renewer.lineId,
                                            );
                                            setRenewers(newRenewers);
                                        }}
                                    >
                                        <CgCloseR color="red" size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                                <CommonTextInput
                                    wrapperClassName="w-full"
                                    label="Principal Type"
                                    placeholder="Principal Type"
                                    value={renewer.principalType}
                                    onChange={value => {
                                        const newRenewers = renewers.map(
                                            _renewer => {
                                                if (
                                                    renewer.lineId ===
                                                    _renewer.lineId
                                                ) {
                                                    return {
                                                        ..._renewer,
                                                        principalType: value,
                                                    };
                                                }
                                                return _renewer;
                                            },
                                        );
                                        setRenewers(newRenewers);
                                    }}
                                />
                            </div>
                        </Grid.Col>

                        <Grid.Col span={12} sm={4}>
                            <CommonTextInput
                                label="Principal Name"
                                placeholder="Principal Name"
                                value={renewer.principalName}
                                onChange={value => {
                                    const newRenewers = renewers.map(
                                        _renewer => {
                                            if (
                                                renewer.lineId ===
                                                _renewer.lineId
                                            ) {
                                                return {
                                                    ..._renewer,
                                                    principalName: value,
                                                };
                                            }
                                            return _renewer;
                                        },
                                    );
                                    setRenewers(newRenewers);
                                }}
                            />
                        </Grid.Col>

                        <Grid.Col span={12} sm={4}>
                            <Input.Wrapper label="Token Authenticated">
                                <Checkbox
                                    className="pt-2"
                                    checked={renewer.tokenAuthenticated}
                                    onChange={() => {
                                        const newRenewers = renewers.map(
                                            _renewer => {
                                                if (
                                                    renewer.lineId ===
                                                    _renewer.lineId
                                                ) {
                                                    return {
                                                        ..._renewer,
                                                        tokenAuthenticated:
                                                            !renewer.tokenAuthenticated,
                                                    };
                                                }
                                                return _renewer;
                                            },
                                        );
                                        setRenewers(newRenewers);
                                    }}
                                />
                            </Input.Wrapper>
                        </Grid.Col>
                    </Grid>
                );
            })}
            <Divider className="my-4" />
            <div className="flex pb-2 items-center">
                <Text size="sm" className="italic font-semibold">
                    Max Life Time Ms:
                </Text>
                <Checkbox
                    className="pl-3"
                    checked={maxLifeTimeMsEnabled}
                    onChange={() => {
                        if (maxLifeTimeMsEnabled) {
                            setMaxLifeTimeMs(-1);
                        } else {
                            setMaxLifeTimeMs(
                                CommonTimeUtils.dateToTimestamp(
                                    maxLifeTimeMsDate,
                                    timezone,
                                ),
                            );
                        }
                        setMaxLifeTimeMsEnabled(!maxLifeTimeMsEnabled);
                    }}
                />
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
                                setMaxLifeTimeMs(
                                    CommonTimeUtils.dateToTimestamp(
                                        maxLifeTimeMsDate,
                                        value,
                                    ),
                                );
                                setTimezone(value);
                            }}
                            disabled={!maxLifeTimeMsEnabled}
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={5}>
                    <CommonDateTimePicker
                        onChange={value => {
                            setMaxLifeTimeMs(
                                CommonTimeUtils.dateToTimestamp(
                                    value,
                                    timezone,
                                ),
                            );
                            setMaxLifeTimeMsDate(value);
                        }}
                        value={maxLifeTimeMsDate}
                        label="Date"
                        disabled={!maxLifeTimeMsEnabled}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonNumberInput
                        label="Timestamp"
                        onChange={value => {
                            setMaxLifeTimeMs(value);
                        }}
                        value={maxLifeTimeMs}
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
                <Text>
                    * Not specifying an owner means that the current connected
                    user will be the owner.
                </Text>
                <Text>
                    * Renewers are the principles allowed to renew/expire the
                    created delegation token.
                </Text>
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
                leftIcon={<TbPlus size="1rem" />}
                onClick={() => action()}
            >
                Create
            </Button>
        </div>
    );
}

interface KafkaPrincipalRenewer {
    principalType: string;
    principalName: string;
    tokenAuthenticated: boolean;
    lineId: number;
}

function CreateDelegationToken({
    isModalOpen,
    setIsModalOpen,
    isCreateDelegationTokenPending,
    createDelegationToken,
}: CreateDelegationTokenProps) {
    const [owner, setOwner] = useState<KafkaPrincipal>({
        principalType: '',
        principalName: '',
        tokenAuthenticated: false,
    });
    const [renewers, setRenewers] = useState<KafkaPrincipalRenewer[]>([]);
    const [maxLifeTimeMs, setMaxLifeTimeMs] = useState<number>(-1);
    const [maxLifeTimeMsEnabled, setMaxLifeTimeMsEnabled] =
        useState<boolean>(false);
    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [maxLifeTimeMsDate, setMaxLifeTimeMsDate] = useState<Date>(
        moment(CommonTimeUtils.nowAsDate(timezone)).add(1, 'days').toDate(),
    );

    const action = () => createDelegationToken(owner, renewers, maxLifeTimeMs);

    const modalBody = renderModalBody(
        owner,
        setOwner,
        renewers,
        setRenewers,
        maxLifeTimeMs,
        setMaxLifeTimeMs,
        maxLifeTimeMsDate,
        setMaxLifeTimeMsDate,
        maxLifeTimeMsEnabled,
        setMaxLifeTimeMsEnabled,
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
                    <Text className="pr-2">Delegation Token Creation</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isCreateDelegationTokenPending}
        />
    );
}

export default CreateDelegationToken;
