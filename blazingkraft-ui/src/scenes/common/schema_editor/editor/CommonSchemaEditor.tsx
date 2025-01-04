import { useCallback, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSchemaEditorErrors from './CommonSchemaEditorErrors';

interface CommonSchemaEditorProps {
    className?: string;
    onContentChange: any;
    content: any;
    defaultValue: string;
    secondaryErrors?: string[];
    secondaryErrorsLabel?: string;
    setIsEditorSyntaxValid: Function;
    language?: 'json' | 'text' | 'proto';
    secondaryValidating?: boolean;
}

function CommonSchemaEditor({
    content,
    onContentChange,
    defaultValue,
    secondaryErrors,
    secondaryErrorsLabel,
    setIsEditorSyntaxValid,
    language,
    secondaryValidating,
}: CommonSchemaEditorProps) {
    const [editorErrors, setEditorErrors] = useState([]);
    const handleEditorValidation = useCallback(markers => {
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
        setIsEditorSyntaxValid(errorMessages.length === 0);
        setEditorErrors(errorMessages);
    }, []);

    return (
        <CommonEditorWrapper>
            <CommonEditor
                content={content}
                outerHeightStyle="75%"
                language={language}
                onContentChange={onContentChange}
                defaultValue={defaultValue}
                onValidate={handleEditorValidation}
            />
            <div className="h-1/4">
                <CommonSchemaEditorErrors
                    secondaryErrors={secondaryErrors}
                    secondaryErrorsLabel={secondaryErrorsLabel}
                    secondaryValidating={secondaryValidating}
                    editorErrors={editorErrors}
                />
            </div>
        </CommonEditorWrapper>
    );
}

CommonSchemaEditor.defaultProps = {
    className: '',
    language: 'json',
};

export default CommonSchemaEditor;
