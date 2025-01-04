import { Alert, Button, Text } from '@mantine/core';
import { TbAlertCircle, TbPlayerPause, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface PauseConnectorComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    pauseConnector: () => Promise<any>;
    isPauseConnectorPending: boolean;
    connector: string;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Confirmation"
                color="blue"
            >
                <Text>Please confirm connector pause.</Text>
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
                color="blue"
                leftIcon={<TbPlayerPause size="1rem" />}
                onClick={() => action()}
            >
                Pause
            </Button>
        </div>
    );
}

function PauseConnectorComponent({
    setIsModalOpen,
    isModalOpen,
    isPauseConnectorPending,
    connector,
    pauseConnector,
}: PauseConnectorComponentProps) {
    const action = () => pauseConnector();
    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Pause</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isPauseConnectorPending}
        />
    );
}

export default PauseConnectorComponent;
