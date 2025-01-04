import { Alert, Button, Text } from '@mantine/core';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface DestroyConnectorComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    destroyConnector: () => Promise<any>;
    isDestroyConnectorPending: boolean;
    connector: string;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm connector destroy.</Text>
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
                leftIcon={<TbTrash size="1rem" />}
                onClick={() => action()}
            >
                Destroy
            </Button>
        </div>
    );
}

function DestroyConnectorComponent({
    setIsModalOpen,
    isModalOpen,
    isDestroyConnectorPending,
    connector,
    destroyConnector,
}: DestroyConnectorComponentProps) {
    const action = () => destroyConnector();
    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Destroy</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDestroyConnectorPending}
        />
    );
}

export default DestroyConnectorComponent;
