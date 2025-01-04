import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { ProducerSerializer } from 'common/types/producer';
import { CommonUtils } from 'common/utils/CommonUtils';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useCallback, useEffect, useState } from 'react';
import { BsEyeSlash } from 'react-icons/bs';
import { PiMagicWandBold } from 'react-icons/pi';
import { TbCopy } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import BlazingProducerSchemaContentEditor from './editors/BlazingProducerSchemaContentEditor';
import BlazingProducerSchemaDefinitionEditor from './editors/BlazingProducerSchemaDefinitionEditor';

interface BlazingProducerEditorComponentProps {
    keySerializer: ProducerSerializer;
    valueSerializer: ProducerSerializer;
    kafkaKey: string;
    kafkaValue: string;
    kafkaHeaders: string;
    kafkaKeySchema: string;
    kafkaValueSchema: string;
    setKafkaKeySchema: (kafkaKeyScehma: string) => void;
    setKafkaValueSchema: (kafkaValueSchema: string) => void;
    setKafkaKey: (kafkaKey: string) => void;
    setKafkaValue: (kafkaValue: string) => void;
    setKafkaHeaders: (kafkaHeaders: string) => void;
    setIsKeySchemaDefinitionValid: any;
    setIsKeySchemaSyntaxValid: any;
    setIsKeyContentSchemaValid: any;
    setIsKeyContentSyntaxValid: any;
    setIsValueSchemaSyntaxValid: any;
    setIsValueSchemaDefinitionValid: any;
    setIsValueContentSyntaxValid: any;
    setIsValueContentSchemaValid: any;
    setIsHeadersSyntaxValid: any;
    initialLoad: boolean;
}

