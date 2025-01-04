import { Card, Text } from '@mantine/core';
import classNames from 'classnames';
import CommonCopy from '../copy/CommonCopy';
import LoadingSpinner from '../loading/LoadingSpinner';

export interface CommonCardDetailsProps {
    title: string;
    content: string | React.ReactNode;
    className?: string;
    isLoading?: boolean;
    contentClassName?: string;
    copyText?: string | number;
}

function CommonCardDetails({
    content,
    isLoading,
    title,
    className,
    contentClassName,
    copyText,
}: CommonCardDetailsProps) {
    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className={classNames(className, 'w-full h-full px-3 py-2')}
        >
            <div className="flex flex-col h-full w-full break-all">
                {copyText !== undefined ? (
                    <Text className="font-semibold flex items-center" size="md">
                        {title}
                        <CommonCopy
                            text={copyText}
                            actionIconClassName="ml-1"
                        />
                    </Text>
                ) : (
                    <Text className="font-semibold" size="md">
                        {title}
                    </Text>
                )}
                <Text
                    size="sm"
                    className={classNames(
                        'flex h-full w-full',
                        contentClassName,
                    )}
                >
                    {content}
                </Text>
            </div>
            <LoadingSpinner isLoading={isLoading} loaderSize="sm" />
        </Card>
    );
}

export default CommonCardDetails;
