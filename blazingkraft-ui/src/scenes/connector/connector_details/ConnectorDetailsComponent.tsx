import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import RestartConnectorTask from '../restart_connector_task/RestartConnectorTask';
import ConnectorDetailsBody from './body/ConnectorDetailsBody';
import ConnectorDetailsHeader from './header/ConnectorDetailsHeader';

interface ConnectorDetailsComponentProps {
    refreshPageContent: () => void;
    jmxEnabled: boolean;
}

function ConnectorDetailsComponent({
    refreshPageContent,
    jmxEnabled,
}: ConnectorDetailsComponentProps) {
    const [taskToRestart, setTaskToRestart] = useState(null);
    const [isRestartTaskModalOpen, setIsRestartTaskModalOpen] = useState(false);
    return (
        <>
            <ConnectorDetailsHeader
                refreshPageContent={refreshPageContent}
                setIsRestartTaskModalOpen={setIsRestartTaskModalOpen}
            />
            <CommonBody>
                <ConnectorDetailsBody
                    setIsRestartTaskModalOpen={setIsRestartTaskModalOpen}
                    setTaskToRestart={setTaskToRestart}
                    jmxEnabled={jmxEnabled}
                />
            </CommonBody>
            <RestartConnectorTask
                refreshPageContent={refreshPageContent}
                isModalOpen={isRestartTaskModalOpen}
                setIsModalOpen={setIsRestartTaskModalOpen}
                taskToRestart={taskToRestart}
            />
        </>
    );
}

export default ConnectorDetailsComponent;
