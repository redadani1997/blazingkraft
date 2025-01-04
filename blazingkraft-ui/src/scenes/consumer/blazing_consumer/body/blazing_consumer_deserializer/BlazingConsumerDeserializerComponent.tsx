import { Grid, Input } from '@mantine/core';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import {
    ConsumerConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import {
    ConsumerUtils,
    IBlazingKRaftConsumerConfigurationStorage,
} from 'common/utils/ConsumerUtils';
import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import BlazingConsumerSchemaTabs from './schema/BlazingConsumerSchemaTabs';
import BlazingConsumerDeserializerConfigurationTabs from './schema_registry/BlazingConsumerDeserializerConfigurationTabs';

interface BlazingConsumerDeserializerComponentProps {
    consumerConfiguration: ConsumerConfiguration;
    setKeyDeserializerConfiguration: any;

    setValueDeserializerConfiguration: any;

    valueDeserializer: ConsumerDeserializer;
    setValueDeserializer: (valueDeserializer: ConsumerDeserializer) => void;

    keyDeserializer: ConsumerDeserializer;
    setKeyDeserializer: (keyDeserializer: ConsumerDeserializer) => void;

    keyDeserializerConfiguration: Map<string, any>;
    valueDeserializerConfiguration: Map<string, any>;

    keySchema: string;
    valueSchema: string;
    setKeySchema: (keySchema: string) => void;
    setValueSchema: (valueSchema: string) => void;
    setIsKeySchemaSyntaxValid: (isKeySchemaSyntaxValid: boolean) => void;
    setIsKeySchemaDefinitionValid: (
        isKeySchemaDefinitionValid: boolean,
    ) => void;
    setIsValueSchemaSyntaxValid: (isValueSchemaSyntaxValid: boolean) => void;
    setIsValueSchemaDefinitionValid: (
        isValueSchemaDefinitionValid: boolean,
    ) => void;
}

function handleSchemaDeserializerChange(
    deserializer: ConsumerDeserializer,
    setSchema,
    setIsSchemaSyntaxValid,
    setIsSchemaDefinitionValid,
    storageDeserializer: ConsumerDeserializer | undefined,
    storageSchema: string | undefined,
) {
    const isSameAsStorage =
        storageDeserializer && storageDeserializer === deserializer;

    if (deserializer === 'JSON_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
        );
        setIsSchemaSyntaxValid(true);
        setIsSchemaDefinitionValid(true);
    } else if (deserializer === 'AVRO_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_AVRO_SCHEMA_DEFAULT,
        );
        setIsSchemaSyntaxValid(true);
        setIsSchemaDefinitionValid(true);
    } else if (deserializer === 'PROTOBUF_SCHEMA') {
        setSchema(
            isSameAsStorage
                ? storageSchema
                : PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT,
        );
        setIsSchemaSyntaxValid(true);
        setIsSchemaDefinitionValid(true);
    }
}

