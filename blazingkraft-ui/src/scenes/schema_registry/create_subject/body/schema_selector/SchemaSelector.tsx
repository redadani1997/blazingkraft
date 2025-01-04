import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { SchemaReference, SchemaType } from 'common/types/schema_registry';
import { useState } from 'react';
import CommonAvroSchemaEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaEditor';
import CommonAvroSchemaValidatorEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaValidatorEditor';
import CommonJsonSchemaEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaEditor';
import CommonJsonSchemaValidatorEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaValidatorEditor';
import CommonProtobufSchemaEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaEditor';
import CommonProtobufSchemaValidatorEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaValidatorEditor';

interface SchemaSelectorProps {
    schemaType: any;
    setSchema: any;
    schema: SchemaType;
    setIsSchemaSyntaxValid: any;
    setIsSchemaSchemaValid: any;
    setIsContentSchemaValid: any;
    setIsContentSyntaxValid: any;
    schemaReferences: SchemaReference[];
}

function SchemaSelector({
    schemaType,
    setSchema,
    schema,
    setIsSchemaSyntaxValid,
    setIsSchemaSchemaValid,
    setIsContentSchemaValid,
    setIsContentSyntaxValid,
    schemaReferences,
}: SchemaSelectorProps) {
    const initialContent =
        schemaType === 'JSON'
            ? PlaygroundSchemasUtils.PLAYGROUND_JSON_CONTENT_JSON_DEFAULT
            : schemaType === 'AVRO'
            ? PlaygroundSchemasUtils.PLAYGROUND_AVRO_CONTENT_JSON_DEFAULT
            : PlaygroundSchemasUtils.PLAYGROUND_PROTOBUF_CONTENT_JSON_DEFAULT;

    const [content, setContent] = useState(initialContent);
    if (schemaType === 'JSON')
        return (
            <>
                <CommonJsonSchemaEditor
                    onContentChange={setSchema}
                    content={schema}
                    setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                    setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                    schemaReferences={schemaReferences}
                />
                <CommonJsonSchemaValidatorEditor
                    content={content}
                    setContent={setContent}
                    schema={schema}
                    setIsContentSchemaValid={setIsContentSchemaValid}
                    setIsContentSyntaxValid={setIsContentSyntaxValid}
                    schemaReferences={schemaReferences}
                />
            </>
        );
    if (schemaType === 'AVRO')
        return (
            <>
                <CommonAvroSchemaEditor
                    onContentChange={setSchema}
                    content={schema}
                    setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                    setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                    schemaReferences={schemaReferences}
                />
                <CommonAvroSchemaValidatorEditor
                    content={content}
                    setContent={setContent}
                    schema={schema}
                    setIsContentSchemaValid={setIsContentSchemaValid}
                    setIsContentSyntaxValid={setIsContentSyntaxValid}
                    schemaReferences={schemaReferences}
                />
            </>
        );
    if (schemaType === 'PROTOBUF')
        return (
            <>
                <CommonProtobufSchemaEditor
                    onContentChange={setSchema}
                    content={schema}
                    setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                    setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                    schemaReferences={schemaReferences}
                />
                <CommonProtobufSchemaValidatorEditor
                    content={content}
                    setContent={setContent}
                    schema={schema}
                    setIsContentSchemaValid={setIsContentSchemaValid}
                    setIsContentSyntaxValid={setIsContentSyntaxValid}
                    schemaReferences={schemaReferences}
                />
            </>
        );
}

export default SchemaSelector;
