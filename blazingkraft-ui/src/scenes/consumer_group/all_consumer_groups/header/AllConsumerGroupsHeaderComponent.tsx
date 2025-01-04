import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllConsumerGroupsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    consumerGroupsLength: number;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    consumerGroupsLength,
) {
    return (
        <CommonTitleLabel
            label="Consumer Groups"
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isRefreshPageContentPending}
            subLabel={
                <Tooltip label="Number of Consumer Groups">
                    <div className="flex font-semibold items-center">
                        <Text className="pl-2" color="dimmed" size="md">
                            ({CommonUtils.beautifyNumber(consumerGroupsLength)})
                        </Text>
                    </div>
                </Tooltip>
            }
        />
    );
}

function AllConsumerGroupsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    consumerGroupsLength,
}: AllConsumerGroupsHeaderComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        consumerGroupsLength,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/clusters',
                    label: 'Clusters',
                },
                {
                    highlighted: false,
                    to: `/clusters/${clusterCode}/dashboard`,
                    label: clusterCode,
                },
                {
                    highlighted: true,
                    label: 'Consumer Groups',
                },
            ]}
            title={title}
        />
    );
}

export default AllConsumerGroupsHeaderComponent;
