import { Button, Grid, Input, SimpleGrid, TextInput } from '@mantine/core';
import {
    SchemaCompatibility,
    SchemaReference,
    SchemaType,
    SubjectNameStrategy,
    SubjectType,
} from 'common/types/schema_registry';
import {
    SCHEMA_TYPES_OPTIONS,
    SUBJECT_STRATEGIES_OPTIONS,
    SUBJECT_TYPES_OPTIONS,
    schemaTypeLabelByType,
} from 'common/utils/SchemaRegistryUtils';
import { useEffect, useState } from 'react';
import { TbCheck, TbInfoCircle } from 'react-icons/tb';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import SchemaReferencesModal from './schema_references/SchemaReferencesModal';
import SchemaSelector from './schema_selector/SchemaSelector';
import SchemaCompatibilityModal from './subject_compatibility/SchemaCompatibilityModal';

interface CreateSubjectBodyComponentProps {
    createSubject: Function;
}

function renderCreateSubjectButton(
    isContentSchemaValid,
    isContentSyntaxValid,
    isSchemaSchemaValid,
    isSchemaSyntaxValid,
    action,
) {
    if (!isSchemaSyntaxValid || !isContentSyntaxValid) {
        return (
            <CommonTooltip
                label="The syntax is invalid, but note that the syntax validation is done by the Editor. Therefore
            you can go ahead and create the Subject and if the schema is really invalid you'll get a Server
            Error."
            >
                <Button
                    leftIcon={<TbInfoCircle size={22} />}
                    color="yellow"
                    onClick={() => {
                        action();
                    }}
                    className="w-full"
                >
                    Create
                </Button>
            </CommonTooltip>
        );
    }
    if (!isContentSchemaValid || !isSchemaSchemaValid) {
        return (
            <CommonTooltip
                label="The Schema is not valid, but note that the schema validation is done by the Server. Therefore
                     you can go ahead and create the Subject and if the schema is really invalid you'll get a Schema 
                     Registry Error."
            >
                <Button
                    color="red"
                    leftIcon={<TbInfoCircle size={22} />}
                    onClick={() => {
                        action();
                    }}
                    className="w-full"
                >
                    Create
                </Button>
            </CommonTooltip>
        );
    }
    return (
        <Button
            leftIcon={<TbCheck size={22} />}
            onClick={() => {
                action();
            }}
            className="w-full"
        >
            Create
        </Button>
    );
}

