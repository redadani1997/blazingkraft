import { Alert, Grid, Text } from '@mantine/core';
import {
    SchemaMetaData,
    TopicSubjectDetails,
} from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface TopicSubjectsDetailsComponentProps {
    topicSubjectDetails: TopicSubjectDetails;
    isGetTopicSubjectDetailsPending: boolean;
}

const TopicSubjectsDetailsComponent = ({
    isGetTopicSubjectDetailsPending,
    topicSubjectDetails,
}: TopicSubjectsDetailsComponentProps) => {
    const { keySubjectDetails, valueSubjectDetails } = topicSubjectDetails;

    const [keySchemaMetaData, setKeySchemaMetaData] = useState<SchemaMetaData>(
        keySubjectDetails
            ? keySubjectDetails.schemasMetaData[
                  keySubjectDetails.schemasMetaData.length - 1
              ]
            : null,
    );
    const [valueSchemaMetaData, setValueSchemaMetaData] =
        useState<SchemaMetaData>(
            valueSubjectDetails
                ? valueSubjectDetails.schemasMetaData[
                      valueSubjectDetails.schemasMetaData.length - 1
                  ]
                : null,
        );

    useEffect(() => {
        if (keySubjectDetails) {
            setKeySchemaMetaData(
                keySubjectDetails.schemasMetaData[
                    keySubjectDetails.schemasMetaData.length - 1
                ],
            );
        }
    }, [keySubjectDetails]);

    useEffect(() => {
        if (valueSubjectDetails) {
            setValueSchemaMetaData(
                valueSubjectDetails.schemasMetaData[
                    valueSubjectDetails.schemasMetaData.length - 1
                ],
            );
        }
    }, [valueSubjectDetails]);

    const keyOptions = useMemo(() => {
        if (!keySubjectDetails) {
            return [];
        }
        return keySubjectDetails.schemasMetaData.map(meta => ({
            label: `Version ${meta.version} (${meta.schemaType})`,
            value: meta.version,
        }));
    }, [keySubjectDetails]);

    const valueOptions = useMemo(() => {
        if (!valueSubjectDetails) {
            return [];
        }
        return valueSubjectDetails.schemasMetaData.map(meta => ({
            label: `Version ${meta.version} (${meta.schemaType})`,
            value: meta.version,
        }));
    }, [valueSubjectDetails]);

    if (isGetTopicSubjectDetailsPending) {
        return (
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
            >
                <Text>Loading Key/Value Schemas...</Text>
            </Alert>
        );
    }

    if (!keySubjectDetails && !valueSubjectDetails) {
        return (
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
            >
                <Text>No Key/Value Schemas found for this topic.</Text>
            </Alert>
        );
    }

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="h-full w-full">
                {keySubjectDetails && keySchemaMetaData && (
                    <Grid.Col span={12} md={6}>
                        <div className="flex flex-col h-full w-full">
                            <CommonSelect
                                label="Key Schema"
                                data={keyOptions}
                                value={keySchemaMetaData.version}
                                onChange={value =>
                                    setKeySchemaMetaData(
                                        keySubjectDetails.schemasMetaData.find(
                                            meta => meta.version === value,
                                        ),
                                    )
                                }
                                clearable={false}
                                className="h-auto pb-3"
                            />
                            <div className="flex-1">
                                <CommonEditorWrapper>
                                    <CommonEditor
                                        content={
                                            keySchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? keySchemaMetaData.schema
                                                : CommonUtils.beautifyJsonString(
                                                      keySchemaMetaData.schema,
                                                  )
                                        }
                                        defaultValue={
                                            keySchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? keySchemaMetaData.schema
                                                : CommonUtils.beautifyJsonString(
                                                      keySchemaMetaData.schema,
                                                  )
                                        }
                                        language={
                                            keySchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? 'proto'
                                                : 'json'
                                        }
                                        onContentChange={() => {
                                            // no-op
                                        }}
                                        readOnly
                                    />
                                </CommonEditorWrapper>
                            </div>
                        </div>
                    </Grid.Col>
                )}
                {valueSubjectDetails && valueSchemaMetaData && (
                    <Grid.Col span={12} md={6}>
                        <div className="flex flex-col h-full w-full">
                            <CommonSelect
                                label="Value Schema"
                                data={valueOptions}
                                value={valueSchemaMetaData.version}
                                onChange={value =>
                                    setValueSchemaMetaData(
                                        valueSubjectDetails.schemasMetaData.find(
                                            meta => meta.version === value,
                                        ),
                                    )
                                }
                                clearable={false}
                                className="h-auto pb-3"
                            />
                            <div className="flex-1">
                                <CommonEditorWrapper>
                                    <CommonEditor
                                        content={
                                            valueSchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? valueSchemaMetaData.schema
                                                : CommonUtils.beautifyJsonString(
                                                      valueSchemaMetaData.schema,
                                                  )
                                        }
                                        defaultValue={
                                            valueSchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? valueSchemaMetaData.schema
                                                : CommonUtils.beautifyJsonString(
                                                      valueSchemaMetaData.schema,
                                                  )
                                        }
                                        language={
                                            valueSchemaMetaData.schemaType ===
                                            'PROTOBUF'
                                                ? 'proto'
                                                : 'json'
                                        }
                                        onContentChange={() => {
                                            // no-op
                                        }}
                                        readOnly
                                    />
                                </CommonEditorWrapper>
                            </div>
                        </div>
                    </Grid.Col>
                )}
            </Grid>
        </div>
    );
};

export default TopicSubjectsDetailsComponent;