function BlazingProducerEditorComponent({
    keySerializer,
    valueSerializer,
    kafkaKey,
    kafkaValue,
    kafkaHeaders,
    kafkaKeySchema,
    kafkaValueSchema,
    setKafkaKeySchema,
    setKafkaValueSchema,
    setKafkaKey,
    setKafkaValue,
    setKafkaHeaders,
    setIsKeySchemaDefinitionValid,
    setIsKeySchemaSyntaxValid,
    setIsKeyContentSchemaValid,
    setIsKeyContentSyntaxValid,
    setIsValueSchemaSyntaxValid,
    setIsValueSchemaDefinitionValid,
    setIsValueContentSyntaxValid,
    setIsValueContentSchemaValid,
    setIsHeadersSyntaxValid,
    initialLoad,
}: BlazingProducerEditorComponentProps) {
    const [selectedTab, setSelectedTab] = useState<
        'key' | 'value' | 'headers' | 'keySchema' | 'valueSchema' | string
    >('value');

    const clipboard = useClipboard();

    useEffect(() => {
        if (initialLoad) {
            setSelectedTab('key');
        }
    }, [keySerializer, initialLoad]);

    useEffect(() => {
        if (initialLoad) {
            setSelectedTab('value');
        }
    }, [valueSerializer, initialLoad]);

    const memoizedSetIsHeadersSyntaxValid = useCallback((markers: any) => {
        setIsHeadersSyntaxValid(!markers || markers.length === 0);
    }, []);

    const items: CommonTabsItemProps[] = [
        {
            label: 'Key',
            value: 'key',
            children: (
                <BlazingProducerSchemaContentEditor
                    content={kafkaKey}
                    schema={kafkaKeySchema}
                    serializer={keySerializer}
                    setContent={setKafkaKey}
                    setIsContentSchemaValid={setIsKeyContentSchemaValid}
                    setIsContentSyntaxValid={setIsKeyContentSyntaxValid}
                />
            ),
        },
    ];
    if (ProducerUtils.isSchemaEditorSerializer(keySerializer)) {
        items.push({
            label: 'Key Schema',
            value: 'keySchema',
            children: (
                <BlazingProducerSchemaDefinitionEditor
                    serializer={keySerializer}
                    setSchema={setKafkaKeySchema}
                    schema={kafkaKeySchema}
                    setIsSchemaSyntaxValid={setIsKeySchemaSyntaxValid}
                    setIsSchemaDefinitionValid={setIsKeySchemaDefinitionValid}
                />
            ),
        });
    }
    items.push({
        label: 'Value',
        value: 'value',
        children: (
            <BlazingProducerSchemaContentEditor
                content={kafkaValue}
                schema={kafkaValueSchema}
                serializer={valueSerializer}
                setContent={setKafkaValue}
                setIsContentSchemaValid={setIsValueContentSchemaValid}
                setIsContentSyntaxValid={setIsValueContentSyntaxValid}
            />
        ),
    });
    if (ProducerUtils.isSchemaEditorSerializer(valueSerializer)) {
        items.push({
            label: 'Value Schema',
            value: 'valueSchema',
            children: (
                <BlazingProducerSchemaDefinitionEditor
                    serializer={valueSerializer}
                    setSchema={setKafkaValueSchema}
                    schema={kafkaValueSchema}
                    setIsSchemaSyntaxValid={setIsValueSchemaSyntaxValid}
                    setIsSchemaDefinitionValid={setIsValueSchemaDefinitionValid}
                />
            ),
        });
    }

    items.push({
        label: 'Headers',
        value: 'headers',
        children: (
            <CommonEditorWrapper minHeight="23rem">
                <CommonEditor
                    content={kafkaHeaders}
                    language={'json'}
                    onContentChange={setKafkaHeaders}
                    defaultValue={kafkaHeaders}
                    onValidate={memoizedSetIsHeadersSyntaxValid}
                />
            </CommonEditorWrapper>
        ),
    });

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                value: selectedTab,
                onTabChange: setSelectedTab,
                className: 'h-full',
            }}
            items={items}
            additionalActions={
                <div className="ml-auto flex items-end">
                    <Tooltip label="Beautify All Content">
                        <ActionIcon
                            onClick={() => {
                                setKafkaKey(
                                    CommonUtils.beautifyJsonString(kafkaKey),
                                );
                                setKafkaKeySchema(
                                    CommonUtils.beautifyJsonString(
                                        kafkaKeySchema,
                                    ),
                                );
                                setKafkaValue(
                                    CommonUtils.beautifyJsonString(kafkaValue),
                                );
                                setKafkaValueSchema(
                                    CommonUtils.beautifyJsonString(
                                        kafkaValueSchema,
                                    ),
                                );
                                setKafkaHeaders(
                                    CommonUtils.beautifyJsonString(
                                        kafkaHeaders,
                                    ),
                                );
                            }}
                        >
                            <PiMagicWandBold size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Copy Current Content">
                        <ActionIcon
                            className="ml-2"
                            onClick={() => {
                                if (selectedTab === 'key') {
                                    clipboard.copy(kafkaKey);
                                } else if (selectedTab === 'value') {
                                    clipboard.copy(kafkaValue);
                                } else if (selectedTab === 'headers') {
                                    clipboard.copy(kafkaHeaders);
                                } else if (selectedTab === 'keySchema') {
                                    clipboard.copy(kafkaKeySchema);
                                } else if (selectedTab === 'valueSchema') {
                                    clipboard.copy(kafkaValueSchema);
                                }
                            }}
                        >
                            <TbCopy size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Set Current Content to Null">
                        <ActionIcon
                            className="ml-2"
                            onClick={() => {
                                if (selectedTab === 'key') {
                                    setKafkaKey(null);
                                } else if (selectedTab === 'value') {
                                    setKafkaValue(null);
                                } else if (selectedTab === 'headers') {
                                    setKafkaHeaders(null);
                                } else if (selectedTab === 'keySchema') {
                                    setKafkaKeySchema(null);
                                } else if (selectedTab === 'valueSchema') {
                                    setKafkaValueSchema(null);
                                }
                            }}
                        >
                            <BsEyeSlash size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                </div>
            }
        />
    );
}

export default BlazingProducerEditorComponent;
