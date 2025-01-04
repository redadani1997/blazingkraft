import { useDebouncedValue } from '@mantine/hooks';
import { ProtobufSchemaUtils } from 'common/schemas/ProtobufSchemaUtils';
import { SchemaReference } from 'common/types/schema_registry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import playgroundActions from 'scenes/playground/redux/actions';
import { SchemaValidationResponse } from 'scenes/schema_registry/redux';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CommonSchemaEditor from '../editor/CommonSchemaEditor';

interface CommonProtobufSchemaValidatorEditorProps {
    className: string;
    schema: string;
    setIsContentSyntaxValid: Function;
    setIsContentSchemaValid: Function;
    schemaReferences?: SchemaReference[];
    isSchemaRegistryValidation?: boolean;
    content: string;
    setContent: Function;
}

let promiseId = 0;

function CommonProtobufSchemaValidatorEditor({
    className,
    schema,
    setIsContentSchemaValid,
    setIsContentSyntaxValid,
    schemaReferences,
    isSchemaRegistryValidation,
    content,
    setContent,
}: CommonProtobufSchemaValidatorEditorProps) {
    const { schemaRegistryCode } = useParams();

    const [debouncedSchema] = useDebouncedValue(schema, 400);
    const [debouncedContent] = useDebouncedValue(content, 400);
    const [contentSchemaErrors, setContentSchemaErrors] = useState([]);
    const [isValidating, setIsValidating] = useState(false);
    const validate = () => {
        return isSchemaRegistryValidation
            ? schemaRegistryActions.validateSchemaContent(
                  'PROTOBUF',
                  debouncedSchema,
                  schemaReferences,
                  debouncedContent,
                  schemaRegistryCode,
                  ++promiseId,
              )
            : playgroundActions.validateSchemaContent(
                  'PROTOBUF',
                  debouncedSchema,
                  debouncedContent,
                  'JSON',
                  ++promiseId,
              );
    };
    useEffect(() => {
        const contentJson =
            ProtobufSchemaUtils.parseStringToJson(debouncedContent);
        if (debouncedSchema && contentJson !== null) {
            setIsValidating(true);
            validate().then((res: SchemaValidationResponse) => {
                if (res.promiseId !== promiseId) {
                    // This means two concurrent validation requests were fired
                    // and this one is transient as it's not the last one to be called.
                    return;
                }
                setIsValidating(false);
                let computedErrorMessages;
                if (!res.schemaDefinitionSucceeded || !res.succeeded) {
                    computedErrorMessages =
                        !res.succeeded && res.errorMessages
                            ? res.errorMessages
                            : res.schemaDefinitionErrorMessages;
                    setIsContentSchemaValid(false);
                    setContentSchemaErrors(computedErrorMessages);
                } else if (contentSchemaErrors.length > 0) {
                    setContentSchemaErrors([]);
                    setIsContentSchemaValid(true);
                }
            });
        } else {
            setContentSchemaErrors([]);
            setIsContentSchemaValid(true);
        }
    }, [debouncedSchema, debouncedContent, schemaReferences]);
    return (
        <CommonSchemaEditor
            className={className}
            content={content}
            defaultValue={content}
            onContentChange={setContent}
            secondaryErrors={contentSchemaErrors}
            secondaryErrorsLabel="Schema Errors"
            secondaryValidating={isValidating}
            setIsEditorSyntaxValid={setIsContentSyntaxValid}
        />
    );
}

CommonProtobufSchemaValidatorEditor.defaultProps = {
    className: '',
    isSchemaRegistryValidation: true,
    schemaReferences: [],
};

export default CommonProtobufSchemaValidatorEditor;
