import { Alert, Button, Text } from '@mantine/core';
import { BiReset } from 'react-icons/bi';
import { TbAlertTriangle, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ResetConnectorTopicsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    resetConnectorActiveTopics: () => Promise<any>;
    isResetConnectorActiveTopicsPending: boolean;
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
                <Text>Please confirm connector topics reset.</Text>
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
                leftIcon={<BiReset size="1rem" />}
                onClick={() => action()}
            >
                Reset
            </Button>
        </div>
    );
}

function ResetConnectorTopicsComponent({
    setIsModalOpen,
    isModalOpen,
    isResetConnectorActiveTopicsPending,
    connector,
    resetConnectorActiveTopics,
}: ResetConnectorTopicsComponentProps) {
    const action = () => resetConnectorActiveTopics();
    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Topics Reset</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isResetConnectorActiveTopicsPending}
        />
    );
}

export default ResetConnectorTopicsComponent;
