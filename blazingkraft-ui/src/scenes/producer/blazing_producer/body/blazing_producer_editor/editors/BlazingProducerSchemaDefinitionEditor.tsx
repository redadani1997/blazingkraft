import { ProducerSerializer } from 'common/types/producer';
import { useEffect } from 'react';
import CommonAvroSchemaEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaEditor';
import CommonJsonSchemaEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaEditor';
import CommonProtobufSchemaEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaEditor';

interface BlazingProducerSchemaDefinitionEditorProps {
    schema: string;
    setSchema: (schema: string) => void;
    serializer: ProducerSerializer;
    setIsSchemaDefinitionValid: any;
    setIsSchemaSyntaxValid: any;
}

function BlazingProducerSchemaDefinitionEditor({
    schema,
    setSchema,
    serializer,
    setIsSchemaDefinitionValid,
    setIsSchemaSyntaxValid,
}: BlazingProducerSchemaDefinitionEditorProps) {
    useEffect(() => {
        return () => {
            setIsSchemaDefinitionValid(true);
            setIsSchemaSyntaxValid(true);
        };
    }, []);

    if (serializer === 'JSON_SCHEMA') {
        return (
            <CommonJsonSchemaEditor
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
                mountExampleSchema={false}
            />
        );
    }
    if (serializer === 'AVRO_SCHEMA') {
        return (
            <CommonAvroSchemaEditor
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
                mountExampleSchema={false}
            />
        );
    }
    if (serializer === 'PROTOBUF_SCHEMA') {
        return (
            <CommonProtobufSchemaEditor
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
                mountExampleSchema={false}
            />
        );
    }
    return <></>;
}

export default BlazingProducerSchemaDefinitionEditor;
