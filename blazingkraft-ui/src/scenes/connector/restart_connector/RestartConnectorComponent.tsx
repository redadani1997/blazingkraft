import { Alert, Button, Checkbox, Grid, Text } from '@mantine/core';
import { useState } from 'react';
import { TbAlertTriangle, TbRefresh, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface RestartConnectorComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    restartConnector: (includeTasks, onlyFailed) => Promise<any>;
    isRestartConnectorPending: boolean;
    connector: string;
}

function renderModalBody(
    includeTasks,
    onlyFailed,
    setIncludeTasks,
    setOnlyFailed,
) {
    return (
        <>
            <Grid>
                <Grid.Col span={12} md={6}>
                    <Checkbox
                        label="Include Tasks"
                        className=" pt-4"
                        checked={includeTasks}
                        onChange={() => {
                            setIncludeTasks(!includeTasks);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                    <Checkbox
                        label="Only Failed"
                        className=" pt-4"
                        checked={onlyFailed}
                        onChange={() => {
                            setOnlyFailed(!onlyFailed);
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
                className="mt-4"
            >
                <Text>* Select whether to also restart tasks.</Text>
                <Text>
                    * Select whether to only restart failed tasks/connectors.
                </Text>
                <Text>* Please confirm connector restart.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action) {
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
                color="red"
                leftIcon={<TbRefresh size="1rem" />}
                onClick={() => action()}
            >
                Restart
            </Button>
        </div>
    );
}

function RestartConnectorComponent({
    setIsModalOpen,
    isModalOpen,
    isRestartConnectorPending,
    connector,
    restartConnector,
}: RestartConnectorComponentProps) {
    const [includeTasks, setIncludeTasks] = useState(false);
    const [onlyFailed, setOnlyFailed] = useState(false);
    const action = () => restartConnector(includeTasks, onlyFailed);
    const modalBody = renderModalBody(
        includeTasks,
        onlyFailed,
        setIncludeTasks,
        setOnlyFailed,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Restart</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isRestartConnectorPending}
        />
    );
}

export default RestartConnectorComponent;
