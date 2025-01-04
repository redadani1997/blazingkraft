import { Grid, Input } from '@mantine/core';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import {
    ProducerConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import {
    IBlazingKRaftProducerConfigurationStorage,
    ProducerUtils,
} from 'common/utils/ProducerUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import BlazingProducerSerializerConfiguration from './BlazingProducerSerializerConfiguration';

interface ProducerSerializerConfigurationProps {
    producerConfiguration: ProducerConfiguration;
    setKeySerializerConfiguration: any;
    setValueSerializerConfiguration: any;

    valueSerializer: ProducerSerializer;
    setValueSerializer: (valueSerializer: ProducerSerializer) => void;

    keySerializer: ProducerSerializer;
    setKeySerializer: (keySerializer: ProducerSerializer) => void;

    keySerializerConfiguration: Map<string, any>;
    valueSerializerConfiguration: Map<string, any>;

    setKafkaValueSchema: (schema: string) => void;
    setKafkaKeySchema: (schema: string) => void;
}

function handleSchemaSerializerChange(
    serializer: ProducerSerializer,
    setSchema: (schema: string) => void,
    storageSerializer: ProducerSerializer | undefined,
    storageSchema: string | undefined,
) {
    const isSameAsStorage =
        storageSerializer && storageSerializer === serializer;

    if (serializer === 'JSON_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
        );
    } else if (serializer === 'AVRO_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_AVRO_SCHEMA_DEFAULT,
        );
    } else if (serializer === 'PROTOBUF_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT,
        );
    }
}

function modalBody(
    setKeySerializerConfiguration: any,
    setValueSerializerConfiguration: any,
    valueSerializer: ProducerSerializer,
    setValueSerializer: (valueSerializer: ProducerSerializer) => void,
    keySerializer: ProducerSerializer,
    setKeySerializer: (keySerializer: ProducerSerializer) => void,
    keySerializerConfiguration: Map<string, any>,
    valueSerializerConfiguration: Map<string, any>,
    producerConfiguration: ProducerConfiguration,
    serializerTab: string,
    setSerializerTab: (serializerTab: string) => void,
    serializerOptions,
    setKafkaValueSchema: (schema: string) => void,
    setKafkaKeySchema: (schema: string) => void,
    blazingKRaftProducerConfigurationStorage: IBlazingKRaftProducerConfigurationStorage | null,
) {
    const items: CommonTabsItemProps[] = [];
    if (ProducerUtils.isSchemaRegistrySerializer(keySerializer)) {
        items.push({
            value: 'Key Props',
            label: 'Key Props',
            children: (
                <BlazingProducerSerializerConfiguration
                    perRequestSerializer={
                        producerConfiguration.perRequestKeySerializer
                    }
                    serializerConfiguration={keySerializerConfiguration}
                    setSerializerConfiguration={setKeySerializerConfiguration}
                    serializer={keySerializer}
                    isKey={true}
                />
            ),
        });
    }
    if (ProducerUtils.isSchemaRegistrySerializer(valueSerializer)) {
        items.push({
            value: 'Value Props',
            label: 'Value Props',
            children: (
                <BlazingProducerSerializerConfiguration
                    perRequestSerializer={
                        producerConfiguration.perRequestValueSerializer
                    }
                    serializerConfiguration={valueSerializerConfiguration}
                    setSerializerConfiguration={setValueSerializerConfiguration}
                    serializer={valueSerializer}
                    isKey={false}
                />
            ),
        });
    }

    return (
        <div className="flex flex-col">
            <Grid className="items-end pt-2">
                <Grid.Col span={12} sm={6}>
                    <Input.Wrapper required label="Key Serializer">
                        <CommonSelect
                            data={serializerOptions}
                            placeholder={
                                keySerializer ||
                                'Please select a key serializer'
                            }
                            value={keySerializer}
                            onChange={value => {
                                setKeySerializer(value);
                                handleSchemaSerializerChange(
                                    value,
                                    setKafkaKeySchema,
                                    blazingKRaftProducerConfigurationStorage?.keySerializer,
                                    blazingKRaftProducerConfigurationStorage?.kafkaKeySchema,
                                );
                            }}
                            error={!keySerializer ? true : false}
                            disabled={
                                !producerConfiguration.perRequestKeySerializer
                            }
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <Input.Wrapper required label="Value Serializer">
                        <CommonSelect
                            data={serializerOptions}
                            placeholder={
                                valueSerializer ||
                                'Please select a value serializer'
                            }
                            value={valueSerializer}
                            onChange={value => {
                                setValueSerializer(value);
                                handleSchemaSerializerChange(
                                    value,
                                    setKafkaValueSchema,
                                    blazingKRaftProducerConfigurationStorage?.valueSerializer,
                                    blazingKRaftProducerConfigurationStorage?.kafkaValueSchema,
                                );
                            }}
                            error={!valueSerializer ? true : false}
                            disabled={
                                !producerConfiguration.perRequestValueSerializer
                            }
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>
            {ProducerUtils.hasSchemaRegistrySerializer(
                keySerializer,
                valueSerializer,
            ) && (
                <CommonTabs
                    container={{
                        variant: 'outline',
                        defaultValue: serializerTab,
                        value: serializerTab,
                        onTabChange: setSerializerTab,
                        className: 'mt-4',
                    }}
                    items={items}
                />
            )}
        </div>
    );
}

