import { Box, Popover, Progress, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCheck, TbX } from 'react-icons/tb';

export interface Requirement {
    meets: boolean;
    label: string;
}

interface WithRequirementsProps {
    requirements: Map<string, Requirement>;
    children: React.ReactNode;
}

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean;
    label: string;
}) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <TbCheck size="0.9rem" /> : <TbX size="0.9rem" />}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

function getStrength(requirements: { key: string; value: Requirement }[]) {
    let multiplier = 0;

    requirements.forEach(({ value }) => {
        if (!value.meets) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function WithRequirements({ requirements, children }: WithRequirementsProps) {
    const [popoverOpened, setPopoverOpened] = useState(false);

    const requirementArray: { key: string; value: Requirement }[] =
        CommonUtils.mapToArray(requirements);

    const checks = requirementArray.map(({ key, value }) => (
        <PasswordRequirement
            key={key}
            label={value.label}
            meets={value.meets}
        />
    ));

    const strength = getStrength(requirementArray);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Box>
            <Popover
                opened={popoverOpened}
                position="bottom"
                styles={{
                    dropdown: { maxWidth: '20rem', minWidth: '15rem' },
                }}
                // width="target"
                transitionProps={{ transition: 'pop' }}
            >
                <Popover.Target>
                    <div
                        onFocusCapture={() => setPopoverOpened(true)}
                        onBlurCapture={() => setPopoverOpened(false)}
                    >
                        {children}
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    {checks}
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
}

export default WithRequirements;
