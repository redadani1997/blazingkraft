import { Grid } from '@mantine/core';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import {
    ProducerConfiguration,
    ProducerSerializer,
    RecordMetadata,
} from 'common/types/producer';
import { TopicDescription } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import {
    IBlazingKRaftProducerConfigurationStorage,
    ProducerUtils,
} from 'common/utils/ProducerUtils';
import { useEffect, useMemo, useRef, useState } from 'react';
import ProducerImportRecords from 'scenes/producer/producer_import_records/ProducerImportRecords';
import BlazingProducerEditor from './blazing_producer_editor/BlazingProducerEditor';
import BlazingProducerFilter from './blazing_producer_filter/BlazingProducerFilter';
import BlazingProducerRecords from './blazing_producer_records/BlazingProducerRecords';

interface BlazingProducerBodyComponentProps {
    producerConfiguration: ProducerConfiguration;
    isGetAllTopicsDescriptionsPending: boolean;
    topicsDescriptions: TopicDescription[];
    topic: string;
    produceBlazingRecord: any;
    setIsImportBlazingRecordsModalOpen: (isOpen: boolean) => void;
    isImportBlazingRecordsModalOpen: boolean;
}

export interface PublishedRecord {
    id: number;
    topic: string;
    recordMetadata?: RecordMetadata;
    key: any;
    keySchema: any;
    keySerializer: ProducerSerializer;
    value: any;
    valueSchema: any;
    valueSerializer: ProducerSerializer;
    headers: any;
    succeeded: boolean;
    errorMessage?: string;
}