function modalBody(
    setKeyDeserializerConfiguration: any,
    setValueDeserializerConfiguration: any,
    valueDeserializer: ConsumerDeserializer,
    setValueDeserializer: (valueDeserializer: ConsumerDeserializer) => void,
    keyDeserializer: ConsumerDeserializer,
    setKeyDeserializer: (keyDeserializer: ConsumerDeserializer) => void,
    keyDeserializerConfiguration: Map<string, any>,
    valueDeserializerConfiguration: Map<string, any>,
    consumerConfiguration: ConsumerConfiguration,
    deserializerTab: string,
    setDeserializerTab: (deserializerTab: string) => void,
    schemaTab: string,
    setSchemaTab: (schemaTab: string) => void,

    deserializerOptions: any[],

    blazingKRaftConsumerConfigurationStorage: IBlazingKRaftConsumerConfigurationStorage | null,

    keySchema: string,
    valueSchema: string,
    setKeySchema: (keySchema: string) => void,
    setValueSchema: (valueSchema: string) => void,
    setIsKeySchemaSyntaxValid: (isKeySchemaSyntaxValid: boolean) => void,
    setIsKeySchemaDefinitionValid: (
        isKeySchemaDefinitionValid: boolean,
    ) => void,
    setIsValueSchemaSyntaxValid: (isValueSchemaSyntaxValid: boolean) => void,
    setIsValueSchemaDefinitionValid: (
        isValueSchemaDefinitionValid: boolean,
    ) => void,
) {
    return (
        <div className="flex flex-col">
            <Grid className="items-end pt-2">
                <Grid.Col span={12} sm={6}>
                    <Input.Wrapper required label="Key Deserializer">
                        <CommonSelect
                            data={deserializerOptions}
                            placeholder={
                                keyDeserializer ||
                                'Please select a key deserializer'
                            }
                            value={keyDeserializer}
                            onChange={(value: ConsumerDeserializer) => {
                                setKeyDeserializer(value);
                                handleSchemaDeserializerChange(
                                    value,
                                    setKeySchema,
                                    setIsKeySchemaSyntaxValid,
                                    setIsKeySchemaDefinitionValid,
                                    blazingKRaftConsumerConfigurationStorage?.keyDeserializer,
                                    blazingKRaftConsumerConfigurationStorage?.kafkaKeySchema,
                                );
                            }}
                            error={!keyDeserializer ? true : false}
                            disabled={
                                !consumerConfiguration.perRequestKeyDeserializer
                            }
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <Input.Wrapper required label="Value Deserializer">
                        <CommonSelect
                            data={deserializerOptions}
                            placeholder={
                                valueDeserializer ||
                                'Please select a value deserializer'
                            }
                            value={valueDeserializer}
                            onChange={value => {
                                setValueDeserializer(value);
                                handleSchemaDeserializerChange(
                                    value,
                                    setValueSchema,
                                    setIsValueSchemaSyntaxValid,
                                    setIsValueSchemaDefinitionValid,
                                    blazingKRaftConsumerConfigurationStorage?.valueDeserializer,
                                    blazingKRaftConsumerConfigurationStorage?.kafkaValueSchema,
                                );
                            }}
                            error={!valueDeserializer ? true : false}
                            disabled={
                                !consumerConfiguration.perRequestValueDeserializer
                            }
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
            </Grid>
            {ConsumerUtils.hasSchemaDeserializer(
                keyDeserializer,
                valueDeserializer,
            ) && (
                <BlazingConsumerSchemaTabs
                    keyDeserializer={keyDeserializer}
                    valueDeserializer={valueDeserializer}
                    schemaTab={schemaTab}
                    setSchemaTab={setSchemaTab}
                    keySchema={keySchema}
                    valueSchema={valueSchema}
                    setKeySchema={setKeySchema}
                    setValueSchema={setValueSchema}
                    setIsKeySchemaSyntaxValid={setIsKeySchemaSyntaxValid}
                    setIsKeySchemaDefinitionValid={
                        setIsKeySchemaDefinitionValid
                    }
                    setIsValueSchemaSyntaxValid={setIsValueSchemaSyntaxValid}
                    setIsValueSchemaDefinitionValid={
                        setIsValueSchemaDefinitionValid
                    }
                />
            )}
            {ConsumerUtils.hasSchemaRegistryDeserializer(
                keyDeserializer,
                valueDeserializer,
            ) && (
                <BlazingConsumerDeserializerConfigurationTabs
                    consumerConfiguration={consumerConfiguration}
                    keyDeserializer={keyDeserializer}
                    valueDeserializer={valueDeserializer}
                    deserializerTab={deserializerTab}
                    setDeserializerTab={setDeserializerTab}
                    keyDeserializerConfiguration={keyDeserializerConfiguration}
                    valueDeserializerConfiguration={
                        valueDeserializerConfiguration
                    }
                    setKeyDeserializerConfiguration={
                        setKeyDeserializerConfiguration
                    }
                    setValueDeserializerConfiguration={
                        setValueDeserializerConfiguration
                    }
                />
            )}
        </div>
    );
}

