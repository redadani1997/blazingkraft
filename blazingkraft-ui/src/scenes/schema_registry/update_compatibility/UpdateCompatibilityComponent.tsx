import { Anchor, Badge, Button, Card, Text, ThemeIcon } from '@mantine/core';
import { SchemaCompatibility } from 'common/types/schema_registry';
import { useEffect, useState } from 'react';
import { TbCheck, TbPencil, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface UpdateCompatibilityComponentProps {
    target: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    updateSubjectCompatibility: Function;
    isUpdateSubjectCompatibilityPending: boolean;
    initialCompatibility: SchemaCompatibility;
}

function renderCard(title, doc, setCompatibility, compatibility) {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            className="my-1"
            style={{
                cursor: 'pointer',
            }}
            onClick={() => setCompatibility(title)}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Badge size="lg">
                    <div className="flex items-center">
                        <Text>{title}</Text>
                        {compatibility === title && (
                            <ThemeIcon size="1rem" className="ml-2">
                                <TbCheck />
                            </ThemeIcon>
                        )}
                    </div>
                </Badge>
                <Text className="pl-3 pt-2" size="sm">
                    {doc}
                </Text>
            </Card.Section>
        </Card>
    );
}

function renderModalBody(target, compatibility, setCompatibility) {
    return (
        <>
            <div className="flex flex-col">
                {renderCard(
                    'BACKWARD',
                    'A Consumer currently consuming and validating messages using the Schema N will be able to process messages produced by schema N-1. In other words you can delete fields or add new optional fields to the newly-created schema N.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'BACKWARD_TRANSITIVE',
                    'A Consumer currently consuming and validating messages using the Schema N will be able to process messages produced by schema N, N-1 or N-2. In other words you can delete fields or add new optional fields to the newly-created schema N.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'FORWARD',
                    'A Consumer currently consuming and validating messages using the Schema N or N-1 will be able to process messages produced by schema N. In other words you can delete optional fields or add new fields to the newly-created schema N.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'FORWARD_TRANSITIVE',
                    'A Consumer currently consuming and validating messages using the Schema N, N-1 or N-2 will be able to process messages produced by schema N. In other words you can delete optional fields or add new fields to the newly-created schema N.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'FULL',
                    'FORWARD + BACKWARD Compatibility.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'FULL_TRANSITIVE',
                    'BACKWARD_TRANSITIVE + FORWARD_TRANSITIVE Compatibility.',
                    setCompatibility,
                    compatibility,
                )}
                {renderCard(
                    'NONE',
                    "No compatibily checks are done when creating new schema versions. Selecting this basically means that you either know what you're doing, or want to test this out in a test environment, or you simply want to shoot yourself in the foot if you're in production.",
                    setCompatibility,
                    compatibility,
                )}
            </div>

            <Text className="pt-2" size="xs" color="dimmed">
                Props to Confluent for this outstanding documentation,
                <Anchor
                    className="pl-1"
                    size="xs"
                    href={`https://docs.confluent.io/platform/current/schema-registry/avro.html#compatibility-types`}
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
                color="indigo"
                leftIcon={<TbPencil size="1rem" />}
                onClick={() => action()}
            >
                Update
            </Button>
        </div>
    );
}

function UpdateCompatibilityComponent({
    setIsModalOpen,
    updateSubjectCompatibility,
    isModalOpen,
    target,
    isUpdateSubjectCompatibilityPending,
    initialCompatibility,
}: UpdateCompatibilityComponentProps) {
    const [compatibility, setCompatibility] =
        useState<SchemaCompatibility>(initialCompatibility);

    useEffect(() => {
        setCompatibility(initialCompatibility);
    }, [initialCompatibility]);

    const action = () =>
        updateSubjectCompatibility(target, compatibility).then(() =>
            setIsModalOpen(false),
        );

    const modalBody = renderModalBody(target, compatibility, setCompatibility);
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Update Compatibility</Text>
                    <Text color="dimmed" size="xs">
                        {target}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isUpdateSubjectCompatibilityPending}
        />
    );
}

export default UpdateCompatibilityComponent;
