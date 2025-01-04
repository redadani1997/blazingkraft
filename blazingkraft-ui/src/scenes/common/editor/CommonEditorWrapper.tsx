import { SimpleGrid } from '@mantine/core';
import classNames from 'classnames';

interface CommonEditorWrapperProps {
    children: any;
    className?: string;
    outerHeightStyle?: any;
    outerWidthStyle?: any;
    minHeight?: string;
}

function CommonEditorWrapper({
    children,
    className,
    outerHeightStyle,
    outerWidthStyle,
    minHeight,
}: CommonEditorWrapperProps) {
    return (
        <SimpleGrid cols={1} className="h-full w-full">
            <div
                className={classNames(
                    'border rounded-md border-solid',
                    className,
                )}
                style={{
                    borderColor: '#6b738d',
                    minHeight,
                    height: outerHeightStyle,
                    width: outerWidthStyle,
                }}
            >
                {children}
            </div>
        </SimpleGrid>
    );
}

CommonEditorWrapper.defaultProps = {
    minHeight: '24rem',
    outerHeightStyle: '99%',
    outerWidthStyle: '100%',
};

export default CommonEditorWrapper;
