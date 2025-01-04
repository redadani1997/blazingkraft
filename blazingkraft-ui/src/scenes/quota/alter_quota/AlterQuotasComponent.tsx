import {
    ActionIcon,
    Alert,
    Anchor,
    Button,
    Divider,
    Grid,
    Text,
    Tooltip,
} from '@mantine/core';
import { QuotaEntity, QuotaEntry, QuotaOperation } from 'common/types/quota';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TbAlertCircle, TbCirclePlus, TbPencil, TbX } from 'react-icons/tb';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';

interface AlterQuotasComponentProps {
    quotaEntryToAlter: QuotaEntry;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
    alterQuotas: (
        entities: QuotaEntity[],
        operations: QuotaOperation[],
    ) => void;
    isAlterQuotasPending: boolean;
}

function renderModalBody(
    quotaEntitiesToAlter: QuotaEntityToAlter[],
    setQuotaEntitiesToAlter: (
        quotaEntitiesToAlter: QuotaEntityToAlter[],
    ) => void,
    quotaOperationsToAlter: QuotaOperationToAlter[],
    setQuotaOperationsToAlter: (
        quotaOperationsToAlter: QuotaOperationToAlter[],
    ) => void,
) {
    return (
        <>
            <div className="flex items-center">
                <Text size="sm" className="italic font-semibold">
                    Entities:
                </Text>
                <ActionIcon
                    color="blue"
                    className="ml-2"
                    onClick={() => {
                        setQuotaEntitiesToAlter([
                            ...quotaEntitiesToAlter,
                            {
                                entityName: '',
                                entityType: '',
                                lineId: CommonUtils.getNextId(
                                    quotaEntitiesToAlter,
                                ),
                            },
                        ]);
                    }}
                >
                    <TbCirclePlus size="1.4rem" />
                </ActionIcon>
            </div>
            {quotaEntitiesToAlter.map(entity => {
                return (
                    <Grid key={entity.lineId}>
                        <Grid.Col span={12} sm={6}>
                            <div className="flex items-end w-full">
                                <Tooltip label="Remove Line">
                                    <ActionIcon
                                        className="mr-4"
                                        onClick={() => {
                                            const newEntities =
                                                quotaEntitiesToAlter.filter(
                                                    _entity =>
                                                        entity.lineId !==
                                                        _entity.lineId,
                                                );
                                            setQuotaEntitiesToAlter(
                                                newEntities,
                                            );
                                        }}
                                    >
                                        <CgCloseR color="red" size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                                <CommonTextInput
                                    wrapperClassName="w-full"
                                    label="Entity Name"
                                    placeholder="Entity Name"
                                    value={entity.entityName}
                                    onChange={value => {
                                        const newEntities =
                                            quotaEntitiesToAlter.map(
                                                _entity => {
                                                    if (
                                                        entity.lineId ===
                                                        _entity.lineId
                                                    ) {
                                                        return {
                                                            ..._entity,
                                                            entityName: value,
                                                        };
                                                    }
                                                    return _entity;
                                                },
                                            );
                                        setQuotaEntitiesToAlter(newEntities);
                                    }}
                                />
                            </div>
                        </Grid.Col>

                        <Grid.Col span={12} sm={6}>
                            <CommonTextInput
                                label="Entity Type"
                                placeholder="Entity Type"
                                value={entity.entityType}
                                onChange={value => {
                                    const newEntities =
                                        quotaEntitiesToAlter.map(_entity => {
                                            if (
                                                entity.lineId === _entity.lineId
                                            ) {
                                                return {
                                                    ..._entity,
                                                    entityType: value,
                                                };
                                            }
                                            return _entity;
                                        });
                                    setQuotaEntitiesToAlter(newEntities);
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                );
            })}
            <Divider className="my-4" />
            <div className="flex items-center">
                <Text size="sm" className="italic font-semibold">
                    Operations:
                </Text>
                <ActionIcon
                    color="blue"
                    className="ml-2"
                    onClick={() => {
                        setQuotaOperationsToAlter([
                            ...quotaOperationsToAlter,
                            {
                                key: '',
                                value: null,
                                lineId: CommonUtils.getNextId(
                                    quotaOperationsToAlter,
                                ),
                            },
                        ]);
                    }}
                >
                    <TbCirclePlus size="1.4rem" />
                </ActionIcon>
            </div>
            {quotaOperationsToAlter.map(operation => {
                return (
                    <Grid key={operation.lineId}>
                        <Grid.Col span={12} sm={6}>
                            <div className="flex items-end w-full">
                                <Tooltip label="Remove Line">
                                    <ActionIcon
                                        className="mr-4"
                                        onClick={() => {
                                            const newOperations =
                                                quotaOperationsToAlter.filter(
                                                    _operation =>
                                                        operation.lineId !==
                                                        _operation.lineId,
                                                );
                                            setQuotaOperationsToAlter(
                                                newOperations,
                                            );
                                        }}
                                    >
                                        <CgCloseR color="red" size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                                <CommonTextInput
                                    wrapperClassName="w-full"
                                    label="Key"
                                    placeholder="Key"
                                    value={operation.key}
                                    onChange={value => {
                                        const newOperations =
                                            quotaOperationsToAlter.map(
                                                _operation => {
                                                    if (
                                                        operation.lineId ===
                                                        _operation.lineId
                                                    ) {
                                                        return {
                                                            ..._operation,
                                                            key: value,
                                                        };
                                                    }
                                                    return _operation;
                                                },
                                            );
                                        setQuotaOperationsToAlter(
                                            newOperations,
                                        );
                                    }}
                                />
                            </div>
                        </Grid.Col>

                        <Grid.Col span={12} sm={6}>
                            <CommonTextInput
                                label="Value"
                                placeholder="Value"
                                value={operation.value}
                                onChange={value => {
                                    const newOperations =
                                        quotaOperationsToAlter.map(
                                            _operation => {
                                                if (
                                                    operation.lineId ===
                                                    _operation.lineId
                                                ) {
                                                    return {
                                                        ..._operation,
                                                        value: value,
                                                    };
                                                }
                                                return _operation;
                                            },
                                        );
                                    setQuotaOperationsToAlter(newOperations);
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                );
            })}
            <Divider className="my-4" />
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
                className="mb-2"
            >
                <Text>* The Entity Name is generally the principal name.</Text>
                <Text>
                    * The Entity Type is the principal type{' '}
                    <CommonCode>user</CommonCode>,
                    <CommonCode>client-id</CommonCode>...
                </Text>
                <Text>* The Operation Key is the quota type to alter.</Text>
                <Text>
                    * The Operation Value if set then the existing value is
                    updated, otherwise if null, the existing value is cleared.
                </Text>
            </Alert>
            <Text className="pt-2" size="xs" color="dimmed">
                <Anchor
                    size="xs"
                    href={`https://jeqo.github.io/posts/2022-05-11-kafka-quotas/`}
                    target="_blank"
                    className="mr-2"
                >
                    Click here
                </Anchor>
                to learn more about Quotas.
            </Text>
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
                leftIcon={<TbPencil size="1rem" />}
                onClick={() => action()}
            >
                Alter
            </Button>
        </div>
    );
}

interface QuotaEntityToAlter {
    entityName: string;
    entityType: string;
    lineId: number;
}

interface QuotaOperationToAlter {
    key: string;
    value: string | null;
    lineId: number;
}

function AlterQuotasComponent({
    isModalOpen,
    setIsModalOpen,
    alterQuotas,
    isAlterQuotasPending,
    quotaEntryToAlter,
}: AlterQuotasComponentProps) {
    const [quotaEntitiesToAlter, setQuotaEntitiesToAlter] = useState<
        QuotaEntityToAlter[]
    >([]);
    const [quotaOperationsToAlter, setQuotaOperationsToAlter] = useState<
        QuotaOperationToAlter[]
    >([]);

    const action = () =>
        alterQuotas(quotaEntitiesToAlter, quotaOperationsToAlter);
    const modalBody = renderModalBody(
        quotaEntitiesToAlter,
        setQuotaEntitiesToAlter,
        quotaOperationsToAlter,
        setQuotaOperationsToAlter,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    useEffect(() => {
        if (quotaEntryToAlter) {
            const quotaEntities =
                quotaEntryToAlter.entities?.map((entity, index) => ({
                    entityName: entity.entityName,
                    entityType: entity.entityType,
                    lineId: index,
                })) || [];
            setQuotaEntitiesToAlter(quotaEntities);

            const quotaOperations =
                quotaEntryToAlter.quotas?.map((quota, index) => ({
                    key: quota.key,
                    value: quota.value,
                    lineId: index,
                })) || [];
            setQuotaOperationsToAlter(quotaOperations);
        }
    }, [quotaEntryToAlter]);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Quotas Alteration</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isAlterQuotasPending}
        />
    );
}

export default AlterQuotasComponent;
