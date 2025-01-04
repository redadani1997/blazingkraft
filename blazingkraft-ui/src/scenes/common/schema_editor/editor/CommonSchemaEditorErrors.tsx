import { Grid, Loader, Text } from '@mantine/core';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';

interface CommonSchemaEditorErrorsProps {
    editorErrors: string[];
    secondaryErrors?: string[];
    secondaryErrorsLabel?: string;
    secondaryValidating?: boolean;
}

function CommonSchemaEditorErrors({
    editorErrors,
    secondaryErrors,
    secondaryErrorsLabel,
    secondaryValidating,
}: CommonSchemaEditorErrorsProps) {
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
                <Grid.Col
                    span={secondaryErrorsLabel ? 5 : 12}
                    style={{
                        borderStyle: 'solid',
                        borderLeftWidth: '0px',
                        borderRightWidth: secondaryErrorsLabel ? '1px' : '0px',
                        borderTopWidth: '0px',
                        borderBottomWidth: '0px',
                        borderColor: '#6b738d',
                    }}
                >
                    <Text className="flex items-center" size="sm">
                        Syntax Errors
                        <Text className="pl-1" color={'dimmed'} size="sm">
                            ({editorErrors.length})
                        </Text>
                    </Text>
                    {editorErrors.map((errorMessage, index) => (
                        <Text
                            key={`${index} => ${errorMessage}`}
                            className="pl-1"
                            color="dimmed"
                            size="sm"
                        >
                            * {errorMessage}
                        </Text>
                    ))}
                </Grid.Col>
                {secondaryErrorsLabel && (
                    <Grid.Col
                        span={7}
                        style={{
                            borderStyle: 'solid',
                            borderLeftWidth: '1px',
                            borderRightWidth: '0px',
                            borderTopWidth: '0px',
                            borderBottomWidth: '0px',
                            borderColor: '#6b738d',
                        }}
                    >
                        <Text className="flex items-center" size="sm">
                            {secondaryErrorsLabel}
                            <Text className="pl-1" color={'dimmed'} size="sm">
                                ({secondaryErrors.length})
                            </Text>
                            {secondaryValidating && (
                                <Loader size="xs" className="pl-2" />
                            )}
                        </Text>
                        {secondaryErrors.map((errorMessage, index) => (
                            <Text
                                key={`${index} => ${errorMessage}`}
                                className="pl-1"
                                color="dimmed"
                                size="sm"
                            >
                                * {errorMessage}
                            </Text>
                        ))}
                    </Grid.Col>
                )}
            </Grid>
        </CommonScrollArea>
    );
}
export default CommonSchemaEditorErrors;
