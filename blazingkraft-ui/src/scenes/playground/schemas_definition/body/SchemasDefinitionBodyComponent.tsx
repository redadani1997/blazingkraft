import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { JsonSchemaUtils } from 'common/schemas/JsonSchemaUtils';
import { SchemaType } from 'common/types/schema_registry';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';
import playgroundActions from 'scenes/playground/redux/actions';
import PlaygroundValidationPreview from 'scenes/playground/validation_preview/PlaygroundValidationPreview';
import { SchemaDefinitionValidationResponse } from 'scenes/schema_registry/redux';

const SchemasDefinitionBodyComponent = () => {
    const [schema, setSchema] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
    );
    const [schemaType, setSchemaType] = useState<SchemaType>('JSON');

    const promiseId = useRef(0);

    const [debouncedSchema] = useDebouncedValue(schema, 400);
    const [schemaSyntaxErrors, setSchemaSyntaxErrors] = useState([]);
    const [schemaDefinitionErrors, setSchemaDefinitionErrors] = useState([]);
    const [isValidating, setIsValidating] = useState(false);

    const doValidate = () => {
        promiseId.current++;
        return playgroundActions.validateSchemaDefinition(
            schemaType,
            debouncedSchema,
            promiseId.current,
        );
    };

    const handleEditorValidation = useCallback(markers => {
        if (CommonValidationUtils.isFalsy(markers)) {
            return;
        }
        const errorMessages = markers
            .filter(
                ({ message }) =>
                    message &&
                    !String(message).includes(
                        'No schema request service available',
                    ),
            )
            .map(
                ({ startLineNumber, message }) =>
                    `Line ${startLineNumber}: ${message}`,
            );

        if (!errorMessages || errorMessages.length === 0) {
            setSchemaSyntaxErrors([]);
        } else {
            setSchemaSyntaxErrors(errorMessages);
            setSchemaDefinitionErrors([]);
        }
    }, []);

    useEffect(() => {
        if (schemaType !== 'PROTOBUF') {
            const schemaJson =
                JsonSchemaUtils.parseStringToJson(debouncedSchema);
            if (schemaJson === null) {
                return;
            }
        }

        setSchemaSyntaxErrors([]);

        setIsValidating(true);
        doValidate().then((res: SchemaDefinitionValidationResponse) => {
            if (res.promiseId !== promiseId.current) {
                // This means two concurrent validation requests were fired
                // and this one is transient as it's not the last one to be called.
                return;
            }
            setIsValidating(false);
            if (!res.succeeded) {
                const { errorMessages } = res;
                if (errorMessages.length > 0) {
                    setSchemaDefinitionErrors(errorMessages);
                }
            } else if (schemaDefinitionErrors.length > 0) {
                setSchemaDefinitionErrors([]);
            }
        });
    }, [debouncedSchema]);

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="h-auto">
                <Grid.Col span={12} lg={6} className="">
                    <CommonSelect
                        clearable={false}
                        data={[
                            {
                                label: 'AVRO',
                                value: 'AVRO',
                            },
                            {
                                label: 'JSON',
                                value: 'JSON',
                            },
                            {
                                label: 'PROTOBUF',
                                value: 'PROTOBUF',
                            },
                        ]}
                        value={schemaType}
                        onChange={(schemaType: SchemaType) => {
                            if (schemaType === 'JSON') {
                                setSchema(
                                    PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
                                );
                            } else if (schemaType === 'AVRO') {
                                setSchema(
                                    PlaygroundSchemasUtils.PLAYGROUND_AVRO_SCHEMA_DEFAULT,
                                );
                            } else if (schemaType === 'PROTOBUF') {
                                setSchema(
                                    PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT,
                                );
                            }
                            setSchemaType(schemaType);
                        }}
                        label="Schema type"
                        className="pb-3 w-1/2"
                    />
                </Grid.Col>
            </Grid>
            <Grid className="flex-1">
                <Grid.Col span={12} lg={6} className="">
                    <CommonEditorWrapper>
                        <CommonEditor
                            content={schema}
                            defaultValue={schema}
                            onContentChange={setSchema}
                            onValidate={handleEditorValidation}
                            language={
                                schemaType === 'PROTOBUF' ? 'proto' : 'json'
                            }
                        />
                    </CommonEditorWrapper>
                </Grid.Col>
                <Grid.Col span={12} lg={6} className="">
                    <PlaygroundValidationPreview
                        hasSecondaryErrors
                        syntaxErrors={schemaSyntaxErrors}
                        isValidating={isValidating}
                        secondaryErrors={schemaDefinitionErrors}
                        secondaryErrorsLabel="Schema Definition Errors"
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default SchemasDefinitionBodyComponent;
