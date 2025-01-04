import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllTopicsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    topicsLength: number;
    isAuthorizedCreateTopic: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    topicsLength,
    isAuthorizedCreateTopic,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Topics"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Topics">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(topicsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateTopic && (
                <Button
                    component={Link}
                    to={`/clusters/${clusterCode}/topics/create`}
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create Topic
                </Button>
            )}
        </div>
    );
}

function AllTopicsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    topicsLength,
    isAuthorizedCreateTopic,
}: AllTopicsHeaderComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        topicsLength,
        isAuthorizedCreateTopic,
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
                    label: 'Topics',
                },
            ]}
            title={title}
        />
    );
}

export default AllTopicsHeaderComponent;
