import { ConsumerDeserializer } from 'common/types/consumer';
import { useEffect } from 'react';
import CommonAvroSchemaEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaEditor';
import CommonJsonSchemaEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaEditor';
import CommonProtobufSchemaEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaEditor';

interface BlazingConsumerSchemaEditorProps {
    schema: string;
    setSchema: (schema: string) => void;
    deserializer: ConsumerDeserializer;
    setIsSchemaDefinitionValid: any;
    setIsSchemaSyntaxValid: any;
}

function BlazingConsumerSchemaEditor({
    schema,
    setSchema,
    deserializer,
    setIsSchemaDefinitionValid,
    setIsSchemaSyntaxValid,
}: BlazingConsumerSchemaEditorProps) {
    useEffect(() => {
        return () => {
            setIsSchemaDefinitionValid(true);
            setIsSchemaSyntaxValid(true);
        };
    }, []);
    if (deserializer === 'JSON_SCHEMA') {
        return (
            <CommonJsonSchemaEditor
                mountExampleSchema={false}
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }
    if (deserializer === 'AVRO_SCHEMA') {
        return (
            <CommonAvroSchemaEditor
                mountExampleSchema={false}
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }
    if (deserializer === 'PROTOBUF_SCHEMA') {
        return (
            <CommonProtobufSchemaEditor
                mountExampleSchema={false}
                content={schema}
                onContentChange={setSchema}
                setIsSchemaSchemaValid={setIsSchemaDefinitionValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                isSchemaRegistryValidation={false}
            />
        );
    }

    return <></>;
}

export default BlazingConsumerSchemaEditor;
