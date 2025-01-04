import { Alert, Button, Text } from '@mantine/core';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface DeleteConsumerGroupComponentProps {
    consumerGroup: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteConsumerGroup: Function;
    isDeleteConsumerGroupPending: boolean;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
                className="mb-4"
            >
                <Text>
                    Confirm the deletion of the consumer group. This will
                    permanently delete the consumer group and all its offsets.
                </Text>
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
                Delete
            </Button>
        </div>
    );
}

function DeleteConsumerGroupComponent({
    consumerGroup,
    isModalOpen,
    setIsModalOpen,
    deleteConsumerGroup,
    isDeleteConsumerGroupPending,
}: DeleteConsumerGroupComponentProps) {
    const action = () => deleteConsumerGroup();
    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Consumer Group Deletion</Text>
                    <Text color="dimmed" size="xs">
                        {consumerGroup}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteConsumerGroupPending}
        />
    );
}

export default DeleteConsumerGroupComponent;
