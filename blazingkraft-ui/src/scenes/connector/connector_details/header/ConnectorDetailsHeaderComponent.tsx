import { Menu } from '@mantine/core';
import { useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import {
    TbPencil,
    TbPlayerPause,
    TbPlayerPlay,
    TbRefresh,
    TbTrash
} from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DestroyConnector from 'scenes/connector/destroy_connector/DestroyConnector';
import PauseConnector from 'scenes/connector/pause_connector/PauseConnector';
import ResetConnectorTopics from 'scenes/connector/reset_connector_topics/ResetConnectorTopics';
import RestartConnector from 'scenes/connector/restart_connector/RestartConnector';
import ResumeConnector from 'scenes/connector/resume_connector/ResumeConnector';

interface ConnectorDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    setIsRestartTaskModalOpen: (isModalOpen: boolean) => void;
    isAuthorizedPauseConnector: boolean;
    isAuthorizedResumeConnector: boolean;
    isAuthorizedRestartConnector: boolean;
    isAuthorizedDestroyConnector: boolean;
    isAuthorizedRestartTask: boolean;
    isAuthorizedResetConnectorTopics: boolean;
    isAuthorizedEditConnector: boolean;
}

function renderAdditionalActions(
    kafkaConnectCode,
    connector,
    setIsPauseConnectorModalOpen,
    setIsRestartConnectorModalOpen,
    setIsDestroyConnectorModalOpen,
    setIsResetTopicsModalOpen,
    setIsResumeConnectorModalOpen,
    setIsRestartTaskModalOpen,
    isAuthorizedDestroyConnector,
    isAuthorizedPauseConnector,
    isAuthorizedRestartConnector,
    isAuthorizedResumeConnector,
    isAuthorizedRestartTask,
    isAuthorizedResetConnectorTopics,
    isAuthorizedEditConnector,
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
                {(isAuthorizedEditConnector ||
                    isAuthorizedPauseConnector ||
                    isAuthorizedResumeConnector ||
                    isAuthorizedRestartTask) && (
                    <Menu.Label>Soft Zone</Menu.Label>
                )}
                {isAuthorizedEditConnector && (
                    <Menu.Item
                        component={Link}
                        to={`/kafka_connects/${kafkaConnectCode}/connectors/${connector}/edit`}
                        icon={<TbPencil size="1rem" />}
                    >
                        Edit Configuration
                    </Menu.Item>
                )}
                {isAuthorizedPauseConnector && (
                    <Menu.Item
                        icon={<TbPlayerPause size="1rem" />}
                        onClick={() => {
                            setIsPauseConnectorModalOpen(true);
                        }}
                    >
                        Pause Connector
                    </Menu.Item>
                )}
                {isAuthorizedResumeConnector && (
                    <Menu.Item
                        icon={<TbPlayerPlay size="1rem" />}
                        onClick={() => {
                            setIsResumeConnectorModalOpen(true);
                        }}
                    >
                        Resume Connector
                    </Menu.Item>
                )}
                {isAuthorizedRestartTask && (
                    <Menu.Item
                        icon={<TbRefresh size="1rem" />}
                        onClick={() => {
                            setIsRestartTaskModalOpen(true);
                        }}
                    >
                        Restart Task
                    </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Label>Danger Zone</Menu.Label>
                {isAuthorizedResetConnectorTopics && (
                    <Menu.Item
                        color="red"
                        icon={<BiReset size="1rem" />}
                        onClick={() => {
                            setIsResetTopicsModalOpen(true);
                        }}
                    >
                        Reset Topics
                    </Menu.Item>
                )}
                {isAuthorizedRestartConnector && (
                    <Menu.Item
                        color="red"
                        icon={<TbRefresh size="1rem" />}
                        onClick={() => {
                            setIsRestartConnectorModalOpen(true);
                        }}
                    >
                        Restart Connector
                    </Menu.Item>
                )}
                {isAuthorizedDestroyConnector && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsDestroyConnectorModalOpen(true);
                        }}
                    >
                        Destroy Connector
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}

function renderTitle(
    kafkaConnectCode,
    connector,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsPauseConnectorModalOpen,
    setIsRestartConnectorModalOpen,
    setIsDestroyConnectorModalOpen,
    setIsResetTopicsModalOpen,
    setIsResumeConnectorModalOpen,
    setIsRestartTaskModalOpen,
    isAuthorizedDestroyConnector,
    isAuthorizedPauseConnector,
    isAuthorizedRestartConnector,
    isAuthorizedResumeConnector,
    isAuthorizedRestartTask,
    isAuthorizedResetConnectorTopics,
    isAuthorizedEditConnector,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={connector}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedDestroyConnector ||
                isAuthorizedPauseConnector ||
                isAuthorizedRestartConnector ||
                isAuthorizedResumeConnector ||
                isAuthorizedRestartTask ||
                isAuthorizedResetConnectorTopics ||
                isAuthorizedEditConnector) &&
                renderAdditionalActions(
                    kafkaConnectCode,
                    connector,
                    setIsPauseConnectorModalOpen,
                    setIsRestartConnectorModalOpen,
                    setIsDestroyConnectorModalOpen,
                    setIsResetTopicsModalOpen,
                    setIsResumeConnectorModalOpen,
                    setIsRestartTaskModalOpen,
                    isAuthorizedDestroyConnector,
                    isAuthorizedPauseConnector,
                    isAuthorizedRestartConnector,
                    isAuthorizedResumeConnector,
                    isAuthorizedRestartTask,
                    isAuthorizedResetConnectorTopics,
                    isAuthorizedEditConnector,
                )}
        </div>
    );
}

function ConnectorDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    setIsRestartTaskModalOpen,
    isAuthorizedDestroyConnector,
    isAuthorizedPauseConnector,
    isAuthorizedRestartConnector,
    isAuthorizedResumeConnector,
    isAuthorizedRestartTask,
    isAuthorizedResetConnectorTopics,
    isAuthorizedEditConnector,
}: ConnectorDetailsHeaderComponentProps) {
    const { kafkaConnectCode, connector } = useParams();
    const [isPauseConnectorModalOpen, setIsPauseConnectorModalOpen] =
        useState(false);
    const [isRestartConnectorModalOpen, setIsRestartConnectorModalOpen] =
        useState(false);
    const [isDestroyConnectorModalOpen, setIsDestroyConnectorModalOpen] =
        useState(false);
    const [isResetTopicsModalOpen, setIsResetTopicsModalOpen] = useState(false);
    const [isResumeConnectorModalOpen, setIsResumeConnectorModalOpen] =
        useState(false);

    const title = renderTitle(
        kafkaConnectCode,
        connector,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsPauseConnectorModalOpen,
        setIsRestartConnectorModalOpen,
        setIsDestroyConnectorModalOpen,
        setIsResetTopicsModalOpen,
        setIsResumeConnectorModalOpen,
        setIsRestartTaskModalOpen,
        isAuthorizedDestroyConnector,
        isAuthorizedPauseConnector,
        isAuthorizedRestartConnector,
        isAuthorizedResumeConnector,
        isAuthorizedRestartTask,
        isAuthorizedResetConnectorTopics,
        isAuthorizedEditConnector,
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
                        highlighted: false,
                        to: `/kafka_connects/${kafkaConnectCode}/dashboard`,
                        label: kafkaConnectCode,
                    },
                    {
                        highlighted: false,
                        to: `/kafka_connects/${kafkaConnectCode}/connectors`,
                        label: 'Connectors',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />
            <PauseConnector
                isModalOpen={isPauseConnectorModalOpen}
                setIsModalOpen={setIsPauseConnectorModalOpen}
                refreshPageContent={refreshPageContent}
            />
            <ResetConnectorTopics
                isModalOpen={isResetTopicsModalOpen}
                setIsModalOpen={setIsResetTopicsModalOpen}
                refreshPageContent={refreshPageContent}
            />
            <ResumeConnector
                isModalOpen={isResumeConnectorModalOpen}
                setIsModalOpen={setIsResumeConnectorModalOpen}
                refreshPageContent={refreshPageContent}
            />
            <DestroyConnector
                isModalOpen={isDestroyConnectorModalOpen}
                setIsModalOpen={setIsDestroyConnectorModalOpen}
                refreshPageContent={refreshPageContent}
            />
            <RestartConnector
                isModalOpen={isRestartConnectorModalOpen}
                setIsModalOpen={setIsRestartConnectorModalOpen}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default ConnectorDetailsHeaderComponent;
