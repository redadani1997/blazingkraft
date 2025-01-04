import { useDebouncedValue } from '@mantine/hooks';
import { PlaygroundSchemasUtils } from 'common/playground/PlaygroundSchemasUtils';
import { JsonSchemaUtils } from 'common/schemas/JsonSchemaUtils';
import { SchemaReference } from 'common/types/schema_registry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import playgroundActions from 'scenes/playground/redux/actions';
import { SchemaDefinitionValidationResponse } from 'scenes/schema_registry/redux';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CommonSchemaEditor from '../editor/CommonSchemaEditor';

interface CommonJsonSchemaEditorProps {
    className: string;
    onContentChange: any;
    content: any;
    setIsSchemaSyntaxValid: Function;
    setIsSchemaSchemaValid: Function;
    mountExampleSchema?: boolean;
    schemaReferences?: SchemaReference[];
    isSchemaRegistryValidation?: boolean;
}

let promiseId = 0;

function CommonJsonSchemaEditor({
    className,
    content,
    onContentChange,
    setIsSchemaSchemaValid,
    setIsSchemaSyntaxValid,
    mountExampleSchema,
    schemaReferences,
    isSchemaRegistryValidation,
}: CommonJsonSchemaEditorProps) {
    const { schemaRegistryCode } = useParams();
    const [debouncedSchema] = useDebouncedValue(content, 400);
    const [isValidating, setIsValidating] = useState(false);

    const [schemaDefinitionErrors, setSchemaDefinitionErrors] = useState([]);
    useEffect(() => {
        if (mountExampleSchema) {
            onContentChange(
                PlaygroundSchemasUtils.PLAYGROUND_JSON_SCHEMA_DEFAULT,
            );
        }
    }, []);

    const validate = () => {
        return isSchemaRegistryValidation
            ? schemaRegistryActions.validateSchemaDefinition(
                  'JSON',
                  debouncedSchema,
                  schemaReferences,
                  schemaRegistryCode,
                  ++promiseId,
              )
            : playgroundActions.validateSchemaDefinition(
                  'JSON',
                  debouncedSchema,
                  ++promiseId,
              );
    };

    useEffect(() => {
        const contentJson = JsonSchemaUtils.parseStringToJson(debouncedSchema);
        if (contentJson !== null) {
            setIsValidating(true);
            validate().then((res: SchemaDefinitionValidationResponse) => {
                if (res.promiseId !== promiseId) {
                    // This means two concurrent validation requests were fired
                    // and this one is transient as it's not the last one to be called.
                    return;
                }
                setIsValidating(false);
                if (!res.succeeded) {
                    const { errorMessages } = res;
                    if (errorMessages.length > 0) {
                        setSchemaDefinitionErrors(errorMessages);
                        setIsSchemaSchemaValid(false);
                    }
                } else if (schemaDefinitionErrors.length > 0) {
                    setSchemaDefinitionErrors([]);
                    setIsSchemaSchemaValid(true);
                }
            });
        }
    }, [debouncedSchema, schemaReferences]);

    return (
        <CommonSchemaEditor
            className={className}
            content={content}
            defaultValue={content}
            onContentChange={onContentChange}
            secondaryErrors={schemaDefinitionErrors}
            secondaryErrorsLabel="Schema Definition Errors"
            secondaryValidating={isValidating}
            setIsEditorSyntaxValid={setIsSchemaSyntaxValid}
        />
    );
}

CommonJsonSchemaEditor.defaultProps = {
    className: '',
    mountExampleSchema: true,
    isSchemaRegistryValidation: true,
    schemaReferences: [],
};

export default CommonJsonSchemaEditor;