function BlazingConsumerDeserializerComponent({
    consumerConfiguration,
    setKeyDeserializerConfiguration,
    setValueDeserializerConfiguration,
    valueDeserializer,
    keyDeserializer,
    keyDeserializerConfiguration,
    valueDeserializerConfiguration,
    setKeyDeserializer,
    setValueDeserializer,

    keySchema,
    setIsKeySchemaDefinitionValid,
    setIsKeySchemaSyntaxValid,
    setIsValueSchemaDefinitionValid,
    setIsValueSchemaSyntaxValid,
    setKeySchema,
    setValueSchema,
    valueSchema,
}: BlazingConsumerDeserializerComponentProps) {
    const [isDeserializersPropsModalOpen, setIsDeserializersPropsModalOpen] =
        useState(false);
    const [deserializerTab, setDeserializerTab] = useState<string>(
        ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)
            ? 'Key Props'
            : 'Value Props',
    );
    const [schemaTab, setSchemaTab] = useState<string>(
        ConsumerUtils.isSchemaEditorDeserializer(keyDeserializer)
            ? 'Key Schema'
            : 'Value Schema',
    );

    useEffect(() => {
        if (ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)) {
            setDeserializerTab('Key Props');
        } else {
            setDeserializerTab('Value Props');
        }
        if (ConsumerUtils.isSchemaEditorDeserializer(keyDeserializer)) {
            setSchemaTab('Key Schema');
        } else {
            setSchemaTab('Value Schema');
        }
    }, [keyDeserializer]);
    useEffect(() => {
        if (ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer)) {
            setDeserializerTab('Value Props');
        } else {
            setDeserializerTab('Key Props');
        }
        if (ConsumerUtils.isSchemaEditorDeserializer(valueDeserializer)) {
            setSchemaTab('Value Schema');
        } else {
            setSchemaTab('Key Schema');
        }
    }, [valueDeserializer]);

    const deserializerOptions = useMemo(() => {
        if (
            consumerConfiguration &&
            CommonValidationUtils.isTruthy(
                consumerConfiguration.schemaRegistryCode,
            )
        ) {
            return [
                ...ConsumerUtils.CONSUMER_DESERIALIZER_COMMON_OPTIONS,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_SCHEMA_OPTIONS,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_SCHEMA_REGISTRY_OPTIONS,
            ];
        } else {
            return [
                ...ConsumerUtils.CONSUMER_DESERIALIZER_COMMON_OPTIONS,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_SCHEMA_OPTIONS,
            ];
        }
    }, [consumerConfiguration]);

    const [
        getBlazingKRaftConsumerConfigurationStorage,
        setBlazingKRaftConsumerConfigurationStorage,
    ] = useCommonLocalStorage({
        key: 'Blazing KRaft Consumer Configuration',
    });

    const blazingKRaftConsumerConfigurationStorage: IBlazingKRaftConsumerConfigurationStorage | null =
        useMemo(() => {
            return ConsumerUtils.retrieveBlazingKRaftConsumerConfigurationStorage(
                getBlazingKRaftConsumerConfigurationStorage,
            );
        }, []);

    return (
        <>
            <CommonTooltip
                maxWidth="100%"
                label={
                    <div className="flex flex-col">
                        <div className="text-sm">
                            <span className="font-bold">Key Deserializer:</span>{' '}
                            {
                                ConsumerUtils
                                    .CONSUMER_DESERIALIZER_LABEL_BY_VALUE[
                                    keyDeserializer
                                ]
                            }
                        </div>
                        <div className="text-sm pt-3">
                            <span className="font-bold">
                                Value Deserializer:
                            </span>{' '}
                            {
                                ConsumerUtils
                                    .CONSUMER_DESERIALIZER_LABEL_BY_VALUE[
                                    valueDeserializer
                                ]
                            }
                        </div>
                    </div>
                }
            >
                <CommonButton
                    variant="outline"
                    onClick={() => setIsDeserializersPropsModalOpen(true)}
                >
                    Deserializers
                </CommonButton>
            </CommonTooltip>
            <CommonModal
                modalTitle="Deserializers Configuration"
                isOpen={isDeserializersPropsModalOpen}
                onClose={() => setIsDeserializersPropsModalOpen(false)}
                modalBody={modalBody(
                    setKeyDeserializerConfiguration,
                    setValueDeserializerConfiguration,
                    valueDeserializer,
                    setValueDeserializer,
                    keyDeserializer,
                    setKeyDeserializer,
                    keyDeserializerConfiguration,
                    valueDeserializerConfiguration,
                    consumerConfiguration,
                    deserializerTab,
                    setDeserializerTab,
                    schemaTab,
                    setSchemaTab,
                    deserializerOptions,
                    blazingKRaftConsumerConfigurationStorage,
                    keySchema,
                    valueSchema,
                    setKeySchema,
                    setValueSchema,
                    setIsKeySchemaSyntaxValid,
                    setIsKeySchemaDefinitionValid,
                    setIsValueSchemaSyntaxValid,
                    setIsValueSchemaDefinitionValid,
                )}
            />
        </>
    );
}

export default BlazingConsumerDeserializerComponent;
