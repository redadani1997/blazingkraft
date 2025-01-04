import { ScrollArea } from '@mantine/core';
import classNames from 'classnames';

interface CommonScrollAreaProps {
    className?: string;
    style?: any;
    innerStyle?: any;
    innerClassName?: string;
    children?: React.ReactNode;
    id?: string;
}

function CommonScrollArea({
    children,
    className,
    style,
    innerClassName,
    innerStyle,
    id,
}: CommonScrollAreaProps) {
    return (
        <div style={style} className={classNames('relative', className)}>
            <ScrollArea
                id={id}
                style={innerStyle}
                className={classNames('h-full w-full absolute', innerClassName)}
            >
                {children}
            </ScrollArea>
        </div>
    );
}

export default CommonScrollArea;
