import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteKafkaConnect from 'scenes/kafka_connect/delete_kafka_connect/DeleteKafkaConnect';

interface KafkaConnectDashboardHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedDeleteKafkaConnect: boolean;
    isAuthorizedEditKafkaConnect: boolean;
}

function renderAdditionalActions(
    kafkaConnectCode,
    setIsDeleteKafkaConnectModalOpen,
    isAuthorizedDeleteKafkaConnect,
    isAuthorizedEditKafkaConnect,
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
                {isAuthorizedEditKafkaConnect && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to={`/kafka_connects/${kafkaConnectCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit Kafka Connect
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteKafkaConnect && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteKafkaConnectModalOpen(true);
                            }}
                        >
                            Delete Kafka Connect
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    kafkaConnectCode,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteKafkaConnectModalOpen,
    isAuthorizedDeleteKafkaConnect,
    isAuthorizedEditKafkaConnect,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Dashboard"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditKafkaConnect || isAuthorizedDeleteKafkaConnect) &&
                renderAdditionalActions(
                    kafkaConnectCode,
                    setIsDeleteKafkaConnectModalOpen,
                    isAuthorizedDeleteKafkaConnect,
                    isAuthorizedEditKafkaConnect,
                )}
        </div>
    );
}

function KafkaConnectDashboardHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedDeleteKafkaConnect,
    isAuthorizedEditKafkaConnect,
}: KafkaConnectDashboardHeaderComponentProps) {
    const { kafkaConnectCode } = useParams();
    const [isDeleteKafkaConnectModalOpen, setIsDeleteKafkaConnectModalOpen] =
        useState(false);
    const navigate = useNavigate();

    const title = renderTitle(
        kafkaConnectCode,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteKafkaConnectModalOpen,
        isAuthorizedDeleteKafkaConnect,
        isAuthorizedEditKafkaConnect,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/kafka_connects',
                        label: 'Kafka Connects',
                    },
                    {
                        highlighted: true,
                        label: kafkaConnectCode,
                    },
                ]}
                title={title}
            />
            <DeleteKafkaConnect
                kafkaConnectToDelete={kafkaConnectCode}
                isModalOpen={isDeleteKafkaConnectModalOpen}
                setIsModalOpen={setIsDeleteKafkaConnectModalOpen}
                onSuccess={() => {
                    navigate('/kafka_connects');
                }}
            />
        </>
    );
}

export default KafkaConnectDashboardHeaderComponent;
