import { Menu } from '@mantine/core';
import { ITopicDetails } from 'common/types/topic';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import {
    TbArrowBigDownLines,
    TbArrowBigUpLines,
    TbArrowUpRightCircle,
    TbPencil,
    TbTrash,
} from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteTopicRecords from 'scenes/topic/delete_topic records/DeleteTopicRecords';
import DeleteTopic from 'scenes/topic/delete_topic/DeleteTopic';
import IncreaseTopicPartitions from 'scenes/topic/increase_topic_partitions/IncreaseTopicPartitions';

interface TopicDetailsHeaderComponentProps {
    refreshPageContent: any;
    topicDetails: ITopicDetails;
    isRefreshPageContentPending: boolean;
    isAuthorizedConsume: boolean;
    isAuthorizedProduce: boolean;
    isAuthorizedDeleteTopic: boolean;
    isAuthorizedDeleteTopicRecords: boolean;
    isAuthorizedIncreaseTopicPartitions: boolean;
    isAuthorizedAlterTopicConfiguration: boolean;
}

function renderAdditionalActions(
    clusterCode,
    topic,
    setIsDeleteTopicModalOpen,
    setIsDeleteTopicRecordsModalOpen,
    setIsIncreaseTopicPartitionsModalOpen,
    isAuthorizedConsume,
    isAuthorizedProduce,
    isAuthorizedDeleteTopic,
    isAuthorizedDeleteTopicRecords,
    isAuthorizedIncreaseTopicPartitions,
    isAuthorizedAlterTopicConfiguration,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <div className="w-auto">
                    <CommonButton
                        variant="outline"
                        color="blue"
                        leftIcon={<IoArrowDownCircleOutline size="1.4rem" />}
                    >
                        Actions
                    </CommonButton>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                {(isAuthorizedProduce || isAuthorizedConsume) && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        {isAuthorizedProduce && (
                            <Menu.Item
                                component={Link}
                                to={`/clusters/${clusterCode}/producer/blazing_producer?topic=${topic}`}
                                icon={<TbArrowBigUpLines size="1rem" />}
                            >
                                Produce
                            </Menu.Item>
                        )}
                        {isAuthorizedConsume && (
                            <Menu.Item
                                component={Link}
                                to={`/clusters/${clusterCode}/consumer/blazing_consumer?topics=${topic}`}
                                icon={<TbArrowBigDownLines size="1rem" />}
                            >
                                Consume
                            </Menu.Item>
                        )}

                        <Menu.Divider />
                    </>
                )}

                {(isAuthorizedDeleteTopic ||
                    isAuthorizedDeleteTopicRecords ||
                    isAuthorizedIncreaseTopicPartitions ||
                    isAuthorizedAlterTopicConfiguration) && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        {isAuthorizedDeleteTopic && (
                            <Menu.Item
                                color="red"
                                icon={<TbTrash size="1rem" />}
                                onClick={() => {
                                    setIsDeleteTopicModalOpen(true);
                                }}
                            >
                                Delete Topic
                            </Menu.Item>
                        )}
                        {isAuthorizedDeleteTopicRecords && (
                            <Menu.Item
                                color="red"
                                icon={<TbTrash size="1rem" />}
                                onClick={() => {
                                    setIsDeleteTopicRecordsModalOpen(true);
                                }}
                            >
                                Delete Topic Records
                            </Menu.Item>
                        )}
                        {isAuthorizedDeleteTopicRecords && (
                            <Menu.Item
                                color="red"
                                icon={<TbArrowUpRightCircle size="1rem" />}
                                onClick={() => {
                                    setIsIncreaseTopicPartitionsModalOpen(true);
                                }}
                            >
                                Increase Topic Partitions
                            </Menu.Item>
                        )}
                        {isAuthorizedAlterTopicConfiguration && (
                            <Menu.Item
                                color="red"
                                component={Link}
                                to={`/clusters/${clusterCode}/topics/${topic}/configuration/alter`}
                                icon={<TbPencil size="1rem" />}
                            >
                                Alter Configuration
                            </Menu.Item>
                        )}
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    clusterCode,
    topic,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteTopicModalOpen,
    setIsDeleteTopicRecordsModalOpen,
    setIsIncreaseTopicPartitionsModalOpen,
    isAuthorizedConsume,
    isAuthorizedProduce,
    isAuthorizedDeleteTopic,
    isAuthorizedDeleteTopicRecords,
    isAuthorizedIncreaseTopicPartitions,
    isAuthorizedAlterTopicConfiguration,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={topic}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedConsume ||
                isAuthorizedProduce ||
                isAuthorizedDeleteTopic ||
                isAuthorizedDeleteTopicRecords ||
                isAuthorizedIncreaseTopicPartitions ||
                isAuthorizedAlterTopicConfiguration) &&
                renderAdditionalActions(
                    clusterCode,
                    topic,
                    setIsDeleteTopicModalOpen,
                    setIsDeleteTopicRecordsModalOpen,
                    setIsIncreaseTopicPartitionsModalOpen,
                    isAuthorizedConsume,
                    isAuthorizedProduce,
                    isAuthorizedDeleteTopic,
                    isAuthorizedDeleteTopicRecords,
                    isAuthorizedIncreaseTopicPartitions,
                    isAuthorizedAlterTopicConfiguration,
                )}
        </div>
    );
}

function TopicDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedConsume,
    isAuthorizedProduce,
    isAuthorizedDeleteTopic,
    isAuthorizedDeleteTopicRecords,
    isAuthorizedIncreaseTopicPartitions,
    isAuthorizedAlterTopicConfiguration,
    topicDetails,
}: TopicDetailsHeaderComponentProps) {
    const { clusterCode, topic } = useParams();
    const [isDeleteTopicModalOpen, setIsDeleteTopicModalOpen] = useState(false);
    const [isDeleteTopicRecordsModalOpen, setIsDeleteTopicRecordsModalOpen] =
        useState(false);
    const [
        isIncreaseTopicPartitionsModalOpen,
        setIsIncreaseTopicPartitionsModalOpen,
    ] = useState(false);
    const navigate = useNavigate();

    const title = renderTitle(
        clusterCode,
        topic,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteTopicModalOpen,
        setIsDeleteTopicRecordsModalOpen,
        setIsIncreaseTopicPartitionsModalOpen,
        isAuthorizedConsume,
        isAuthorizedProduce,
        isAuthorizedDeleteTopic,
        isAuthorizedDeleteTopicRecords,
        isAuthorizedIncreaseTopicPartitions,
        isAuthorizedAlterTopicConfiguration,
    );
    return (
        <>
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
                        label: 'Details',
                    },
                ]}
                title={title}
            />
            <DeleteTopic
                topicToDelete={topic}
                isModalOpen={isDeleteTopicModalOpen}
                setIsModalOpen={setIsDeleteTopicModalOpen}
                onSuccess={() => {
                    navigate(`/clusters/${clusterCode}/topics`);
                }}
            />
            <DeleteTopicRecords
                topicToDeleteRecords={topic}
                isModalOpen={isDeleteTopicRecordsModalOpen}
                setIsModalOpen={setIsDeleteTopicRecordsModalOpen}
                onSuccess={() => {
                    refreshPageContent();
                }}
                topicDetails={topicDetails}
            />
            <IncreaseTopicPartitions
                topicToIncrease={topic}
                isModalOpen={isIncreaseTopicPartitionsModalOpen}
                setIsModalOpen={setIsIncreaseTopicPartitionsModalOpen}
                onSuccess={() => {
                    refreshPageContent();
                }}
                numberOfPartitions={
                    topicDetails.topicDescription?.partitions?.length
                }
            />
        </>
    );
}

export default TopicDetailsHeaderComponent;
