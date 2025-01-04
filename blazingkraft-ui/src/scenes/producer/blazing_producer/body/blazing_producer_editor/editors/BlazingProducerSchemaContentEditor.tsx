import { ProducerSerializer } from 'common/types/producer';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useCallback, useEffect } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonAvroSchemaValidatorEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaValidatorEditor';
import CommonJsonSchemaValidatorEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaValidatorEditor';
import CommonProtobufSchemaValidatorEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaValidatorEditor';

interface BlazingProducerSchemaContentEditorProps {
    schema: string;
    content: string;
    setContent: (schema: string) => void;
    serializer: ProducerSerializer;
    setIsContentSchemaValid: any;
    setIsContentSyntaxValid: any;
}

function BlazingProducerSchemaContentEditor({
    schema,
    content,
    setContent,
    serializer,
    setIsContentSchemaValid,
    setIsContentSyntaxValid,
}: BlazingProducerSchemaContentEditorProps) {
    useEffect(() => {
        if (!ProducerUtils.isSchemaEditorSerializer(serializer)) {
            setIsContentSchemaValid(true);
        }
    }, [serializer]);

    const memoizedSetIsContentSyntaxValid = useCallback((markers: any) => {
        setIsContentSyntaxValid(!markers || markers.length === 0);
    }, []);

    if (serializer === 'JSON_SCHEMA') {
        return (
            <CommonJsonSchemaValidatorEditor
                schema={schema}
                setContent={setContent}
                content={content}
                setIsContentSchemaValid={setIsContentSchemaValid}
                setIsContentSyntaxValid={setIsContentSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }
    if (serializer === 'AVRO_SCHEMA') {
        return (
            <CommonAvroSchemaValidatorEditor
                schema={schema}
                setContent={setContent}
                content={content}
                setIsContentSchemaValid={setIsContentSchemaValid}
                setIsContentSyntaxValid={setIsContentSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }
    if (serializer === 'PROTOBUF_SCHEMA') {
        return (
            <CommonProtobufSchemaValidatorEditor
                schema={schema}
                setContent={setContent}
                content={content}
                setIsContentSchemaValid={setIsContentSchemaValid}
                setIsContentSyntaxValid={setIsContentSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }

    return (
        <CommonEditorWrapper minHeight="23rem">
            <CommonEditor
                content={content}
                language={
                    ProducerUtils.isTextEditorSerializer(serializer)
                        ? 'text'
                        : 'json'
                }
                onContentChange={setContent}
                defaultValue={content}
                onValidate={memoizedSetIsContentSyntaxValid}
            />
        </CommonEditorWrapper>
    );
}

export default BlazingProducerSchemaContentEditor;
