import { Alert, Anchor, Button, Text } from '@mantine/core';
import { TbAlertCircle, TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface DeleteSubjectComponentProps {
    subject: string;
    permanent: boolean;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteSubject: Function;
    isDeleteSubjectPending: boolean;
}

function renderModalBody(subject, permanent) {
    return (
        <>
            {permanent ? (
                <>
                    <Alert
                        icon={<TbAlertTriangle size="1.4rem" />}
                        title="Beware"
                        color="lime"
                        className="mb-4"
                    >
                        <Text>
                            Permanently deleting a subject results in the
                            deletion of all schemas that fall under the subject
                            with its respective schema ids, therefore if another
                            subject references any of the schema ids, the schema
                            version will be deleted automaticaly.
                        </Text>
                    </Alert>
                    <Alert
                        icon={<TbAlertCircle size={16} />}
                        title="Info"
                        color="blue"
                    >
                        <Text>
                            But on the bright side the schema registry has a
                            maximum limit for schemas that can be registered,
                            and by permanently deleting a Subject (Schemas), you
                            can free up space for additional schemas.
                        </Text>
                    </Alert>
                </>
            ) : (
                <>
                    <Alert
                        icon={<TbAlertCircle size={16} />}
                        title="Info"
                        color="blue"
                    >
                        <Text>
                            Soft Deleting a Subject won't delete the
                            corresponding schema Ids and because Ids cannot be
                            reused, you won't be able to profit from their space
                            as the Ids continue to exist, so if you want to free
                            the schema registry space you'll need to permanently
                            delete the Subject.
                        </Text>
                    </Alert>
                </>
            )}

            <Text className="pt-2" size="xs" color="dimmed">
                Props to Confluent for this astonishing documentation,
                <Anchor
                    className="pl-1"
                    size="xs"
                    href={`https://docs.confluent.io/platform/current/schema-registry/schema-deletion-guidelines.html#schema-deletion-guidelines`}
                    target="_blank"
                >
                    learn more here
                </Anchor>
            </Text>
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

function DeleteSubjectComponent({
    setIsModalOpen,
    deleteSubject,
    isModalOpen,
    permanent,
    subject,
    isDeleteSubjectPending,
}: DeleteSubjectComponentProps) {
    const action = () => deleteSubject(subject, permanent);
    const modalBody = renderModalBody(subject, permanent);
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Subject Deletion</Text>
                    <Text color="dimmed" size="xs">
                        {subject}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteSubjectPending}
        />
    );
}

export default DeleteSubjectComponent;