const BlazingProducerBodyComponent = ({
    isGetAllTopicsDescriptionsPending,
    produceBlazingRecord,
    topicsDescriptions,
    producerConfiguration,
    topic,
    isImportBlazingRecordsModalOpen,
    setIsImportBlazingRecordsModalOpen,
}: BlazingProducerBodyComponentProps) => {
    const [kafkaKey, setKafkaKey] = useState(null);
    const [kafkaKeySchema, setKafkaKeySchema] = useState(null);
    const [kafkaValue, setKafkaValue] = useState(null);
    const [kafkaValueSchema, setKafkaValueSchema] = useState(null);
    const [kafkaHeaders, setKafkaHeaders] = useState(
        CommonUtils.beautifyJsonString('{"Issuer": "Blazing KRaft"}'),
    );
    const [records, setRecords] = useState<PublishedRecord[]>([]);
    const recordsRef = useRef<PublishedRecord[]>([]);
    const recordIdRef = useRef(0);
    const [isKeyContentSyntaxValid, setIsKeyContentSyntaxValid] =
        useState(true);
    const [isValueContentSyntaxValid, setIsValueContentSyntaxValid] =
        useState(true);
    const [isHeadersSyntaxValid, setIsHeadersSyntaxValid] = useState(true);
    const [isKeySchemaSyntaxValid, setIsKeySchemaSyntaxValid] = useState(true);
    const [isValueSchemaSyntaxValid, setIsValueSchemaSyntaxValid] =
        useState(true);
    const [isKeySchemaDefinitionValid, setIsKeySchemaDefinitionValid] =
        useState(true);
    const [isValueSchemaDefinitionValid, setIsValueSchemaDefinitionValid] =
        useState(true);
    const [isKeyContentSchemaValid, setIsKeyContentSchemaValid] =
        useState(true);
    const [isValueContentSchemaValid, setIsValueContentSchemaValid] =
        useState(true);
    const [partition, setPartition] = useState<number | null>(-1);

    const [keySerializer, setKeySerializer] =
        useState<ProducerSerializer>('STRING');
    const [keySerializerConfiguration, setKeySerializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());
    const [valueSerializer, setValueSerializer] =
        useState<ProducerSerializer>('JSON');
    const [valueSerializerConfiguration, setValueSerializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());

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

    const [initialLoad, setInitialLoad] = useState(false);

    useEffect(() => {
        setInitialLoad(true);
        setKeySerializer(
            !producerConfiguration.perRequestKeySerializer
                ? producerConfiguration.keySerializer
                : 'STRING',
        );
        setValueSerializer(
            !producerConfiguration.perRequestValueSerializer
                ? producerConfiguration.valueSerializer
                : 'JSON',
        );
        if (blazingKRaftProducerConfigurationStorage) {
            setKafkaKey(
                CommonUtils.beautifyJsonString(
                    blazingKRaftProducerConfigurationStorage.kafkaKey,
                ),
            );
            setKafkaValue(
                CommonUtils.beautifyJsonString(
                    blazingKRaftProducerConfigurationStorage.kafkaValue,
                ),
            );
            setKafkaHeaders(
                blazingKRaftProducerConfigurationStorage.kafkaHeaders,
            );
            setKafkaKeySchema(
                blazingKRaftProducerConfigurationStorage.kafkaKeySchema,
            );
            setKafkaValueSchema(
                blazingKRaftProducerConfigurationStorage.kafkaValueSchema,
            );
            if (
                producerConfiguration.perRequestKeySerializer &&
                blazingKRaftProducerConfigurationStorage.keySerializer
            ) {
                setKeySerializer(
                    blazingKRaftProducerConfigurationStorage.keySerializer,
                );
            }
            if (
                producerConfiguration.perRequestValueSerializer &&
                blazingKRaftProducerConfigurationStorage.valueSerializer
            ) {
                setValueSerializer(
                    blazingKRaftProducerConfigurationStorage.valueSerializer,
                );
            }
        }
    }, [producerConfiguration]);

    useEffect(() => {
        const initialValueSerializerConfiguration =
            !producerConfiguration.perRequestValueSerializer
                ? producerConfiguration.valueSerializerConfiguration
                : ProducerUtils.computeInitialSerializerConfiguration(
                      valueSerializer,
                      false,
                      !producerConfiguration.perRequestValueSerializer,
                  );
        setValueSerializerConfiguration(initialValueSerializerConfiguration);
        if (
            blazingKRaftProducerConfigurationStorage &&
            producerConfiguration.perRequestValueSerializer
        ) {
            if (
                blazingKRaftProducerConfigurationStorage.valueSerializerConfiguration
            ) {
                setValueSerializerConfiguration(
                    CommonUtils.objectToMap(
                        blazingKRaftProducerConfigurationStorage.valueSerializerConfiguration,
                    ),
                );
            }
        }
    }, [valueSerializer]);
    useEffect(() => {
        const initialKeySerializerConfiguration =
            !producerConfiguration.perRequestKeySerializer
                ? producerConfiguration.keySerializerConfiguration
                : ProducerUtils.computeInitialSerializerConfiguration(
                      keySerializer,
                      true,
                      !producerConfiguration.perRequestKeySerializer,
                  );
        setKeySerializerConfiguration(initialKeySerializerConfiguration);
        if (
            blazingKRaftProducerConfigurationStorage &&
            producerConfiguration.perRequestKeySerializer
        ) {
            if (
                blazingKRaftProducerConfigurationStorage.keySerializerConfiguration
            ) {
                setKeySerializerConfiguration(
                    CommonUtils.objectToMap(
                        blazingKRaftProducerConfigurationStorage.keySerializerConfiguration,
                    ),
                );
            }
        }
    }, [keySerializer]);

    function doProduce() {
        produceBlazingRecord(
            topic,
            partition,
            kafkaKey,
            kafkaValue,
            kafkaHeaders,
            kafkaKeySchema,
            kafkaValueSchema,
            keySerializer,
            keySerializerConfiguration,
            valueSerializer,
            valueSerializerConfiguration,
        )
            .then((res: { value: { recordMetadata: RecordMetadata } }) => {
                recordsRef.current = [
                    {
                        id: recordIdRef.current++,
                        recordMetadata: res.value.recordMetadata,
                        key: kafkaKey,
                        keySchema: kafkaKeySchema,
                        keySerializer,
                        value: kafkaValue,
                        valueSchema: kafkaValueSchema,
                        valueSerializer,
                        headers: kafkaHeaders,
                        succeeded: true,
                        topic,
                    },
                    ...recordsRef.current,
                ];
                setRecords([...recordsRef.current]);
            })
            .catch((err: any) => {
                recordsRef.current = [
                    {
                        id: recordIdRef.current++,
                        key: kafkaKey,
                        keySchema: kafkaKeySchema,
                        keySerializer,
                        value: kafkaValue,
                        valueSchema: kafkaValueSchema,
                        valueSerializer,
                        headers: kafkaHeaders,
                        succeeded: false,
                        errorMessage: CommonUtils.getRestErrorMessage(err),
                        topic,
                    },
                    ...recordsRef.current,
                ];

                setRecords([...recordsRef.current]);
            })
            .finally(() => {
                ProducerUtils.storeBlazingKRaftProducerConfigurationStorage(
                    {
                        kafkaKey,
                        kafkaValue,
                        kafkaHeaders,
                        kafkaKeySchema,
                        kafkaValueSchema,
                        keySerializer,
                        keySerializerConfiguration: CommonUtils.mapToObject(
                            keySerializerConfiguration,
                        ),
                        valueSerializer,
                        valueSerializerConfiguration: CommonUtils.mapToObject(
                            valueSerializerConfiguration,
                        ),
                    },
                    setBlazingKRaftProducerConfigurationStorage,
                );
            });
    }

    function onImportSuccess(importedRecords: PublishedRecord[]) {
        const improvedImportedRecords = importedRecords.map(record => {
            return {
                ...record,
                id: recordIdRef.current++,
                keySchema: kafkaKeySchema,
                keySerializer,
                valueSchema: kafkaValueSchema,
                valueSerializer,
                topic,
            };
        });
        recordsRef.current = [
            ...improvedImportedRecords,
            ...recordsRef.current,
        ];
        setRecords([...recordsRef.current]);
    }

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <div className="h-auto">
                    <BlazingProducerFilter
                        isGetAllTopicsDescriptionsPending={
                            isGetAllTopicsDescriptionsPending
                        }
                        topicsDescriptions={topicsDescriptions}
                        producerConfiguration={producerConfiguration}
                        topic={topic}
                        partition={partition}
                        setPartition={setPartition}
                        keySerializer={keySerializer}
                        setKeySerializer={setKeySerializer}
                        keySerializerConfiguration={keySerializerConfiguration}
                        setKeySerializerConfiguration={
                            setKeySerializerConfiguration
                        }
                        valueSerializer={valueSerializer}
                        setValueSerializer={setValueSerializer}
                        valueSerializerConfiguration={
                            valueSerializerConfiguration
                        }
                        setValueSerializerConfiguration={
                            setValueSerializerConfiguration
                        }
                        doProduce={doProduce}
                        setKafkaKeySchema={setKafkaKeySchema}
                        setKafkaValueSchema={setKafkaValueSchema}
                        isKeySchemaDefinitionValid={isKeySchemaDefinitionValid}
                        isKeySchemaSyntaxValid={isKeySchemaSyntaxValid}
                        isKeyContentSchemaValid={isKeyContentSchemaValid}
                        isKeyContentSyntaxValid={isKeyContentSyntaxValid}
                        isValueSchemaSyntaxValid={isValueSchemaSyntaxValid}
                        isValueSchemaDefinitionValid={
                            isValueSchemaDefinitionValid
                        }
                        isValueContentSyntaxValid={isValueContentSyntaxValid}
                        isValueContentSchemaValid={isValueContentSchemaValid}
                        isHeadersSyntaxValid={isHeadersSyntaxValid}
                    />
                </div>
                <Grid
                    className="pt-3 flex flex-1"
                    style={{
                        minHeight: '30rem',
                    }}
                >
                    <Grid.Col span={12} md={7}>
                        <BlazingProducerEditor
                            initialLoad={initialLoad}
                            keySerializer={keySerializer}
                            valueSerializer={valueSerializer}
                            kafkaKey={kafkaKey}
                            setKafkaKey={setKafkaKey}
                            kafkaValue={kafkaValue}
                            setKafkaValue={setKafkaValue}
                            kafkaHeaders={kafkaHeaders}
                            setKafkaHeaders={setKafkaHeaders}
                            kafkaKeySchema={kafkaKeySchema}
                            setKafkaKeySchema={setKafkaKeySchema}
                            kafkaValueSchema={kafkaValueSchema}
                            setKafkaValueSchema={setKafkaValueSchema}
                            setIsKeySchemaDefinitionValid={
                                setIsKeySchemaDefinitionValid
                            }
                            setIsKeySchemaSyntaxValid={
                                setIsKeySchemaSyntaxValid
                            }
                            setIsKeyContentSchemaValid={
                                setIsKeyContentSchemaValid
                            }
                            setIsKeyContentSyntaxValid={
                                setIsKeyContentSyntaxValid
                            }
                            setIsValueSchemaSyntaxValid={
                                setIsValueSchemaSyntaxValid
                            }
                            setIsValueSchemaDefinitionValid={
                                setIsValueSchemaDefinitionValid
                            }
                            setIsValueContentSyntaxValid={
                                setIsValueContentSyntaxValid
                            }
                            setIsValueContentSchemaValid={
                                setIsValueContentSchemaValid
                            }
                            setIsHeadersSyntaxValid={setIsHeadersSyntaxValid}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={12}
                        md={5}
                        style={{
                            minHeight: '23rem',
                        }}
                    >
                        <BlazingProducerRecords
                            records={records}
                            clearRecords={() => {
                                setRecords([]);
                                recordsRef.current = [];
                            }}
                        />
                    </Grid.Col>
                </Grid>
            </div>
            <ProducerImportRecords
                keySchema={kafkaKeySchema}
                valueSchema={kafkaValueSchema}
                keySerializer={keySerializer}
                keySerializerConfiguration={keySerializerConfiguration}
                valueSerializer={valueSerializer}
                valueSerializerConfiguration={valueSerializerConfiguration}
                setIsModalOpen={setIsImportBlazingRecordsModalOpen}
                isModalOpen={isImportBlazingRecordsModalOpen}
                onSuccess={onImportSuccess}
            />
        </>
    );
};

export default BlazingProducerBodyComponent;
