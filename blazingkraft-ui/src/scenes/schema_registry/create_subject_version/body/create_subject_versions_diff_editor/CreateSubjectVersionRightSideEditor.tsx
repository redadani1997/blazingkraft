import { useDebouncedValue } from '@mantine/hooks';
import { AvroSchemaUtils } from 'common/schemas/AvroSchemaUtils';
import { SchemaMetaData, SubjectDetails } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CommonDiffEditor from 'scenes/common/editor/CommonDiffEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSchemaCompatibiliyErrors from 'scenes/common/schema_editor/editor/CommonSchemaCompatibiliyErrors';
import { SchemaCompatibilityValidationResponse } from 'scenes/schema_registry/redux';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';

interface CreateSubjectVersionRightSideEditorProps {
    rightSide: SchemaMetaData;
    leftSide: SchemaMetaData;
    newSchemaVersion: SchemaMetaData;
    subjectDetails: SubjectDetails;
    setIsSchemaCompatibilityValid: any;
}

let promiseId = 0;

function CreateSubjectVersionRightSideEditor({
    leftSide,
    rightSide,
    newSchemaVersion,
    subjectDetails,
    setIsSchemaCompatibilityValid,
}: CreateSubjectVersionRightSideEditorProps) {
    const { schemaRegistryCode } = useParams();
    const [debouncedSchema] = useDebouncedValue(newSchemaVersion.schema, 400);
    const [isValidating, setIsValidating] = useState(false);

    const [compatibilityErrors, setCompatibilityErrors] = useState([]);

    const leftSideEditable = leftSide.version === -1;

    const leftSideContent =
        leftSide.schemaType === 'PROTOBUF'
            ? leftSide.schema
            : CommonUtils.beautifyJsonString(leftSide.schema);

    const rightSideContent =
        rightSide.schemaType === 'PROTOBUF'
            ? rightSide.schema
            : CommonUtils.beautifyJsonString(rightSide.schema);

    const rightSideLanguage =
        rightSide.schemaType === 'PROTOBUF' ? 'proto' : 'json';

    useEffect(() => {
        const contentJson =
            newSchemaVersion.schemaType === 'PROTOBUF'
                ? debouncedSchema
                : AvroSchemaUtils.parseStringToJson(debouncedSchema);
        if (contentJson !== null) {
            setIsValidating(true);
            schemaRegistryActions
                .validateSchemaCompatibility(
                    subjectDetails.subject,
                    newSchemaVersion.schemaType,
                    debouncedSchema,
                    newSchemaVersion.references,
                    schemaRegistryCode,
                    ++promiseId,
                )
                .then((res: SchemaCompatibilityValidationResponse) => {
                    if (res.promiseId !== promiseId) {
                        // This means two concurrent validation requests were fired
                        // and this one is transient as it's not the last one to be called.
                        return;
                    }
                    setIsValidating(false);
                    if (!res.schemaDefinitionSucceeded || !res.succeeded) {
                        const computedErrorMessages =
                            !res.succeeded && res.errorMessages
                                ? res.errorMessages
                                : res.schemaDefinitionErrorMessages;
                        setIsSchemaCompatibilityValid(false);
                        setCompatibilityErrors(computedErrorMessages);
                    } else if (compatibilityErrors.length > 0) {
                        setCompatibilityErrors([]);
                        setIsSchemaCompatibilityValid(true);
                    }
                });
        }
    }, [debouncedSchema]);

    if (!leftSideEditable) {
        return (
            <CommonEditorWrapper outerHeightStyle="75%">
                <CommonDiffEditor
                    language={rightSideLanguage}
                    original={rightSideContent}
                    modified={leftSideContent}
                    renderSideBySide={false}
                />
            </CommonEditorWrapper>
        );
    }
    return (
        <CommonEditorWrapper>
            <CommonDiffEditor
                outerHeightStyle="75%"
                modified={leftSideContent}
                language={rightSideLanguage}
                original={rightSideContent}
                renderSideBySide={false}
            />
            <div className="h-1/4">
                <CommonSchemaCompatibiliyErrors
                    subjectDetails={subjectDetails}
                    newSchemaVersion={newSchemaVersion}
                    compatibilityErrors={compatibilityErrors}
                    isValidating={isValidating}
                />
            </div>
        </CommonEditorWrapper>
    );
}

export default CreateSubjectVersionRightSideEditor;
