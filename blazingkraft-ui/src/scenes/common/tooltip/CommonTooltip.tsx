import { Popover, Text } from '@mantine/core';
import { FloatingPosition } from '@mantine/core/lib/Floating';
import { useDisclosure } from '@mantine/hooks';

interface CommonTooltipProps {
    label: any;
    children: any;
    className?: string;
    maxWidth?: string;
    /** Dropdown position relative to target */
    position?: FloatingPosition;
}

function CommonTooltip({
    children,
    label,
    maxWidth,
    position,
}: CommonTooltipProps) {
    const [opened, { close, open }] = useDisclosure(false);
    return (
        <Popover
            styles={{ dropdown: { maxWidth: maxWidth } }}
            position={position}
            withArrow
            shadow="md"
            opened={opened}
        >
            <Popover.Target>
                <div
                    onMouseEnter={open}
                    onMouseLeave={close}
                    onMouseDown={close}
                >
                    {children}
                </div>
            </Popover.Target>
            <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                <Text size="sm">{label}</Text>
            </Popover.Dropdown>
        </Popover>
    );
}

CommonTooltip.defaultProps = {
    maxWidth: '13rem',
    position: 'bottom',
};

export default CommonTooltip;
