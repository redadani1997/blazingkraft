import { Alert, Button, Text } from '@mantine/core';
import { ConnectorStateInfo } from 'common/types/connector';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertCircle, TbRefresh, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface RestartConnectorTaskComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    restartConnectorTask: (task) => Promise<any>;
    isRestartConnectorTaskPending: boolean;
    connector: string;
    taskToRestart: number | null;
    connectorStateInfo: ConnectorStateInfo;
}

function renderModalBody(task, setTask, tasksOptions) {
    return (
        <>
            <CommonSelect
                label="Task"
                value={task}
                onChange={value => setTask(value)}
                data={tasksOptions}
                placeholder="Select task"
            />
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Confirmation"
                color="blue"
                className="mt-4"
            >
                <Text>Please confirm connector task restart.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action, task) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="blue"
                leftIcon={<TbRefresh size="1rem" />}
                onClick={() => action()}
                disabled={CommonValidationUtils.isFalsy(task)}
            >
                Restart
            </Button>
        </div>
    );
}

function RestartConnectorTaskComponent({
    setIsModalOpen,
    isModalOpen,
    isRestartConnectorTaskPending,
    connector,
    restartConnectorTask,
    taskToRestart,
    connectorStateInfo,
}: RestartConnectorTaskComponentProps) {
    const [task, setTask] = useState(taskToRestart);

    useEffect(() => {
        setTask(taskToRestart);
    }, [taskToRestart]);

    const tasksOptions = useMemo(() => {
        if (CommonValidationUtils.isFalsy(connectorStateInfo)) return [];
        const { tasks } = connectorStateInfo;
        return tasks.map(task => ({
            label: `Task ${task.id}`,
            value: task.id,
        }));
    }, [connectorStateInfo]);

    const action = () => restartConnectorTask(task);
    const modalBody = renderModalBody(task, setTask, tasksOptions);
    const modalFooter = renderModalFooter(setIsModalOpen, action, task);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Task Restart</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isRestartConnectorTaskPending}
        />
    );
}

export default RestartConnectorTaskComponent;
