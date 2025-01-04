import { Alert, Button, Text } from '@mantine/core';
import { TbAlertCircle, TbPlayerPlay, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ResumeConnectorComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    resumeConnector: () => Promise<any>;
    isResumeConnectorPending: boolean;
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
                <Text>Please confirm connector resume.</Text>
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
                leftIcon={<TbPlayerPlay size="1rem" />}
                onClick={() => action()}
            >
                Resume
            </Button>
        </div>
    );
}

function ResumeConnectorComponent({
    setIsModalOpen,
    isModalOpen,
    isResumeConnectorPending,
    connector,
    resumeConnector,
}: ResumeConnectorComponentProps) {
    const action = () => resumeConnector();
    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Connector Resume</Text>
                    <Text color="dimmed" size="xs">
                        {connector}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isResumeConnectorPending}
        />
    );
}

export default ResumeConnectorComponent;
