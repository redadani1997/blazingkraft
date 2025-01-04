import { Code, useMantineColorScheme } from '@mantine/core';

interface CommonCodeProps {
    children: React.ReactNode;
    className?: string;
}

function CommonCode({ children, className }: CommonCodeProps) {
    const { colorScheme } = useMantineColorScheme();
    return (
        <Code
            style={{
                backgroundColor:
                    colorScheme === 'dark' ? '#2C2E33' : 'rgb(230 224 249)',
            }}
            className={className}
        >
            {children}
        </Code>
    );
}

export default CommonCode;
