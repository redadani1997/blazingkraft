import { Grid } from '@mantine/core';
import { SchemaMetaData, SubjectDetails } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo, useState } from 'react';
import CommonDiffEditor from 'scenes/common/editor/CommonDiffEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface SubjectDetailsBodyComponentProps {
    subjectDetails: SubjectDetails;
}

const SubjectDetailsBodyComponent = ({
    subjectDetails,
}: SubjectDetailsBodyComponentProps) => {
    const [leftSchemaMetaData, setLeftSchemaMetaData] =
        useState<SchemaMetaData>(
            subjectDetails.schemasMetaData.length > 1
                ? subjectDetails.schemasMetaData[1]
                : subjectDetails.schemasMetaData[0],
        );
    const [rightSchemaMetaData, setRightSchemaMetaData] =
        useState<SchemaMetaData>(subjectDetails.schemasMetaData[0]);

    const leftOptions = useMemo(
        () =>
            subjectDetails.schemasMetaData.map(meta => ({
                label: `Version ${meta.version} (${meta.schemaType})`,
                value: meta.version,
            })),
        [subjectDetails],
    );
    const rightOptions = useMemo(
        () =>
            subjectDetails.schemasMetaData.map(meta => ({
                label: `Version ${meta.version} (${meta.schemaType})`,
                value: meta.version,
            })),
        [subjectDetails],
    );

    return (
        <div className="h-full w-full flex flex-col">
            <Grid justify="space-between" className="pb-4">
                <Grid.Col sm={5} md={4} lg={3}>
                    <CommonSelect
                        data={leftOptions}
                        value={leftSchemaMetaData.version}
                        onChange={value =>
                            setLeftSchemaMetaData(
                                subjectDetails.schemasMetaData.find(
                                    meta => meta.version === value,
                                ),
                            )
                        }
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col sm={5} md={4} lg={3}>
                    <CommonSelect
                        data={rightOptions}
                        value={rightSchemaMetaData.version}
                        onChange={value =>
                            setRightSchemaMetaData(
                                subjectDetails.schemasMetaData.find(
                                    meta => meta.version === value,
                                ),
                            )
                        }
                        clearable={false}
                    />
                </Grid.Col>
            </Grid>
            <CommonEditorWrapper className="">
                <CommonDiffEditor
                    original={
                        leftSchemaMetaData.schemaType === 'PROTOBUF'
                            ? leftSchemaMetaData.schema
                            : CommonUtils.beautifyJsonString(
                                  leftSchemaMetaData.schema,
                              )
                    }
                    language={
                        leftSchemaMetaData.schemaType === 'PROTOBUF'
                            ? 'proto'
                            : 'json'
                    }
                    modified={
                        rightSchemaMetaData.schemaType === 'PROTOBUF'
                            ? rightSchemaMetaData.schema
                            : CommonUtils.beautifyJsonString(
                                  rightSchemaMetaData.schema,
                              )
                    }
                    renderSideBySide={true}
                    autoRenderSideBySide
                />
            </CommonEditorWrapper>
        </div>
    );
};

export default SubjectDetailsBodyComponent;
