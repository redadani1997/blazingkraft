import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { PlaygroundYamlUtils } from 'common/playground/PlaygroundYamlUtils';
import { JsonSchemaUtils } from 'common/schemas/JsonSchemaUtils';
import { ContentType, SchemaType } from 'common/types/schema_registry';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import playgroundActions from 'scenes/playground/redux/actions';
import PlaygroundValidationPreview from 'scenes/playground/validation_preview/PlaygroundValidationPreview';
import { SchemaValidationResponse } from 'scenes/schema_registry/redux';

const OpenAPIContentBodyComponent = () => {
    const [schema, setSchema] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
    );
    const [content, setContent] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT,
    );
    const [schemaType, setSchemaType] = useState<SchemaType>('OPENAPI_YAML');
    const [contentType, setContentType] = useState<ContentType>('YAML');

    const promiseId = useRef(0);

    const [debouncedSchema] = useDebouncedValue(schema, 400);
    const [debouncedContent] = useDebouncedValue(content, 400);

    const [schemaSyntaxErrors, setSchemaSyntaxErrors] = useState([]);
    const [schemaDefinitionErrors, setSchemaDefinitionErrors] = useState([]);
    const [contentSyntaxErrors, setContentSyntaxErrors] = useState([]);
    const [contentDefinitionErrors, setContentDefinitionErrors] = useState([]);

    const [selectedTab, setSelectedTab] = useState<
        'SCHEMA' | 'CONTENT' | string
    >('SCHEMA');

    const [isValidating, setIsValidating] = useState(false);

    const doValidate = () => {
        promiseId.current++;
        return playgroundActions.validateOpenAPIContent(
            schemaType,
            debouncedSchema,
            debouncedContent,
            contentType,
            promiseId.current,
        );
    };

    const handleSchemaEditorValidation = useCallback(markers => {
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

    const handleContentEditorValidation = useCallback(markers => {
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
            setContentSyntaxErrors([]);
        } else {
            setContentSyntaxErrors(errorMessages);
            setContentDefinitionErrors([]);
        }
    }, []);

    useEffect(() => {
        let shouldShortCircuit = false;
        if (schemaType === 'OPENAPI_JSON') {
            const contentJson =
                JsonSchemaUtils.parseStringToJson(debouncedSchema);
            if (contentJson === null) {
                shouldShortCircuit = true;
            } else {
                setSchemaSyntaxErrors([]);
            }
        } else {
            const error =
                PlaygroundYamlUtils.validateYamlSyntax(debouncedSchema);
            if (error !== null) {
                setSchemaSyntaxErrors([error]);
                shouldShortCircuit = true;
            } else {
                setSchemaSyntaxErrors([]);
            }
        }
        if (contentType === 'JSON') {
            const contentJson =
                JsonSchemaUtils.parseStringToJson(debouncedContent);
            if (contentJson === null) {
                shouldShortCircuit = true;
            } else {
                setContentSyntaxErrors([]);
            }
        } else {
            const error =
                PlaygroundYamlUtils.validateYamlSyntax(debouncedContent);
            if (error !== null) {
                setContentSyntaxErrors([error]);
                shouldShortCircuit = true;
            } else {
                setContentSyntaxErrors([]);
            }
        }
        if (shouldShortCircuit) {
            return;
        }
        setIsValidating(true);
        doValidate().then((res: SchemaValidationResponse) => {
            if (res.promiseId !== promiseId.current) {
                // This means two concurrent validation requests were fired
                // and this one is transient as it's not the last one to be called.
                return;
            }
            setIsValidating(false);
            if (!res.schemaDefinitionSucceeded) {
                const { schemaDefinitionErrorMessages } = res;
                if (schemaDefinitionErrorMessages?.length > 0) {
                    setSchemaDefinitionErrors(schemaDefinitionErrorMessages);
                }
            } else if (schemaDefinitionErrors.length > 0) {
                setSchemaDefinitionErrors([]);
            }
            if (!res.succeeded) {
                const { errorMessages } = res;
                if (errorMessages?.length > 0) {
                    setContentDefinitionErrors(errorMessages);
                }
            } else if (contentDefinitionErrors.length > 0) {
                setContentDefinitionErrors([]);
            }
        });
    }, [debouncedSchema, debouncedContent]);

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="h-auto">
                <Grid.Col span={12} lg={6}>
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
                            setSelectedTab('SCHEMA');
                        }}
                        label="Schema type"
                        className="pb-3 w-1/2"
                    />
                </Grid.Col>

                <Grid.Col span={12} lg={6}>
                    <CommonSelect
                        clearable={false}
                        data={[
                            {
                                label: 'JSON',
                                value: 'JSON',
                            },
                            {
                                label: 'YAML',
                                value: 'YAML',
                            },
                        ]}
                        value={contentType}
                        onChange={(contentType: ContentType) => {
                            if (contentType === 'JSON') {
                                setContent(
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_JSON_CONTENT_DEFAULT,
                                );
                            } else {
                                setContent(
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT,
                                );
                            }
                            setContentType(contentType);
                            setSelectedTab('CONTENT');
                        }}
                        label="Content type"
                        className="pb-3 w-1/2"
                    />
                </Grid.Col>
            </Grid>
            <Grid className="flex-1">
                <Grid.Col span={12} lg={6} className="">
                    <CommonTabs
                        container={{
                            variant: 'outline',
                            defaultValue: selectedTab,
                            value: selectedTab,
                            onTabChange: setSelectedTab,
                            className: 'h-full',
                        }}
                        items={[
                            {
                                label: 'Schema',
                                value: 'SCHEMA',
                                children: (
                                    <CommonEditorWrapper>
                                        <CommonEditor
                                            content={schema}
                                            defaultValue={schema}
                                            onContentChange={setSchema}
                                            onValidate={
                                                handleSchemaEditorValidation
                                            }
                                            language={
                                                schemaType === 'OPENAPI_JSON'
                                                    ? 'json'
                                                    : 'yaml'
                                            }
                                        />
                                    </CommonEditorWrapper>
                                ),
                            },
                            {
                                label: 'Content',
                                value: 'CONTENT',
                                children: (
                                    <CommonEditorWrapper>
                                        <CommonEditor
                                            content={content}
                                            defaultValue={content}
                                            onContentChange={setContent}
                                            onValidate={
                                                handleContentEditorValidation
                                            }
                                            language={
                                                contentType === 'JSON'
                                                    ? 'json'
                                                    : 'yaml'
                                            }
                                        />
                                    </CommonEditorWrapper>
                                ),
                            },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={12} lg={6} className="">
                    <CommonTabs
                        container={{
                            variant: 'outline',
                            defaultValue: selectedTab,
                            value: selectedTab,
                            onTabChange: setSelectedTab,
                            className: 'h-full',
                        }}
                        items={[
                            {
                                label: 'Schema',
                                value: 'SCHEMA',
                                children: (
                                    <PlaygroundValidationPreview
                                        hasSecondaryErrors
                                        syntaxErrors={schemaSyntaxErrors}
                                        isValidating={isValidating}
                                        secondaryErrors={schemaDefinitionErrors}
                                        secondaryErrorsLabel="Schema Definition Errors"
                                    />
                                ),
                            },
                            {
                                label: 'Content',
                                value: 'CONTENT',
                                children: (
                                    <PlaygroundValidationPreview
                                        hasSecondaryErrors
                                        syntaxErrors={contentSyntaxErrors}
                                        isValidating={isValidating}
                                        secondaryErrors={
                                            contentDefinitionErrors
                                        }
                                        secondaryErrorsLabel="Content Definition Errors"
                                    />
                                ),
                            },
                        ]}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default OpenAPIContentBodyComponent;
