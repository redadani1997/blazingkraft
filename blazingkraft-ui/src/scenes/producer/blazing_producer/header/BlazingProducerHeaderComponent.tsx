import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import {
    TbArrowBigUpLines,
    TbDotsVertical,
    TbEyeCheck,
    TbPencil,
} from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BlazingProducerComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    topic: string;
    isAuthorizedDescribeProducerConfiguration: boolean;
    isAuthorizedEditProducerConfiguration: boolean;
    setIsImportBlazingRecordsModalOpen: (isOpen: boolean) => void;
}

function renderAdditionalActions(
    clusterCode,
    setIsImportBlazingRecordsModalOpen,
    isAuthorizedDescribeProducerConfiguration,
    isAuthorizedEditProducerConfiguration,
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
                <Menu.Item
                    onClick={() => setIsImportBlazingRecordsModalOpen(true)}
                    icon={<TbArrowBigUpLines size="1rem" />}
                >
                    Import Blazing Records
                </Menu.Item>
                {isAuthorizedDescribeProducerConfiguration && (
                    <Menu.Item
                        component={Link}
                        to={`/clusters/${clusterCode}/producer/configuration`}
                        icon={<TbEyeCheck size="1rem" />}
                    >
                        View Configuration
                    </Menu.Item>
                )}
                {isAuthorizedEditProducerConfiguration && (
                    <Menu.Item
                        component={Link}
                        to={`/clusters/${clusterCode}/producer/configuration/edit`}
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
    topic,
    setIsImportBlazingRecordsModalOpen,
    isAuthorizedDescribeProducerConfiguration,
    isAuthorizedEditProducerConfiguration,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={`Blazing Producer`}
                subLabel={
                    topic && (
                        <div className="flex font-semibold items-center">
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
                        </div>
                    )
                }
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {renderAdditionalActions(
                clusterCode,
                setIsImportBlazingRecordsModalOpen,
                isAuthorizedDescribeProducerConfiguration,
                isAuthorizedEditProducerConfiguration,
            )}
        </div>
    );
}

function BlazingProducerComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    topic,
    isAuthorizedDescribeProducerConfiguration,
    isAuthorizedEditProducerConfiguration,
    setIsImportBlazingRecordsModalOpen,
}: BlazingProducerComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        topic,
        setIsImportBlazingRecordsModalOpen,
        isAuthorizedDescribeProducerConfiguration,
        isAuthorizedEditProducerConfiguration,
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
                    label: 'Producer',
                },
            ]}
            title={title}
        />
    );
}

export default BlazingProducerComponent;
