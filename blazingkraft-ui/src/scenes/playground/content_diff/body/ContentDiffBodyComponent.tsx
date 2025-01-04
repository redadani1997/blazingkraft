import { Grid, Text } from '@mantine/core';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { useState } from 'react';
import CommonDiffEditor from 'scenes/common/editor/CommonDiffEditor';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSelect from 'scenes/common/select/CommonSelect';

type ContentType =
    | 'json'
    | 'html'
    | 'text'
    | 'proto'
    | 'typescript'
    | 'javascript'
    | 'sql'
    | 'yaml';

const ContentDiffBodyComponent = () => {
    const [original, setOriginal] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_CONTENT_JSON_DEFAULT,
    );
    const [modified, setModified] = useState(
        PlaygroundSchemasUtils.PLAYGROUND_JSON_CONTENT_JSON_DEFAULT,
    );

    const [originalType, setOriginalType] = useState<ContentType>('json');

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="h-auto">
                <Grid.Col span={12} lg={6}>
                    <CommonSelect
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
                                label: 'PROTOBUF',
                                value: 'proto',
                            },
                            {
                                label: 'Typescript',
                                value: 'typescript',
                            },
                            {
                                label: 'SQL',
                                value: 'sql',
                            },
                            {
                                label: 'HTML',
                                value: 'html',
                            },
                            {
                                label: 'Text',
                                value: 'text',
                            },
                        ]}
                        clearable={false}
                        value={originalType}
                        onChange={(originalType: ContentType) => {
                            let original = '';
                            let modified = '';
                            if (originalType === 'json') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT;
                            } else if (originalType === 'proto') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT;
                            } else if (originalType === 'typescript') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_TYPESCRIPT_CONTENT_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_TYPESCRIPT_CONTENT_DEFAULT;
                            } else if (originalType === 'sql') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_SQL_CONTENT_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_SQL_CONTENT_DEFAULT;
                            } else if (originalType === 'yaml') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT;
                            } else if (originalType === 'text') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_TEXT_CONTENT_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_TEXT_CONTENT_DEFAULT;
                            } else if (originalType === 'html') {
                                original =
                                    PlaygroundSchemasUtils.PLAYGROUND_HTML_CONTENT_DEFAULT;
                                modified =
                                    PlaygroundSchemasUtils.PLAYGROUND_HTML_CONTENT_DEFAULT;
                            }
                            setOriginal(original);
                            setModified(modified);
                            setOriginalType(originalType);
                        }}
                        label="Content type"
                        className="pb-3 w-1/2"
                    />
                </Grid.Col>
            </Grid>
            <Grid className="flex-1">
                <Grid.Col span={12} lg={6} className="flex flex-col">
                    <Text className="pb-2 font-semibold h-auto" color="dimmed">
                        Original:
                    </Text>
                    <div className="flex-1">
                        <CommonEditorWrapper>
                            <CommonEditor
                                content={original}
                                defaultValue={original}
                                onContentChange={setOriginal}
                                language={originalType}
                            />
                        </CommonEditorWrapper>
                    </div>
                </Grid.Col>
                <Grid.Col span={12} lg={6} className="flex flex-col">
                    <Text className="pb-2 font-semibold h-auto" color="dimmed">
                        Modified:
                    </Text>
                    <div className="flex-1">
                        <CommonEditorWrapper>
                            <CommonDiffEditor
                                language={originalType}
                                original={original}
                                modified={modified}
                                renderSideBySide={false}
                                readOnly={false}
                                onContentChange={setModified}
                            />
                        </CommonEditorWrapper>
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ContentDiffBodyComponent;
