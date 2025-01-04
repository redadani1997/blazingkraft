import { ActionIcon, Title, Tooltip } from '@mantine/core';
import { TbRefresh } from 'react-icons/tb';

interface CommonTitleLabelProps {
    label: string;
    subLabel?: any;
    refreshPageContent?: any;
    isRefreshPageContentPending?: boolean;
}

function CommonTitleLabel({
    label,
    subLabel,
    refreshPageContent,
    isRefreshPageContentPending,
}: CommonTitleLabelProps) {
    return (
        <span className="flex items-center">
            <div className="flex items-center break-all">
                <Title order={1}>{label}</Title>
                {subLabel}
            </div>

            {refreshPageContent && (
                <div className="ml-3">
                    <Tooltip label="Refresh Page Content">
                        <ActionIcon
                            variant="transparent"
                            className="w-full"
                            onClick={refreshPageContent}
                            disabled={isRefreshPageContentPending}
                        >
                            <TbRefresh size={18} />
                        </ActionIcon>
                    </Tooltip>
                </div>
            )}
        </span>
    );
}

export default CommonTitleLabel;
