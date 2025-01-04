import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import ClearConsumerGroupOffsets from 'scenes/consumer_group/clear_offsets/ClearConsumerGroupOffsets';
import DeleteConsumerGroup from 'scenes/consumer_group/delete_consumer_group/DeleteConsumerGroup';
import RemoveMember from 'scenes/consumer_group/remove_member/RemoveMember';

interface ConsumerGroupDetailsComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    setIsAlterConsumerGroupOffsetsModalOpened: Function;
    setTopicPartitionOffsetsToAlter: Function;
    isAuthorizedRemoveConsumerGroupMember: boolean;
    isAuthorizedDeleteConsumerGroup: boolean;
    isAuthorizedClearConsumerGroupOffsets: boolean;
    isAuthorizedAlterConsumerGroupOffsets: boolean;
}

function renderAdditionalActions(
    setIsConsumerGroupDeletionModalOpened,
    setIsConsumerGroupMemberDeletionModalOpened,
    setIsAlterConsumerGroupOffsetsModalOpened,
    setTopicPartitionOffsetsToAlter,
    setIsClearAllConsumerGroupOffsetsModalOpened,
    isAuthorizedAlterConsumerGroupOffsets,
    isAuthorizedClearConsumerGroupOffsets,
    isAuthorizedDeleteConsumerGroup,
    isAuthorizedRemoveConsumerGroupMember,
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
                {isAuthorizedAlterConsumerGroupOffsets && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            icon={<TbPencil size="1rem" />}
                            onClick={() => {
                                setTopicPartitionOffsetsToAlter([]);
                                setIsAlterConsumerGroupOffsetsModalOpened(true);
                            }}
                        >
                            Alter Offsets
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}
                {(isAuthorizedClearConsumerGroupOffsets ||
                    isAuthorizedDeleteConsumerGroup ||
                    isAuthorizedRemoveConsumerGroupMember) && (
                    <Menu.Label>Danger Zone</Menu.Label>
                )}

                {isAuthorizedDeleteConsumerGroup && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsConsumerGroupDeletionModalOpened(true);
                        }}
                    >
                        Delete Consumer Group
                    </Menu.Item>
                )}
                {isAuthorizedRemoveConsumerGroupMember && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsConsumerGroupMemberDeletionModalOpened(true);
                        }}
                    >
                        Remove Member
                    </Menu.Item>
                )}
                {isAuthorizedClearConsumerGroupOffsets && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsClearAllConsumerGroupOffsetsModalOpened(true);
                        }}
                    >
                        Clear Offsets
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
    consumerGroup,
    setIsConsumerGroupDeletionModalOpened,
    setIsConsumerGroupMemberDeletionModalOpened,
    setIsAlterConsumerGroupOffsetsModalOpened,
    setTopicPartitionOffsetsToAlter,
    setIsClearAllConsumerGroupOffsetsModalOpened,
    isAuthorizedAlterConsumerGroupOffsets,
    isAuthorizedClearConsumerGroupOffsets,
    isAuthorizedDeleteConsumerGroup,
    isAuthorizedRemoveConsumerGroupMember,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={consumerGroup}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedAlterConsumerGroupOffsets ||
                isAuthorizedClearConsumerGroupOffsets ||
                isAuthorizedDeleteConsumerGroup ||
                isAuthorizedRemoveConsumerGroupMember) && (
                <div className="flex items-center">
                    {renderAdditionalActions(
                        setIsConsumerGroupDeletionModalOpened,
                        setIsConsumerGroupMemberDeletionModalOpened,
                        setIsAlterConsumerGroupOffsetsModalOpened,
                        setTopicPartitionOffsetsToAlter,
                        setIsClearAllConsumerGroupOffsetsModalOpened,
                        isAuthorizedAlterConsumerGroupOffsets,
                        isAuthorizedClearConsumerGroupOffsets,
                        isAuthorizedDeleteConsumerGroup,
                        isAuthorizedRemoveConsumerGroupMember,
                    )}
                </div>
            )}
        </div>
    );
}

function ConsumerGroupDetailsComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    setIsAlterConsumerGroupOffsetsModalOpened,
    setTopicPartitionOffsetsToAlter,
    isAuthorizedAlterConsumerGroupOffsets,
    isAuthorizedClearConsumerGroupOffsets,
    isAuthorizedDeleteConsumerGroup,
    isAuthorizedRemoveConsumerGroupMember,
}: ConsumerGroupDetailsComponentProps) {
    const { clusterCode, consumerGroup } = useParams();
    const [
        isConsumerGroupDeletionModalOpen,
        setIsConsumerGroupDeletionModalOpened,
    ] = useState(false);
    const [
        isConsumerGroupMemberDeletionModalOpen,
        setIsConsumerGroupMemberDeletionModalOpened,
    ] = useState(false);
    const [
        isClearAllConsumerGroupOffsetsModalOpened,
        setIsClearAllConsumerGroupOffsetsModalOpened,
    ] = useState(false);

    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        consumerGroup,
        setIsConsumerGroupDeletionModalOpened,
        setIsConsumerGroupMemberDeletionModalOpened,
        setIsAlterConsumerGroupOffsetsModalOpened,
        setTopicPartitionOffsetsToAlter,
        setIsClearAllConsumerGroupOffsetsModalOpened,
        isAuthorizedAlterConsumerGroupOffsets,
        isAuthorizedClearConsumerGroupOffsets,
        isAuthorizedDeleteConsumerGroup,
        isAuthorizedRemoveConsumerGroupMember,
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
                        to: `/clusters/${clusterCode}/consumer_groups`,
                        label: 'Consumer Groups',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />

            <DeleteConsumerGroup
                isModalOpen={isConsumerGroupDeletionModalOpen}
                setIsModalOpen={setIsConsumerGroupDeletionModalOpened}
                consumerGroup={consumerGroup}
            />

            <ClearConsumerGroupOffsets
                isModalOpen={isClearAllConsumerGroupOffsetsModalOpened}
                setIsModalOpen={setIsClearAllConsumerGroupOffsetsModalOpened}
            />

            <RemoveMember
                isModalOpen={isConsumerGroupMemberDeletionModalOpen}
                setIsModalOpen={setIsConsumerGroupMemberDeletionModalOpened}
            />
        </>
    );
}

export default ConsumerGroupDetailsComponent;
