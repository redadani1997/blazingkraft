import { Grid } from '@mantine/core';
import { SchemaMetaData, SubjectDetails } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useMemo, useState } from 'react';
import { TbCheck, TbInfoCircle } from 'react-icons/tb';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import SchemaReferencesModal from 'scenes/schema_registry/create_subject/body/schema_references/SchemaReferencesModal';
import CreateSubjectVersionDiffEditor from './create_subject_versions_diff_editor/CreateSubjectVersionDiffEditor';

interface CreateSubjectVersionBodyComponentProps {
    subjectDetails: SubjectDetails;
    createSubjectVersion: Function;
}

function renderCreateSubjectVersionButton(
    isSchemaSchemaValid,
    isSchemaSyntaxValid,
    isSchemaCompatibilityValid,
    action,
) {
    if (!isSchemaSyntaxValid) {
        return (
            <CommonTooltip
                label="The syntax is invalid, but note that the syntax validation is done by the Editor. Therefore
            you can go ahead and create the new version and if the schema is really invalid you'll get a Server
            Error."
            >
                <CommonButton
                    leftIcon={<TbInfoCircle size={22} />}
                    color="yellow"
                    onClick={() => {
                        action();
                    }}
                    className="w-full"
                >
                    Create
                </CommonButton>
            </CommonTooltip>
        );
    }
    if (!isSchemaSchemaValid) {
        return (
            <CommonTooltip
                label="The Schema is not valid, but note that the schema validation is done by the Server. Therefore
                     you can go ahead and create the new version and if the schema is really invalid you'll get a Schema 
                     Registry Error."
            >
                <CommonButton
                    color="red"
                    leftIcon={<TbInfoCircle size={22} />}
                    onClick={() => {
                        action();
                    }}
                    className="w-full"
                >
                    Create
                </CommonButton>
            </CommonTooltip>
        );
    }
    if (!isSchemaCompatibilityValid) {
        return (
            <CommonTooltip
                label="The Schemas are InCompatibile, but note that the compatibility check is done by the Server.
                 Therefore you can go ahead and create the new version and if the schema is really invalid 
                 you'll get a Schema Registry Error."
            >
                <CommonButton
                    color="red"
                    leftIcon={<TbInfoCircle size={22} />}
                    onClick={() => {
                        action();
                    }}
                    className="w-full"
                >
                    Create
                </CommonButton>
            </CommonTooltip>
        );
    }
    return (
        <CommonButton
            leftIcon={<TbCheck size={22} />}
            onClick={() => {
                action();
            }}
        >
            Create
        </CommonButton>
    );
}

const CreateSubjectVersionBodyComponent = ({
    createSubjectVersion,
    subjectDetails,
}: CreateSubjectVersionBodyComponentProps) => {
    const [latestSchemaMetaData] = subjectDetails.schemasMetaData;
    const [newSchemaVersion, setNewSchemaVersion] = useState<SchemaMetaData>({
        id: -1,
        schema: latestSchemaMetaData.schema,
        version: -1,
        schemaType: latestSchemaMetaData.schemaType,
        references: latestSchemaMetaData.references,
    });
    const [leftSchemaMetaData, setLeftSchemaMetaData] =
        useState<SchemaMetaData>(newSchemaVersion);
    const [rightSchemaMetaData, setRightSchemaMetaData] =
        useState<SchemaMetaData>(latestSchemaMetaData);

    const [isSchemaSyntaxValid, setIsSchemaSyntaxValid] = useState(true);
    const [isSchemaSchemaValid, setIsSchemaSchemaValid] = useState(true);
    const [isSchemaCompatibilityValid, setIsSchemaCompatibilityValid] =
        useState(true);

    const leftOptions = useMemo(
        () => [
            {
                label: `Version ${
                    latestSchemaMetaData.version + 1
                } (New Version)`,
                value: -1,
            },
            ...subjectDetails.schemasMetaData.map(meta => ({
                label: `Version ${meta.version} (${meta.schemaType})`,
                value: meta.version,
            })),
        ],
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

    useEffect(() => {
        if (leftSchemaMetaData.version === -1) {
            setLeftSchemaMetaData(newSchemaVersion);
        }
    }, [newSchemaVersion]);

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="pb-3">
                    <Grid.Col span={12} sm={6} md={3}>
                        <SchemaReferencesModal
                            schemaReferences={newSchemaVersion.references}
                            setSchemaReferences={value =>
                                setNewSchemaVersion({
                                    ...newSchemaVersion,
                                    references: value,
                                })
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        {renderCreateSubjectVersionButton(
                            isSchemaSchemaValid,
                            isSchemaSyntaxValid,
                            isSchemaCompatibilityValid,
                            () =>
                                createSubjectVersion(
                                    newSchemaVersion.schemaType,
                                    newSchemaVersion.schema,
                                    newSchemaVersion.references,
                                ),
                        )}
                    </Grid.Col>
                </Grid>
                <Grid justify="space-between" className="pb-2">
                    <Grid.Col sm={5} md={4} lg={3}>
                        <CommonSelect
                            data={leftOptions}
                            value={leftSchemaMetaData.version}
                            onChange={value => {
                                if (value === -1) {
                                    setLeftSchemaMetaData(newSchemaVersion);
                                } else {
                                    setLeftSchemaMetaData(
                                        subjectDetails.schemasMetaData.find(
                                            meta => meta.version === value,
                                        ),
                                    );
                                }
                            }}
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
                <CreateSubjectVersionDiffEditor
                    leftSide={{
                        ...leftSchemaMetaData,
                        schema:
                            leftSchemaMetaData.schemaType === 'PROTOBUF'
                                ? leftSchemaMetaData.schema
                                : CommonUtils.beautifyJsonString(
                                      leftSchemaMetaData.schema,
                                  ),
                    }}
                    rightSide={{
                        ...rightSchemaMetaData,
                        schema:
                            rightSchemaMetaData.schemaType === 'PROTOBUF'
                                ? rightSchemaMetaData.schema
                                : CommonUtils.beautifyJsonString(
                                      rightSchemaMetaData.schema,
                                  ),
                    }}
                    setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                    setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                    setIsSchemaCompatibilityValid={
                        setIsSchemaCompatibilityValid
                    }
                    setSchema={schema => {
                        const newMeta = { ...newSchemaVersion, schema };
                        setNewSchemaVersion(newMeta);
                    }}
                    newSchemaVersion={newSchemaVersion}
                    subjectDetails={subjectDetails}
                />
            </div>
        </>
    );
};

export default CreateSubjectVersionBodyComponent;
