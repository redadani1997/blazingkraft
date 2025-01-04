import { useMantineColorScheme } from '@mantine/core';
import classNames from 'classnames';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef } from 'react';

interface CommonEditorProps {
    content: any;
    onContentChange?: any;
    language?:
        | 'json'
        | 'html'
        | 'text'
        | 'proto'
        | 'typescript'
        | 'javascript'
        | 'sql'
        | 'yaml';
    editorClassName?: string;
    outerClassName?: string;
    defaultValue?: string;
    onValidate?: Function;
    outerHeightStyle?: any;
    outerWidthStyle?: any;
    readOnly?: boolean;
}

function CommonEditor({
    content,
    onContentChange,
    editorClassName,
    outerClassName,
    language,
    defaultValue,
    onValidate,
    outerHeightStyle,
    outerWidthStyle,
    readOnly,
}: CommonEditorProps) {
    const { colorScheme } = useMantineColorScheme();
    const theme = colorScheme === 'dark' ? 'vs-dark' : 'light';

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoElement = useRef(null);
    const preventTriggerChangeEvent = useRef(false);

    useEffect(() => {
        if (monacoElement) {
            if (editorRef.current) {
                editorRef.current.dispose();
            }

            editorRef.current = monaco.editor.create(monacoElement.current, {
                value:
                    defaultValue !== undefined ? defaultValue : content || '',
                language: language,
                automaticLayout: true,
                readOnly,
            });

            editorRef.current.onDidChangeModelContent(() => {
                if (
                    !preventTriggerChangeEvent.current &&
                    onContentChange &&
                    !readOnly
                ) {
                    onContentChange(editorRef.current.getValue());
                }
            });

            if (onValidate) {
                monaco.editor.onDidChangeMarkers(uris => {
                    const editorUri = editorRef.current.getModel()?.uri;

                    if (editorUri) {
                        const currentEditorHasMarkerChanges = uris.find(
                            uri => uri.path === editorUri.path,
                        );
                        if (currentEditorHasMarkerChanges) {
                            const markers = monaco.editor.getModelMarkers({
                                resource: editorUri,
                            });
                            onValidate(markers);
                        }
                    }
                });
            }
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
                const model = editorRef.current.getModel();
                if (model) {
                    model.dispose();
                }
            }
        };
    }, [monacoElement.current, readOnly]);

    useEffect(() => {
        monaco.editor.setTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (editorRef.current) {
            const model = editorRef.current.getModel();
            monaco.editor.setModelLanguage(model, language);
        }
    }, [language]);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateOptions({
                readOnly,
            });
        }
    }, [readOnly]);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }
        if (editorRef.current.getOption(monaco.editor.EditorOption.readOnly)) {
            editorRef.current.setValue(content || '');
        } else if (content !== editorRef.current.getValue()) {
            preventTriggerChangeEvent.current = true;
            editorRef.current.executeEdits('', [
                {
                    range: editorRef.current.getModel().getFullModelRange(),
                    text: content || '',
                    forceMoveMarkers: true,
                },
            ]);

            editorRef.current.pushUndoStop();
            preventTriggerChangeEvent.current = false;
        }
    }, [content]);

    useEffect(() => {
        if (onValidate) {
            onValidate([]);
        }
    }, [onValidate]);

    return (
        <div
            className={classNames(outerClassName)}
            style={{
                height: outerHeightStyle,
                width: outerWidthStyle,
            }}
        >
            <div
                className={classNames(
                    'rounded-md h-full w-full',
                    editorClassName,
                )}
                ref={monacoElement}
            />
        </div>
    );
}

CommonEditor.defaultProps = {
    outerHeightStyle: '100%',
    outerWidthStyle: '100%',
    readOnly: false,
};

export default CommonEditor;
