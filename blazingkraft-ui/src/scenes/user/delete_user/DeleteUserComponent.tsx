import { Alert, Button, Text } from '@mantine/core';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface DeleteUserComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteUser: () => Promise<any>;
    isDeleteUserPending: boolean;
    userEmail: string;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm User Deletion.</Text>
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

function DeleteUserComponent({
    setIsModalOpen,
    isModalOpen,
    isDeleteUserPending,
    deleteUser,
    userEmail,
}: DeleteUserComponentProps) {
    const action = () => deleteUser();

    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Delete User</Text>
                    <Text color="dimmed" size="xs">
                        {userEmail}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteUserPending}
        />
    );
}

export default DeleteUserComponent;
