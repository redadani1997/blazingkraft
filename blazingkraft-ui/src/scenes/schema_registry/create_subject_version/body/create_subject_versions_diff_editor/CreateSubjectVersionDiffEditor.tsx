import { SimpleGrid } from '@mantine/core';
import { SchemaMetaData, SubjectDetails } from 'common/types/schema_registry';
import CreateSubjectVersionLeftSideEditor from './CreateSubjectVersionLeftSideEditor';
import CreateSubjectVersionRightSideEditor from './CreateSubjectVersionRightSideEditor';

interface CreateSubjectVersionDiffEditorProps {
    setSchema: any;
    setIsSchemaSyntaxValid: any;
    setIsSchemaSchemaValid: any;
    setIsSchemaCompatibilityValid: any;
    leftSide: SchemaMetaData;
    rightSide: SchemaMetaData;
    newSchemaVersion: SchemaMetaData;
    subjectDetails: SubjectDetails;
}

function CreateSubjectVersionDiffEditor({
    leftSide,
    rightSide,
    setIsSchemaSchemaValid,
    setIsSchemaSyntaxValid,
    setIsSchemaCompatibilityValid,
    setSchema,
    newSchemaVersion,
    subjectDetails,
}: CreateSubjectVersionDiffEditorProps) {
    // useEffect(() => {
    //     setLeftContent(leftSideContent);
    //     setRightContent(rightSideContent);
    // }, [leftSide]);

    return (
        <SimpleGrid
            cols={2}
            className="h-full w-full"
            breakpoints={[
                {
                    maxWidth: 'sm',
                    cols: 1,
                    spacing: 'sm',
                },
                {
                    maxWidth: 'md',
                    cols: 2,
                    spacing: 'sm',
                },
            ]}
        >
            <CreateSubjectVersionLeftSideEditor
                leftSide={leftSide}
                setIsSchemaSchemaValid={setIsSchemaSchemaValid}
                setIsSchemaSyntaxValid={setIsSchemaSyntaxValid}
                setSchema={setSchema}
                schemaReferences={newSchemaVersion.references}
            />
            <CreateSubjectVersionRightSideEditor
                leftSide={leftSide}
                rightSide={rightSide}
                newSchemaVersion={newSchemaVersion}
                subjectDetails={subjectDetails}
                setIsSchemaCompatibilityValid={setIsSchemaCompatibilityValid}
            />
        </SimpleGrid>
    );
}

export default CreateSubjectVersionDiffEditor;
