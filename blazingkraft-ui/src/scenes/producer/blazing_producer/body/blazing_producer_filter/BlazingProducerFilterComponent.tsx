import { Grid, Text, useMantineColorScheme } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import {
    ProducerConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import { TopicDescription } from 'common/types/topic';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useMemo } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { TbInfoTriangleFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import BlazingProducerSerializer from '../blazing_producer_serializer/BlazingProducerSerializer';
import BlazingProducerFilterButton from './button/BlazingProducerFilterButton';

interface BlazingProducerFilterComponentProps {
    producerConfiguration: ProducerConfiguration;
    isGetAllTopicsDescriptionsPending: boolean;
    topicsDescriptions: TopicDescription[];
    topic: string;
    setKeySerializer: (keySerializer: ProducerSerializer) => void;
    setKeySerializerConfiguration: any;
    setValueSerializer: (valueSerializer: ProducerSerializer) => void;
    setValueSerializerConfiguration: any;
    keySerializer: ProducerSerializer;
    keySerializerConfiguration: Map<string, any>;
    valueSerializer: ProducerSerializer;
    valueSerializerConfiguration: Map<string, any>;
    doProduce: () => void;
    isKeySchemaDefinitionValid: boolean;
    isKeySchemaSyntaxValid: boolean;
    isKeyContentSchemaValid: boolean;
    isKeyContentSyntaxValid: boolean;
    isValueSchemaSyntaxValid: boolean;
    isValueSchemaDefinitionValid: boolean;
    isValueContentSyntaxValid: boolean;
    isValueContentSchemaValid: boolean;
    isHeadersSyntaxValid: boolean;
    partition: number | null;
    setPartition: (partition: number | null) => void;
    setKafkaValueSchema: (schema: string) => void;
    setKafkaKeySchema: (schema: string) => void;
}

function BlazingProducerFilterComponent({
    isGetAllTopicsDescriptionsPending,
    topicsDescriptions,
    producerConfiguration,
    topic,
    partition,
    setPartition,
    setKeySerializer,
    setKeySerializerConfiguration,
    setValueSerializer,
    setValueSerializerConfiguration,
    keySerializer,
    keySerializerConfiguration,
    valueSerializer,
    valueSerializerConfiguration,
    doProduce,
    isKeySchemaDefinitionValid,
    isKeySchemaSyntaxValid,
    isKeyContentSchemaValid,
    isKeyContentSyntaxValid,
    isValueSchemaSyntaxValid,
    isValueSchemaDefinitionValid,
    isValueContentSyntaxValid,
    isValueContentSchemaValid,
    isHeadersSyntaxValid,
    setKafkaKeySchema,
    setKafkaValueSchema,
}: BlazingProducerFilterComponentProps) {
    const { colorScheme } = useMantineColorScheme();
    const favoriteColor = colorScheme === 'dark' ? 'yellow' : 'red';

    const topicSelectRef = useFocusTrap(!topic);

    const [_, setSearchParams] = useSearchParams();

    const topicExists = useMemo(() => {
        return CommonValidationUtils.isTruthyString(topic);
    }, [topic]);

    const topicsOptions = useMemo(
        () =>
            topicsDescriptions.map(topicDescription => ({
                label: topicDescription.name,
                value: topicDescription.name,
                isFavorite: topicDescription.isFavorite,
                internal: topicDescription.internal,
            })),
        [topicsDescriptions],
    );

    const partitionsOptions: any = useMemo(() => {
        const options: any = [
            {
                label: '-1',
                value: -1,
            },
        ];
        const topicDescription = topicsDescriptions.find(
            topicDescription => topicDescription.name === topic,
        );
        if (topicDescription) {
            options.push(
                ...topicDescription.partitions.map(partition => ({
                    label: String(partition.partition),
                    value: partition.partition,
                })),
            );
        }
        return options;
    }, [topic, topicsDescriptions]);

    useEffect(() => {
        setPartition(-1);
    }, [partitionsOptions]);

    return (
        <div className="flex flex-col">
            <Grid className="items-end">
                <Grid.Col span={12} xs={6} sm={8} md={5} lg={5}>
                    <CommonSelect
                        selectRef={topicSelectRef}
                        loading={isGetAllTopicsDescriptionsPending}
                        data={topicsOptions}
                        placeholder={topic || 'Please select a topic'}
                        value={topic}
                        onChange={value => {
                            setSearchParams({ topic: value ?? '' });
                        }}
                        error={!topicExists ? true : false}
                        searchable
                        creatable
                        labelRenderer={({ label, isFavorite, internal }) => {
                            if (!internal && !isFavorite) {
                                return label;
                            }
                            return (
                                <div className="flex items-center">
                                    <Text>{label}</Text>
                                    {internal && (
                                        <TbInfoTriangleFilled
                                            size="1.1rem"
                                            className="ml-1"
                                            color="pink"
                                        />
                                    )}
                                    {isFavorite && (
                                        <AiFillStar
                                            color={favoriteColor}
                                            size="1.1rem"
                                            className="ml-1"
                                        />
                                    )}
                                </div>
                            );
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={4} md={2} lg={1}>
                    <CommonTooltip
                        position="right"
                        label="Choose a Partition, or select -1 if you want to use the configured partitioner."
                    >
                        <CommonSelect
                            value={partition}
                            defaultValue={partition}
                            data={partitionsOptions}
                            placeholder="-1"
                            searchable
                            creatable
                            onChange={value => {
                                setPartition(value);
                            }}
                            clearable={false}
                        />
                    </CommonTooltip>
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={4} md={2} lg={2}>
                    <BlazingProducerSerializer
                        producerConfiguration={producerConfiguration}
                        keySerializer={keySerializer}
                        keySerializerConfiguration={keySerializerConfiguration}
                        setKeySerializerConfiguration={
                            setKeySerializerConfiguration
                        }
                        valueSerializer={valueSerializer}
                        valueSerializerConfiguration={
                            valueSerializerConfiguration
                        }
                        setValueSerializerConfiguration={
                            setValueSerializerConfiguration
                        }
                        setKeySerializer={setKeySerializer}
                        setValueSerializer={setValueSerializer}
                        setKafkaKeySchema={setKafkaKeySchema}
                        setKafkaValueSchema={setKafkaValueSchema}
                    />
                </Grid.Col>
                <Grid.Col span={12} xs={6} sm={4} md={2} lg={2}>
                    <BlazingProducerFilterButton
                        action={doProduce}
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
                        topicExists={topicExists}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default BlazingProducerFilterComponent;
