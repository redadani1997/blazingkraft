import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { TbCopy } from 'react-icons/tb';

export interface CommonCopyProps {
    text: string | number;
    actionIconClassName?: string;
}

function CommonCopy({ text, actionIconClassName }: CommonCopyProps) {
    const clipboard = useClipboard();
    return (
        <Tooltip label="Copy">
            <ActionIcon
                className={actionIconClassName}
                onClick={() => clipboard.copy(text)}
            >
                <TbCopy size="1.4rem" />
            </ActionIcon>
        </Tooltip>
    );
}

export default CommonCopy;
