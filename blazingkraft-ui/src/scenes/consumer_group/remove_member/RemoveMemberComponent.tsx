import { Alert, Button, Text } from '@mantine/core';
import { ConsumerGroupDescription } from 'common/types/consumer_group';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface RemoveMemberComponentProps {
    consumerGroup: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    removeConsumerGroupMember: Function;
    isDeleteMemberPending: boolean;
    consumerGroupDescription: ConsumerGroupDescription;
}

function renderModalBody(memberOptions, member, setMember) {
    return (
        <div className="flex flex-col">
            <CommonSelect
                className="w-full mb-4"
                label="Member"
                placeholder="Member"
                data={memberOptions}
                value={member}
                searchable
                creatable
                onChange={value => {
                    setMember(value);
                }}
            />

            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
            >
                {memberOptions.length === 0 && (
                    <Text>* No Active Members.</Text>
                )}
                <Text>
                    * Confirm the deletion of the consumer group member.
                </Text>
            </Alert>
        </div>
    );
}

function renderModalFooter(setIsModalOpen, member, action) {
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
                disabled={!member}
            >
                Delete
            </Button>
        </div>
    );
}

function RemoveMemberComponent({
    consumerGroup,
    isModalOpen,
    setIsModalOpen,
    removeConsumerGroupMember,
    isDeleteMemberPending,
    consumerGroupDescription,
}: RemoveMemberComponentProps) {
    const [member, setMember] = useState(undefined);

    const memberOptions = useMemo(
        () =>
            consumerGroupDescription
                ? consumerGroupDescription.members.map(member => {
                      return {
                          label: member.memberId,
                          value: member.memberId,
                      };
                  })
                : [],
        [consumerGroupDescription],
    );

    useEffect(() => {
        setMember(undefined);
    }, [isModalOpen]);

    const action = () => removeConsumerGroupMember(member);
    const modalBody = renderModalBody(memberOptions, member, setMember);
    const modalFooter = renderModalFooter(setIsModalOpen, member, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Consumer Group Member Removal</Text>
                    <Text color="dimmed" size="xs">
                        {consumerGroup}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteMemberPending}
        />
    );
}

export default RemoveMemberComponent;
