import { Grid } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { PlaygroundYamlUtils } from 'common/playground/PlaygroundYamlUtils';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useRef, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import playgroundActions from 'scenes/playground/redux/actions';
import PlaygroundValidationPreview from 'scenes/playground/validation_preview/PlaygroundValidationPreview';

const ConversionsYamlToJsonComponent = () => {
    const [content, setContent] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
    );
    const [result, setResult] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
    );

    const [isLoading, setIsLoading] = useState(false);

    const promiseId = useRef(0);

    const [debouncedContent] = useDebouncedValue(content, 400);
    const [contentSyntaxErrors, setContentSyntaxErrors] = useState([]);

    useEffect(() => {
        const result = PlaygroundYamlUtils.validateYamlSyntax(debouncedContent);
        if (result !== null) {
            setContentSyntaxErrors([result]);
            return;
        }
        setIsLoading(true);

        playgroundActions
            .convertContent(content, 'YAML', 'JSON', promiseId.current)
            .then(response => {
                if (promiseId.current !== response.promiseId) {
                    return;
                }
                setResult(CommonUtils.beautifyJsonString(response.result));
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
                            language="yaml"
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
                                language="json"
                            />
                        </CommonEditorWrapper>
                    )}
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ConversionsYamlToJsonComponent;
