import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { JsonSchemaUtils } from 'common/schemas/JsonSchemaUtils';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import playgroundActions from 'scenes/playground/redux/actions';
import PlaygroundValidationPreview from 'scenes/playground/validation_preview/PlaygroundValidationPreview';

const ConversionsJsonToYamlComponent = () => {
    const [content, setContent] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
    );
    const [result, setResult] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
    );

    const [isLoading, setIsLoading] = useState(false);

    const promiseId = useRef(0);

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
        const contentJson = JsonSchemaUtils.parseStringToJson(debouncedContent);
        if (contentJson === null) {
            return;
        }
        setIsLoading(true);

        playgroundActions
            .convertContent(content, 'JSON', 'YAML', promiseId.current)
            .then(response => {
                if (promiseId.current !== response.promiseId) {
                    return;
                }
                setResult(response.result);
                setContentSyntaxErrors([]);
                setIsLoading(false);
            })
            .catch(error => {
                setContentSyntaxErrors([
                    CommonUtils.getRestErrorMessage(error),
                ]);
                setIsLoading(false);
            });

        setContentSyntaxErrors([]);
    }, [debouncedContent]);

    return (
        <div className="flex h-full w-full">
            <Grid className="flex-1">
                <Grid.Col span={12} lg={6} className="">
                    <CommonEditorWrapper>
                        <CommonEditor
                            content={content}
                            defaultValue={content}
                            onContentChange={setContent}
                            onValidate={handleEditorValidation}
                            language="json"
                        />
                    </CommonEditorWrapper>
                </Grid.Col>
                <Grid.Col span={12} lg={6} className="">
                    {contentSyntaxErrors.length > 0 ? (
                        <PlaygroundValidationPreview
                            hasSecondaryErrors={false}
                            syntaxErrors={contentSyntaxErrors}
                        />
                    ) : (
                        <CommonEditorWrapper className="relative">
                            <LoadingSpinner isLoading={isLoading} />
                            <CommonEditor
                                content={result}
                                defaultValue={result}
                                readOnly
                                language="yaml"
                            />
                        </CommonEditorWrapper>
                    )}
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ConversionsJsonToYamlComponent;
