import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { PlaygroundYamlUtils } from 'common/playground/PlaygroundYamlUtils';
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

const OpenAPIDefinitionBodyComponent = () => {
    const [schema, setSchema] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
    );
    const [schemaType, setSchemaType] = useState<SchemaType>('OPENAPI_YAML');

    const promiseId = useRef(0);

    const [debouncedSchema] = useDebouncedValue(schema, 400);
    const [schemaSyntaxErrors, setSchemaSyntaxErrors] = useState([]);
    const [schemaDefinitionErrors, setSchemaDefinitionErrors] = useState([]);
    const [isValidating, setIsValidating] = useState(false);

    const doValidate = () => {
        promiseId.current++;
        return playgroundActions.validateOpenAPIDefinition(
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
        if (schemaType === 'OPENAPI_JSON') {
            const contentJson =
                JsonSchemaUtils.parseStringToJson(debouncedSchema);
            if (contentJson === null) {
                return;
            }
            setSchemaSyntaxErrors([]);
        } else {
            const error = PlaygroundYamlUtils.validateYamlSyntax(schema);
            if (error !== null) {
                setSchemaSyntaxErrors([error]);
                return;
            }
            setSchemaSyntaxErrors([]);
        }
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
                                label: 'JSON',
                                value: 'OPENAPI_JSON',
                            },
                            {
                                label: 'YAML',
                                value: 'OPENAPI_YAML',
                            },
                        ]}
                        value={schemaType}
                        onChange={schemaType => {
                            if (schemaType === 'OPENAPI_YAML') {
                                setSchema(
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
                                );
                            } else {
                                setSchema(
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_JSON_SCHEMA_DEFAULT,
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
                <Grid.Col span={12} md={6} className="">
                    <CommonEditorWrapper>
                        <CommonEditor
                            content={schema}
                            defaultValue={schema}
                            onContentChange={setSchema}
                            onValidate={handleEditorValidation}
                            language={
                                schemaType === 'OPENAPI_JSON' ? 'json' : 'yaml'
                            }
                        />
                    </CommonEditorWrapper>
                </Grid.Col>
                <Grid.Col span={12} md={6} className="">
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

export default OpenAPIDefinitionBodyComponent;
