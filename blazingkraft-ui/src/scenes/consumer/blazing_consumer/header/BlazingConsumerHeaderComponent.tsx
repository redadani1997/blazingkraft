import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { TbDotsVertical, TbEyeCheck, TbPencil } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BlazingConsumerComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    topics: string[];
    isAuthorizedEditConsumerConfiguration: boolean;
    isAuthorizedDescribeConsumerConfiguration: boolean;
}

function renderAdditionalActions(
    clusterCode,
    isAuthorizedEditConsumerConfiguration,
    isAuthorizedDescribeConsumerConfiguration,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <Tooltip label="Actions">
                    <ActionIcon color="blue" className="ml-3">
                        <TbDotsVertical size="1.4rem" />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Soft Zone</Menu.Label>
                {isAuthorizedDescribeConsumerConfiguration && (
                    <Menu.Item
                        component={Link}
                        to={`/clusters/${clusterCode}/consumer/configuration`}
                        icon={<TbEyeCheck size="1rem" />}
                    >
                        View Configuration
                    </Menu.Item>
                )}
                {isAuthorizedEditConsumerConfiguration && (
                    <Menu.Item
                        component={Link}
                        to={`/clusters/${clusterCode}/consumer/configuration/edit`}
                        icon={<TbPencil size="1rem" />}
                    >
                        Edit Configuration
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    topics,
    isAuthorizedEditConsumerConfiguration,
    isAuthorizedDescribeConsumerConfiguration,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Blazing Consumer"
                subLabel={
                    <div className="flex flex-wrap font-semibold items-center">
                        {topics.map(topic => (
                            <Tooltip label="Goto Details" key={topic}>
                                <Link
                                    to={`/clusters/${clusterCode}/topics/${topic}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="no-underline"
                                >
                                    <Text
                                        className="pl-3 cursor-pointer"
                                        color="dimmed"
                                        size="md"
                                    >
                                        {topic}
                                    </Text>
                                </Link>
                            </Tooltip>
                        ))}
                    </div>
                }
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditConsumerConfiguration ||
                isAuthorizedDescribeConsumerConfiguration) &&
                renderAdditionalActions(
                    clusterCode,
                    isAuthorizedEditConsumerConfiguration,
                    isAuthorizedDescribeConsumerConfiguration,
                )}
        </div>
    );
}

function BlazingConsumerComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    topics,
    isAuthorizedEditConsumerConfiguration,
    isAuthorizedDescribeConsumerConfiguration,
}: BlazingConsumerComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        topics,
        isAuthorizedEditConsumerConfiguration,
        isAuthorizedDescribeConsumerConfiguration,
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
                    highlighted: false,
                    to: `/clusters/${clusterCode}/topics`,
                    label: 'Topics',
                },
                {
                    highlighted: true,
                    label: 'Consumer',
                },
            ]}
            title={title}
        />
    );
}

export default BlazingConsumerComponent;
