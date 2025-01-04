import { Anchor, Badge, Button, Card, Text, ThemeIcon } from '@mantine/core';
import { SchemaRegistryMode } from 'common/types/schema_registry';
import { useEffect, useState } from 'react';
import { TbCheck, TbPencil, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface UpdateModeComponentProps {
    target: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    updateMode: Function;
    isUpdateModePending: boolean;
    initialMode: SchemaRegistryMode;
    isSubject: boolean;
}

function renderCard(title: SchemaRegistryMode, doc, setMode, mode) {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            className="my-1"
            style={{
                cursor: 'pointer',
            }}
            onClick={() => setMode(title)}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Badge size="lg">
                    <div className="flex items-center">
                        <Text>{title}</Text>
                        {mode === title && (
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

function renderModalBody(mode, setMode) {
    return (
        <>
            <div className="flex flex-col">
                {renderCard('IMPORT', 'Ability to import data.', setMode, mode)}
                {renderCard(
                    'READONLY',
                    'Ability to only read data',
                    setMode,
                    mode,
                )}
                {renderCard(
                    'READONLY_OVERRIDE',
                    'Ability to read and override data',
                    setMode,
                    mode,
                )}
                {renderCard(
                    'READWRITE',
                    'Ability to read and write data',
                    setMode,
                    mode,
                )}
            </div>

            <Text className="pt-2" size="xs" color="dimmed">
                Props to Confluent for this marvellous documentation,
                <Anchor
                    className="pl-1"
                    size="xs"
                    href={`https://docs.confluent.io/platform/current/schema-registry/develop/api.html#mode`}
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

function UpdateModeComponent({
    setIsModalOpen,
    updateMode,
    isModalOpen,
    target,
    isUpdateModePending,
    initialMode,
}: UpdateModeComponentProps) {
    const [mode, setMode] = useState<SchemaRegistryMode>(initialMode);

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    useEffect(() => {
        setMode(initialMode);
    }, [isModalOpen]);

    const action = () =>
        updateMode(target, mode).then(() => setIsModalOpen(false));

    const modalBody = renderModalBody(mode, setMode);
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Update Mode</Text>
                    <Text color="dimmed" size="xs">
                        {target}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isUpdateModePending}
        />
    );
}

export default UpdateModeComponent;
