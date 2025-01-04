import { ActionIcon, Alert, Text, Tooltip } from '@mantine/core';
import { ConnectorStateInfo, TaskStateInfo } from 'common/types/connector';
import { useMemo, useState } from 'react';
import {
    TbAlertCircle,
    TbAlertTriangle,
    TbEyeCheck,
    TbEyeOff,
    TbMessageCircle,
    TbMessageOff,
    TbRefresh,
} from 'react-icons/tb';
import { useParams } from 'react-router';
import CommonModal from 'scenes/common/modal/CommonModal';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface ConnectorDetailsTasksComponentProps {
    connectorStateInfo: ConnectorStateInfo;
    isGetConnectorStateInfoPending: boolean;
    setTaskToRestart: (taskToRestart: number | null) => void;
    setIsRestartTaskModalOpen: (isRestartTaskModalOpen: boolean) => void;
    isAuthorizedRestartTask: boolean;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'id',
            label: 'Id',
            filterable: true,
            sortable: true,
            width: '20%',
            minWidth: '10rem',
        },
        {
            id: 'workerId',
            label: 'Worker Id',
            filterable: true,
            sortable: true,
            width: '20%',
            minWidth: '13rem',
        },
        {
            id: 'state',
            label: 'State',
            filterable: true,
            sortable: true,
            width: '20%',
            minWidth: '10rem',
        },
        {
            id: 'trace',
            label: 'Trace',
            filterable: true,
            sortable: true,
            width: '20%',
            minWidth: '10rem',
        },
        {
            id: 'msg',
            label: 'Message',
            filterable: true,
            sortable: true,
            width: '20%',
            minWidth: '10rem',
        },
    ];
}

function getData(
    tasks: TaskStateInfo[],
    setIsTraceModalOpen,
    setTrace,
    setIsMessageModalOpen,
    setMessage,
    setTaskToRestart: (taskToRestart: number | null) => void,
    setIsRestartTaskModalOpen: (isRestartTaskModalOpen: boolean) => void,
    isAuthorizedRestartTask,
): CommonTableData[] {
    return tasks.map(task => {
        return {
            id: {
                value: task.id,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        {task.id}
                        {isAuthorizedRestartTask && (
                            <div className="pl-2 flex">
                                <Tooltip label="Restart task">
                                    <ActionIcon
                                        color="blue"
                                        onClick={() => {
                                            setIsRestartTaskModalOpen(true);
                                            setTaskToRestart(task.id);
                                        }}
                                    >
                                        <TbRefresh size="1.4rem" />
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                ),
            },
            workerId: {
                value: task.worker_id,
                displayedValue: task.worker_id,
            },
            state: {
                value: task.state,
                displayedValue: task.state,
            },
            trace: {
                value: task.trace,
                displayedValue: (
                    <div className="flex items-center">
                        <Text className="italic">
                            {task.trace ? 'Available' : '---unavailable---'}
                        </Text>
                        <Tooltip label="Trace Details">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setIsTraceModalOpen(true);
                                    setTrace(task.trace);
                                }}
                                className="ml-3"
                                disabled={!task.trace}
                            >
                                {task.trace ? (
                                    <TbEyeCheck size="1.4rem" />
                                ) : (
                                    <TbEyeOff size="1.4rem" />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </div>
                ),
            },
            msg: {
                value: task.msg,
                displayedValue: (
                    <div className="flex items-center">
                        <Text className="italic">
                            {task.msg ? 'Available' : '---unavailable---'}
                        </Text>
                        <Tooltip label="Message Details">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setIsMessageModalOpen(true);
                                    setMessage(task.msg);
                                }}
                                className="ml-3"
                                disabled={!task.msg}
                            >
                                {task.msg ? (
                                    <TbMessageCircle size="1.4rem" />
                                ) : (
                                    <TbMessageOff size="1.4rem" />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </div>
                ),
            },
        };
    });
}

function ConnectorDetailsTasksComponent({
    connectorStateInfo,
    isGetConnectorStateInfoPending,
    setTaskToRestart,
    setIsRestartTaskModalOpen,
    isAuthorizedRestartTask,
}: ConnectorDetailsTasksComponentProps) {
    if (connectorStateInfo === null) {
        return null;
    }

    const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [trace, setTrace] = useState('');
    const [message, setMessage] = useState('');

    const { kafkaConnectCode } = useParams();

    const { tasks } = connectorStateInfo;

    const memoizedData = useMemo(() => {
        return getData(
            tasks,
            setIsTraceModalOpen,
            setTrace,
            setIsMessageModalOpen,
            setMessage,
            setTaskToRestart,
            setIsRestartTaskModalOpen,
            isAuthorizedRestartTask,
        );
    }, [kafkaConnectCode, tasks]);
    return (
        <>
            <CommonClientTable
                filterType="menu"
                columns={getColumns()}
                data={memoizedData}
                withPaging
                withTopFilter={false}
                totalElements={tasks.length}
                perPage={25}
                isLoading={isGetConnectorStateInfoPending}
                paperClassName="h-full w-full"
            />

            <CommonModal
                isOpen={isTraceModalOpen}
                modalBody={
                    <Alert
                        icon={<TbAlertTriangle size="1.4rem" />}
                        title="Trace"
                        color="lime"
                        className="mb-1 break-all"
                    >
                        <Text>{trace}</Text>
                    </Alert>
                }
                modalTitle={
                    <div className="flex items-center">
                        <Text className="pr-2">Task Trace Details</Text>
                    </div>
                }
                onClose={() => setIsTraceModalOpen(false)}
            />

            <CommonModal
                isOpen={isMessageModalOpen}
                modalBody={
                    <Alert
                        icon={<TbAlertCircle size="1.4rem" />}
                        title="Message"
                        color="blue"
                        className="mb-1 break-all"
                    >
                        <Text>{message}</Text>
                    </Alert>
                }
                modalTitle={
                    <div className="flex items-center">
                        <Text className="pr-2">Task Message Details</Text>
                    </div>
                }
                onClose={() => setIsMessageModalOpen(false)}
            />
        </>
    );
}

export default ConnectorDetailsTasksComponent;
