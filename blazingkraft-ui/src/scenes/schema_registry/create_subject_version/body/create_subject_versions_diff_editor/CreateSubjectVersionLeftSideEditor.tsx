import { SchemaMetaData, SchemaReference } from 'common/types/schema_registry';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonAvroSchemaEditor from 'scenes/common/schema_editor/avro/CommonAvroSchemaEditor';
import CommonJsonSchemaEditor from 'scenes/common/schema_editor/json/CommonJsonSchemaEditor';
import CommonProtobufSchemaEditor from 'scenes/common/schema_editor/protobuf/CommonProtobufSchemaEditor';

interface CreateSubjectVersionLeftSideEditorProps {
    leftSide: SchemaMetaData;
    setSchema: any;
    setIsSchemaSyntaxValid: any;
    setIsSchemaSchemaValid: any;
    schemaReferences: SchemaReference[];
}

function CreateSubjectVersionLeftSideEditor({
    leftSide,
    setSchema,
    setIsSchemaSyntaxValid,
    setIsSchemaSchemaValid,
    schemaReferences,
}: CreateSubjectVersionLeftSideEditorProps) {
    const leftSideEditable = leftSide.version === -1;

    if (!leftSideEditable) {
        return (
            <CommonEditorWrapper outerHeightStyle="75%">
                <CommonEditor
                    content={leftSide.schema}
                    language={
                        leftSide.schemaType === 'PROTOBUF' ? 'proto' : 'json'
                    }
                    readOnly
                />
            </CommonEditorWrapper>
        );
    }
    if (leftSide.schemaType === 'JSON')
        return (
            <CommonJsonSchemaEditor
                onContentChange={setSchema}
                content={leftSide.schema}
                setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                schemaReferences={schemaReferences}
                mountExampleSchema={false}
            />
        );
    if (leftSide.schemaType === 'AVRO')
        return (
            <CommonAvroSchemaEditor
                onContentChange={setSchema}
                content={leftSide.schema}
                setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                schemaReferences={schemaReferences}
                mountExampleSchema={false}
            />
        );
    if (leftSide.schemaType === 'PROTOBUF')
        return (
            <CommonProtobufSchemaEditor
                onContentChange={setSchema}
                content={leftSide.schema}
                setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                schemaReferences={schemaReferences}
                mountExampleSchema={false}
            />
        );
}

export default CreateSubjectVersionLeftSideEditor;