function ProducerSerializerConfiguration({
    producerConfiguration,
    setKeySerializerConfiguration,
    setValueSerializerConfiguration,
    valueSerializer,
    keySerializer,
    keySerializerConfiguration,
    valueSerializerConfiguration,
    setKeySerializer,
    setValueSerializer,
    setKafkaKeySchema,
    setKafkaValueSchema,
}: ProducerSerializerConfigurationProps) {
    const [isSerializersPropsModalOpen, setIsSerializersPropsModalOpen] =
        useState(false);
    const [serializerTab, setSerializerTab] = useState<string>(
        ProducerUtils.isSchemaRegistrySerializer(keySerializer)
            ? 'Key Props'
            : 'Value Props',
    );
    useEffect(() => {
        if (ProducerUtils.isSchemaRegistrySerializer(keySerializer)) {
            setSerializerTab('Key Props');
        } else {
            setSerializerTab('Value Props');
        }
    }, [keySerializer]);
    useEffect(() => {
        if (ProducerUtils.isSchemaRegistrySerializer(valueSerializer)) {
            setSerializerTab('Value Props');
        } else {
            setSerializerTab('Key Props');
        }
    }, [valueSerializer]);

    const [
        getBlazingKRaftProducerConfigurationStorage,
        setBlazingKRaftProducerConfigurationStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Producer Configuration',
    });

    const blazingKRaftProducerConfigurationStorage: IBlazingKRaftProducerConfigurationStorage | null =
        useMemo(() => {
            return ProducerUtils.retrieveBlazingKRaftProducerConfigurationStorage(
                getBlazingKRaftProducerConfigurationStorage,
            );
        }, []);

    const serializerOptions = useMemo(() => {
        if (
            producerConfiguration &&
            CommonValidationUtils.isTruthy(
                producerConfiguration.schemaRegistryCode,
            )
        ) {
            return [
                ...ProducerUtils.PRODUCER_SERIALIZER_COMMON_OPTIONS,
                ...ProducerUtils.PRODUCER_SERIALIZER_SCHEMA_REGISTRY_OPTIONS,
            ];
        } else {
            return ProducerUtils.PRODUCER_SERIALIZER_COMMON_OPTIONS;
        }
    }, [producerConfiguration]);

    return (
        <>
            <CommonTooltip
                maxWidth="100%"
                label={
                    <div className="flex flex-col">
                        <div className="text-sm">
                            <span className="font-bold">Key Serializer:</span>{' '}
                            {
                                ProducerUtils
                                    .PRODUCER_SERIALIZER_LABEL_BY_VALUE[
                                    keySerializer
                                ]
                            }
                        </div>
                        <div className="text-sm pt-3">
                            <span className="font-bold">Value Serializer:</span>{' '}
                            {
                                ProducerUtils
                                    .PRODUCER_SERIALIZER_LABEL_BY_VALUE[
                                    valueSerializer
                                ]
                            }
                        </div>
                    </div>
                }
            >
                <CommonButton
                    variant="outline"
                    onClick={() => setIsSerializersPropsModalOpen(true)}
                >
                    Serializers
                </CommonButton>
            </CommonTooltip>
            <CommonModal
                modalTitle="Serializers Configuration"
                isOpen={isSerializersPropsModalOpen}
                onClose={() => setIsSerializersPropsModalOpen(false)}
                modalBody={modalBody(
                    setKeySerializerConfiguration,
                    setValueSerializerConfiguration,
                    valueSerializer,
                    setValueSerializer,
                    keySerializer,
                    setKeySerializer,
                    keySerializerConfiguration,
                    valueSerializerConfiguration,
                    producerConfiguration,
                    serializerTab,
                    setSerializerTab,
                    serializerOptions,
                    setKafkaValueSchema,
                    setKafkaKeySchema,
                    blazingKRaftProducerConfigurationStorage,
                )}
            />
        </>
    );
}

export default ProducerSerializerConfiguration;
