import { Alert, Button, Checkbox, Text } from '@mantine/core';
import { useState } from 'react';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IGroupToDelete } from './DeleteGroup';

interface DeleteGroupComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteGroup: (deleteUsers: boolean) => Promise<any>;
    isDeleteGroupPending: boolean;
    groupToDelete: IGroupToDelete;
    isAuthorizedDeleteGroupWithUsers: boolean;
}

function renderModalBody(
    deleteUsers,
    setDeleteUsers,
    groupToDelete: IGroupToDelete,
    isAuthorizedDeleteGroupWithUsers,
) {
    const usersLength = groupToDelete?.numberOfUsers || 0;
    return (
        <>
            {isAuthorizedDeleteGroupWithUsers && (
                <Checkbox
                    className="mb-4"
                    value={deleteUsers}
                    onChange={() => {
                        setDeleteUsers(!deleteUsers);
                    }}
                    label="Delete Users within this group"
                />
            )}
            {usersLength > 0 && (
                <Alert
                    icon={<TbAlertTriangle size="1.4rem" />}
                    title="Beware"
                    color="lime"
                    className="mb-4"
                >
                    <Text>
                        This Group is assigned to {usersLength} user(s)
                        therefore you need to force users deletion.
                    </Text>
                </Alert>
            )}
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm Group Deletion.</Text>
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

function DeleteGroupComponent({
    setIsModalOpen,
    isModalOpen,
    isDeleteGroupPending,
    groupToDelete,
    deleteGroup,
    isAuthorizedDeleteGroupWithUsers,
}: DeleteGroupComponentProps) {
    const [deleteUsers, setDeleteUsers] = useState(false);

    const action = () => deleteGroup(deleteUsers);

    const modalBody = renderModalBody(
        deleteUsers,
        setDeleteUsers,
        groupToDelete,
        isAuthorizedDeleteGroupWithUsers,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Delete Group</Text>
                    <Text color="dimmed" size="xs">
                        {groupToDelete?.name}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteGroupPending}
        />
    );
}

export default DeleteGroupComponent;
