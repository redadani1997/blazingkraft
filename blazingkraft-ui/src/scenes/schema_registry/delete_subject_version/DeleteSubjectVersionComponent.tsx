import { Alert, Anchor, Button, Grid, Text } from '@mantine/core';
import { SubjectDetails } from 'common/types/schema_registry';
import { useMemo, useState } from 'react';
import { TbAlertCircle, TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface DeleteSubjectVersionComponentProps {
    subject: string;
    permanent: boolean;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteSchemaVersion: Function;
    isDeleteSubjectVersionPending: boolean;
    subjectDetails: SubjectDetails;
}

function renderModalBody(
    versionsOptions,
    schemaVersion,
    setSchemaVersion,
    permanent,
) {
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
                            Permanently deleting a schema results in the
                            deletion of its respective schema id, therefore if
                            another subject references the schema id, the delete
                            action will result in an error.
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
                            and by permanently deleting a schema, you can free
                            up space for additional schemas.
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
                            Soft Deleting a schema won't delete the
                            corresponding schema Id and because Ids cannot be
                            reused, you won't be able to profit from their space
                            as the Ids continue to exist, so if you want to free
                            the schema registry space you'll need to permanently
                            delete the schema.
                        </Text>
                    </Alert>
                </>
            )}
            <Grid className="py-4">
                <Grid.Col span={12} md={6}>
                    <CommonSelect
                        label="Subject Version"
                        data={versionsOptions}
                        value={schemaVersion}
                        onChange={value => {
                            setSchemaVersion(value);
                        }}
                    />
                </Grid.Col>
            </Grid>

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

function renderModalFooter(schemaVersion, setIsModalOpen, action) {
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
                disabled={!schemaVersion}
            >
                Delete
            </Button>
        </div>
    );
}

function DeleteSubjectVersionComponent({
    setIsModalOpen,
    deleteSchemaVersion,
    isModalOpen,
    permanent,
    subject,
    subjectDetails,
    isDeleteSubjectVersionPending,
}: DeleteSubjectVersionComponentProps) {
    const versionsOptions = useMemo(
        () =>
            subjectDetails.schemasMetaData.map(meta => ({
                label: `Version ${meta.version} (${meta.schemaType})`,
                value: meta.version,
            })),
        [subjectDetails],
    );

    const [schemaVersion, setSchemaVersion] = useState(
        versionsOptions.length > 0 ? versionsOptions[0].value : null,
    );

    const action = () => deleteSchemaVersion(subject, schemaVersion, permanent);
    const modalBody = renderModalBody(
        versionsOptions,
        schemaVersion,
        setSchemaVersion,
        permanent,
    );
    const modalFooter = renderModalFooter(
        schemaVersion,
        setIsModalOpen,
        action,
    );
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Subject Version Deletion</Text>
                    <Text color="dimmed" size="xs">
                        {subject}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteSubjectVersionPending}
        />
    );
}

export default DeleteSubjectVersionComponent;
