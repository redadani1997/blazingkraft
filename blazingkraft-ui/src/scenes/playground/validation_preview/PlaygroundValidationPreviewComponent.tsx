import { Divider, Loader, Text, useMantineTheme } from '@mantine/core';
import classNames from 'classnames';
import { TbCircleCheck, TbCircleX } from 'react-icons/tb';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';

interface PlaygroundValidationPreviewComponentProps {
    syntaxErrors: string[];
    hasSecondaryErrors: boolean;
    secondaryErrors?: string[];
    secondaryErrorsLabel?: string;
    isValidating?: boolean;
}

function PlaygroundValidationPreviewComponent({
    hasSecondaryErrors,
    isValidating,
    secondaryErrors,
    secondaryErrorsLabel,
    syntaxErrors,
}: PlaygroundValidationPreviewComponentProps) {
    const theme = useMantineTheme();
    return (
        <CommonEditorWrapper
            className={classNames('flex flex-col', {
                'bg-white': theme.colorScheme === 'light',
            })}
        >
            <div className={hasSecondaryErrors ? 'h-1/2' : 'h-full'}>
                <CommonScrollArea className="h-full">
                    <Text
                        className="p-3 flex items-center"
                        color="dimmed"
                        size="sm"
                    >
                        <span>Syntax Errors</span>
                        <span className="pl-1">({syntaxErrors.length})</span>
                        {syntaxErrors.length === 0 ? (
                            <TbCircleCheck
                                className="pl-2"
                                size="1.3rem"
                                color="green"
                            />
                        ) : (
                            <TbCircleX
                                className="pl-2"
                                size="1.3rem"
                                color="red"
                            />
                        )}
                    </Text>
                    {syntaxErrors.map((errorMessage, index) => (
                        <Text
                            key={`${index} => ${errorMessage}`}
                            className="pl-3"
                            color="dimmed"
                            size="sm"
                        >
                            * {errorMessage}
                        </Text>
                    ))}
                </CommonScrollArea>
            </div>
            {hasSecondaryErrors && (
                <div className="h-1/2 flex flex-col">
                    <CommonScrollArea className="h-full">
                        <Divider className="" />
                        <Text
                            className="p-3 flex items-center"
                            color="dimmed"
                            size="sm"
                        >
                            <span>{secondaryErrorsLabel}</span>
                            <span className="pl-1">
                                ({secondaryErrors.length})
                            </span>
                            {secondaryErrors.length === 0 ? (
                                <TbCircleCheck
                                    className="pl-2"
                                    size="1.3rem"
                                    color="green"
                                />
                            ) : (
                                <TbCircleX
                                    className="pl-2"
                                    size="1.3rem"
                                    color="red"
                                />
                            )}
                            {isValidating && (
                                <Loader size="xs" className="pl-2" />
                            )}
                        </Text>
                        {secondaryErrors.map((errorMessage, index) => (
                            <Text
                                key={`${index} => ${errorMessage}`}
                                className="pl-3"
                                color="dimmed"
                                size="sm"
                            >
                                * {errorMessage}
                            </Text>
                        ))}
                    </CommonScrollArea>
                </div>
            )}
        </CommonEditorWrapper>
    );
}

export default PlaygroundValidationPreviewComponent;