const CreateSubjectBodyComponent = ({
    createSubject,
}: CreateSubjectBodyComponentProps) => {
    const [subject, setSubject] = useState('topicname-value');
    const [schema, setSchema] = useState(undefined);
    const [schemaType, setSchemaType] = useState<SchemaType>('AVRO');
    const [subjectNameStrategy, setSubjectNameStrategy] =
        useState<SubjectNameStrategy>('Topic Name Strategy');
    const [subjectType, setSubjectType] = useState<SubjectType>('Value');

    const [schemaReferences, setSchemaReferences] = useState<SchemaReference[]>(
        [],
    );

    const [schemaCompatibility, setSchemaCompatibility] =
        useState<SchemaCompatibility>('BACKWARD');

    const [isSchemaSyntaxValid, setIsSchemaSyntaxValid] = useState(true);
    const [isSchemaSchemaValid, setIsSchemaSchemaValid] = useState(true);

    const [isContentSyntaxValid, setIsContentSyntaxValid] = useState(true);
    const [isContentSchemaValid, setIsContentSchemaValid] = useState(true);

    useEffect(() => {
        setIsSchemaSyntaxValid(true);
        setIsSchemaSchemaValid(true);
        setIsContentSyntaxValid(true);
        setIsContentSchemaValid(true);
    }, [schemaType]);

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <Grid className="flex pb-2 items-end">
                    <Grid.Col span={12} sm={6} md={3}>
                        <Input.Wrapper
                            id="subject-strategy-input-wrapper-id"
                            required
                            label="Subject Name Strategy"
                        >
                            <CommonSelect
                                id="subject-strategy-input-id"
                                placeholder="Subject Strategy"
                                data={SUBJECT_STRATEGIES_OPTIONS}
                                onChange={(value: SubjectNameStrategy) => {
                                    setSubjectNameStrategy(value);
                                }}
                                error={!subjectNameStrategy ? true : false}
                                value={subjectNameStrategy}
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    {(subjectNameStrategy === 'Topic Name Strategy' ||
                        subjectNameStrategy ===
                            'Topic and Record Name Strategy') && (
                        <Grid.Col span={12} sm={6} md={3}>
                            <Input.Wrapper
                                id="subject-type-input-wrapper-id"
                                required
                                label="Subject Type"
                            >
                                <CommonSelect
                                    id="subject-type-input-id"
                                    placeholder="Subject Type"
                                    data={SUBJECT_TYPES_OPTIONS}
                                    onChange={(value: SubjectType) => {
                                        const newSubject = `${subject}`;
                                        if (
                                            subject.endsWith('-value') &&
                                            value === 'Key'
                                        ) {
                                            setSubject(
                                                `${newSubject.replace(
                                                    new RegExp('-value$'),
                                                    '-key',
                                                )}`,
                                            );
                                        } else if (value === 'Key') {
                                            setSubject(`${subject}-key`);
                                        } else if (
                                            subject.endsWith('-key') &&
                                            value === 'Value'
                                        ) {
                                            setSubject(
                                                `${newSubject.replace(
                                                    new RegExp('-key$'),
                                                    '-value',
                                                )}`,
                                            );
                                        } else if (value === 'Value') {
                                            setSubject(`${subject}-value`);
                                        }
                                        setSubjectType(value);
                                    }}
                                    error={!subjectType ? true : false}
                                    value={subjectType}
                                />
                            </Input.Wrapper>
                        </Grid.Col>
                    )}
                    <Grid.Col span={12} sm={6} md={3}>
                        <Input.Wrapper
                            id="subject-input-wrapper-id"
                            required
                            label="Subject"
                        >
                            <TextInput
                                id="subject-name-input-id"
                                placeholder="Subject"
                                onChange={e => {
                                    const name = e.target.value;
                                    setSubject(name);
                                }}
                                error={!subject ? true : false}
                                value={subject}
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                </Grid>
                <Grid className="flex pb-3 items-end">
                    <Grid.Col span={12} sm={6} md={3}>
                        <Input.Wrapper
                            id="schema-type-input-wrapper-id"
                            required
                            label="Schema Type"
                        >
                            <CommonSelect
                                id="schema-type-input-id"
                                placeholder="Schema Type"
                                data={SCHEMA_TYPES_OPTIONS}
                                onChange={(value: SchemaType) => {
                                    setSchemaType(value);
                                    setSchema(undefined);
                                }}
                                error={!schemaType ? true : false}
                                value={schemaType}
                                searchable
                                labelRenderer={({ value }) =>
                                    schemaTypeLabelByType(value)
                                }
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        <SchemaReferencesModal
                            schemaReferences={schemaReferences}
                            setSchemaReferences={setSchemaReferences}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        <SchemaCompatibilityModal
                            setSchemaCompatibility={setSchemaCompatibility}
                            schemaCompatibility={schemaCompatibility}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={3}>
                        {renderCreateSubjectButton(
                            isContentSchemaValid,
                            isContentSyntaxValid,
                            isSchemaSchemaValid,
                            isSchemaSyntaxValid,
                            () =>
                                createSubject(
                                    subject,
                                    schemaType,
                                    schema,
                                    schemaCompatibility,
                                    schemaReferences,
                                ),
                        )}
                    </Grid.Col>
                </Grid>
                <SimpleGrid
                    cols={2}
                    className="h-full"
                    spacing="md"
                    breakpoints={[
                        {
                            maxWidth: 'sm',
                            cols: 1,
                            spacing: 'sm',
                        },
                        {
                            maxWidth: 'md',
                            cols: 2,
                            spacing: 'sm',
                        },
                    ]}
                >
                    <SchemaSelector
                        schema={schema}
                        schemaType={schemaType}
                        setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                        setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                        setSchema={setSchema}
                        setIsContentSchemaValid={setIsContentSchemaValid}
                        setIsContentSyntaxValid={setIsContentSyntaxValid}
                        schemaReferences={schemaReferences}
                    />
                </SimpleGrid>
            </div>
        </>
    );
};

export default CreateSubjectBodyComponent;
