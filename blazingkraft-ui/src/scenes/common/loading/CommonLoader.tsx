import { Loader, MantineTheme } from '@mantine/core';
import { MantineColor } from '@mantine/styles';

interface CommonLoaderProps {
    loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    type?: MantineTheme['loader'];
    className?: string;
    color?: MantineColor;
}

function CommonLoader({
    loaderSize,
    type,
    className,
    color,
}: CommonLoaderProps) {
    return (
        <Loader
            className={className}
            size={loaderSize}
            variant={type}
            color={color}
        />
    );
}

export default CommonLoader;
