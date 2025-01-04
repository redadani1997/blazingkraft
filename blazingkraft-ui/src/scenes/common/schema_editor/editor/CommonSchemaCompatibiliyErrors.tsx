import { Grid, Loader, Text } from '@mantine/core';
import {
    SchemaCompatibility,
    SchemaMetaData,
    SubjectDetails,
} from 'common/types/schema_registry';
import { TbCircleCheck, TbCircleX } from 'react-icons/tb';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';

interface CommonSchemaCompatibiliyErrorsProps {
    subjectDetails: SubjectDetails;
    newSchemaVersion: SchemaMetaData;
    compatibilityErrors: string[];
    isValidating: boolean;
}

function renderColumn(
    schemaCompatibility: SchemaCompatibility,
    compatibilityErrors: string[],
    isValidating: boolean,
) {
    return (
        <Grid.Col
            span={12}
            style={{
                borderStyle: 'solid',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderTopWidth: '0px',
                borderBottomWidth: '0px',
                borderColor: '#6b738d',
            }}
        >
            <Text className="flex items-center" size="sm">
                <CommonTooltip label="Compatibility Check">
                    {schemaCompatibility}
                </CommonTooltip>
                <Text className="pl-1" color={'dimmed'} size="sm">
                    ({compatibilityErrors.length})
                </Text>
                {compatibilityErrors.length === 0 ? (
                    <TbCircleCheck className="ml-2" color="green" />
                ) : (
                    <TbCircleX className="ml-2" color="red" />
                )}
                {isValidating && <Loader size="xs" className="ml-2" />}
            </Text>
            {compatibilityErrors.map(errorMessage => (
                <Text
                    key={errorMessage}
                    className="pl-1"
                    color="dimmed"
                    size="sm"
                >
                    * {errorMessage}
                </Text>
            ))}
        </Grid.Col>
    );
}

function CommonSchemaCompatibiliyErrors({
    subjectDetails,
    isValidating,
    compatibilityErrors,
}: CommonSchemaCompatibiliyErrorsProps) {
    return (
        <CommonScrollArea
            className="h-full"
            style={{
                borderColor: '#6b738d',
                borderStyle: 'solid',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderTopWidth: '1px',
                borderBottomWidth: '0px',
            }}
        >
            <Grid className="m-0 h-full">
                {renderColumn(
                    subjectDetails.compatibility,
                    compatibilityErrors,
                    isValidating,
                )}
            </Grid>
        </CommonScrollArea>
    );
}
export default CommonSchemaCompatibiliyErrors;
