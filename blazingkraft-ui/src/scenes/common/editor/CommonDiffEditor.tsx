import { useMantineColorScheme } from '@mantine/core';
import classNames from 'classnames';
import CommonStyles from 'common/styles/CommonStyles';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef } from 'react';
import useCommonMediaQuery from '../media/useCommonMediaQuery';

interface CommonDiffEditorProps {
    language:
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
    original: string;
    modified: string;
    outerHeightStyle?: any;
    outerWidthStyle?: any;
    readOnly?: boolean;
    renderSideBySide: boolean;
    autoRenderSideBySide?: boolean;
    onContentChange?: any;
}

function CommonDiffEditor({
    editorClassName,
    outerClassName,
    language,
    original,
    modified,
    outerHeightStyle,
    outerWidthStyle,
    readOnly,
    renderSideBySide,
    autoRenderSideBySide,
    onContentChange,
}: CommonDiffEditorProps) {
    const { colorScheme } = useMantineColorScheme();
    const theme = colorScheme === 'dark' ? 'vs-dark' : 'light';
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });

    const editorRef = useRef<monaco.editor.IDiffEditor | null>(null);
    const monacoElement = useRef(null);
    const preventTriggerChangeEvent = useRef(false);

    useEffect(() => {
        if (monacoElement) {
            if (editorRef.current) {
                editorRef.current.dispose();
            }

            editorRef.current = monaco.editor.createDiffEditor(
                monacoElement.current,
                {
                    automaticLayout: true,
                    minimap: { enabled: false },
                    renderSideBySide,
                    readOnly,
                    overviewRulerLanes: 0,
                    renderOverviewRuler: false,
                },
            );

            const originalModel = monaco.editor.createModel(original, language);

            const modifiedModel = monaco.editor.createModel(modified, language);

            modifiedModel.onDidChangeContent(() => {
                if (
                    !preventTriggerChangeEvent.current &&
                    onContentChange &&
                    !readOnly
                ) {
                    onContentChange(modifiedModel.getValue());
                }
            });

            editorRef.current.setModel({
                original: originalModel,
                modified: modifiedModel,
            });
        }

        return () => {
            if (editorRef.current) {
                const { modified: modifiedEditor, original: originalEditor } =
                    editorRef.current.getModel();
                if (originalEditor) {
                    originalEditor.dispose();
                }
                if (modifiedEditor) {
                    modifiedEditor.dispose();
                }
                // editorRef.current.dispose();
            }
        };
    }, [monacoElement.current]);

    useEffect(() => {
        monaco.editor.setTheme(theme);
    }, [theme]);

    useEffect(() => {
        editorRef.current?.getModel()?.original.setValue(original || '');
    }, [original]);

    useEffect(() => {
        if (editorRef.current) {
            const { original: originalEditor, modified: modifiedEditor } =
                editorRef.current.getModel();
            monaco.editor.setModelLanguage(originalEditor, language);
            monaco.editor.setModelLanguage(modifiedEditor, language);
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
        if (editorRef.current) {
            editorRef.current.updateOptions({
                renderSideBySide:
                    autoRenderSideBySide && renderSideBySide === true
                        ? !isSmall
                        : renderSideBySide,
            });
        }
    }, [isSmall]);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }
        const { modified: modifiedEditor } = editorRef.current.getModel();
        if (modified !== modifiedEditor.getValue()) {
            preventTriggerChangeEvent.current = true;
            modifiedEditor.pushEditOperations(
                [],
                [
                    {
                        range: modifiedEditor.getFullModelRange(),
                        text: modified,
                        forceMoveMarkers: true,
                    },
                ],
                null,
            );

            editorRef.current.getModifiedEditor().pushUndoStop();
            preventTriggerChangeEvent.current = false;
        }
    }, [modified]);

    useEffect(() => {
        if (editorRef.current) {
            const { original: originalEditor } = editorRef.current.getModel();
            if (original !== originalEditor.getValue()) {
                originalEditor.setValue(original);
            }
        }
    }, [original]);

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
            {/* <MonacoDiffEditor
            // wrapperProps={{
            //     className: 'rounded-md border border-solid',
            // }}
            className={classNames('rounded-md h-full', editorClassName)}
            height={height}
            defaultValue={defaultValue !== undefined ? defaultValue : value}
            value={value}
            language={language}
            original={original}
            theme={theme}
            width={width}
            options={{
                automaticLayout: true,
                renderSideBySide: !isSmall,
                readOnly: true,
                minimap: { enabled: false },
                ...(options ? options : {}),
            }}
            onContentChange={onContentChange}
        /> */}
        </div>
    );
}

CommonDiffEditor.defaultProps = {
    outerHeightStyle: '100%',
    outerWidthStyle: '100%',
    readOnly: true,
    autoRenderSideBySide: false,
};

export default CommonDiffEditor;
