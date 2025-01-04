import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { PlaygroundYamlUtils } from 'common/playground/PlaygroundYamlUtils';
import { JsonSchemaUtils } from 'common/schemas/JsonSchemaUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useCallback, useEffect, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';
import PlaygroundValidationPreview from 'scenes/playground/validation_preview/PlaygroundValidationPreview';

type ContentType = 'typescript' | 'json' | 'yaml';

const ContentValidationBodyComponent = () => {
    const [content, setContent] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
    );
    const [contentType, setContentType] = useState<ContentType>('json');

    const [debouncedContent] = useDebouncedValue(content, 400);
    const [contentSyntaxErrors, setContentSyntaxErrors] = useState([]);

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
            setContentSyntaxErrors([]);
        } else {
            setContentSyntaxErrors(errorMessages);
        }
    }, []);

    useEffect(() => {
        if (contentType === 'yaml') {
            const error =
                PlaygroundYamlUtils.validateYamlSyntax(debouncedContent);
            if (error !== null) {
                setContentSyntaxErrors([error]);
            } else {
                setContentSyntaxErrors([]);
            }
            return;
        }
        if (contentType === 'json') {
            const contentJson =
                JsonSchemaUtils.parseStringToJson(debouncedContent);
            if (contentJson === null) {
                return;
            }

            setContentSyntaxErrors([]);
        }
    }, [debouncedContent]);

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="h-auto">
                <Grid.Col span={12} lg={6}>
                    <CommonSelect
                        clearable={false}
                        data={[
                            {
                                label: 'JSON',
                                value: 'json',
                            },
                            {
                                label: 'YAML',
                                value: 'yaml',
                            },
                            {
                                label: 'Typescript',
                                value: 'typescript',
                            },
                        ]}
                        value={contentType}
                        onChange={(contentType: ContentType) => {
                            if (contentType === 'json') {
                                setContent(
                                    PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
                                );
                            } else if (contentType === 'typescript') {
                                setContent(
                                    PlaygroundSchemasUtils.PLAYGROUND_TYPESCRIPT_CONTENT_DEFAULT,
                                );
                            } else if (contentType === 'yaml') {
                                setContent(
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
                                );
                            }
                            setContentType(contentType);
                        }}
                        label="Content type"
                        className="pb-3 w-1/2"
                    />
                </Grid.Col>
            </Grid>
            <Grid className="flex-1">
                <Grid.Col span={12} lg={6} className="">
                    <CommonEditorWrapper>
                        <CommonEditor
                            content={content}
                            defaultValue={content}
                            onContentChange={setContent}
                            onValidate={handleEditorValidation}
                            language={contentType}
                        />
                    </CommonEditorWrapper>
                </Grid.Col>
                <Grid.Col span={12} lg={6} className="">
                    <PlaygroundValidationPreview
                        hasSecondaryErrors={false}
                        syntaxErrors={contentSyntaxErrors}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ContentValidationBodyComponent;
