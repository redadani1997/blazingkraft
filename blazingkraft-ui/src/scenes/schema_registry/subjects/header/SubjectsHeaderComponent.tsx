import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCirclePlus, TbDotsVertical, TbPencil } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import { SchemaRegistryConfig } from 'scenes/schema_registry/redux';
import UpdateCompatibility from 'scenes/schema_registry/update_compatibility/UpdateCompatibility';
import UpdateMode from 'scenes/schema_registry/update_mode/UpdateMode';

interface SubjectsComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    schemaRegistryConfig: SchemaRegistryConfig | undefined;
    numberOfSubjects: number;
    isAuthorizedCreateSubject: boolean;
    isAuthorizedUpdateSchemaRegistryMode: boolean;
    isAuthorizedUpdateSchemaRegistryCompatibility: boolean;
}

function renderAdditionalActions(
    setIsCompatibilityModalOpen,
    setIsModeModalOpen,
    isAuthorizedUpdateSchemaRegistryMode,
    isAuthorizedUpdateSchemaRegistryCompatibility,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <Tooltip label="Actions">
                    <ActionIcon color="blue" className="ml-3">
                        <TbDotsVertical size="1.4rem" />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Soft Zone</Menu.Label>
                {isAuthorizedUpdateSchemaRegistryCompatibility && (
                    <Menu.Item
                        icon={<TbPencil size="1rem" />}
                        onClick={() => {
                            setIsCompatibilityModalOpen(true);
                        }}
                    >
                        Update Compatibily
                    </Menu.Item>
                )}
                {isAuthorizedUpdateSchemaRegistryMode && (
                    <Menu.Item
                        icon={<TbPencil size="1rem" />}
                        onClick={() => {
                            setIsModeModalOpen(true);
                        }}
                    >
                        Update Mode
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}

function renderTitle(
    schemaRegistryCode,
    refreshPageContent,
    isRefreshPageContentPending,
    schemaRegistryConfig: SchemaRegistryConfig | undefined,
    setIsCompatibilityModalOpen,
    setIsModeModalOpen,
    numberOfSubjects,
    isAuthorizedCreateSubject,
    isAuthorizedUpdateSchemaRegistryMode,
    isAuthorizedUpdateSchemaRegistryCompatibility,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Subjects"
                subLabel={
                    <div className="flex font-semibold">
                        <Tooltip label="Number of Subjects">
                            <Text className="pl-2" color="dimmed" size="xs">
                                ({CommonUtils.beautifyNumber(numberOfSubjects)})
                            </Text>
                        </Tooltip>
                        <Tooltip label="Compatibility">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {schemaRegistryConfig?.compatibility}
                            </Text>
                        </Tooltip>
                        <Tooltip label="Mode">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {schemaRegistryConfig?.mode}
                            </Text>
                        </Tooltip>
                    </div>
                }
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            <div className="flex items-center">
                {isAuthorizedCreateSubject && (
                    <Button
                        component={Link}
                        to={`/schema_registries/${schemaRegistryCode}/subjects/create`}
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Subject
                    </Button>
                )}
                {(isAuthorizedUpdateSchemaRegistryMode ||
                    isAuthorizedUpdateSchemaRegistryCompatibility) &&
                    renderAdditionalActions(
                        setIsCompatibilityModalOpen,
                        setIsModeModalOpen,
                        isAuthorizedUpdateSchemaRegistryMode,
                        isAuthorizedUpdateSchemaRegistryCompatibility,
                    )}
            </div>
        </div>
    );
}

function SubjectsComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    schemaRegistryConfig,
    numberOfSubjects,
    isAuthorizedCreateSubject,
    isAuthorizedUpdateSchemaRegistryMode,
    isAuthorizedUpdateSchemaRegistryCompatibility,
}: SubjectsComponentProps) {
    const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] =
        useState(false);
    const [isModeModalOpen, setIsModeModalOpen] = useState(false);
    const { schemaRegistryCode } = useParams();
    const title = renderTitle(
        schemaRegistryCode,
        refreshPageContent,
        isRefreshPageContentPending,
        schemaRegistryConfig,
        setIsCompatibilityModalOpen,
        setIsModeModalOpen,
        numberOfSubjects,
        isAuthorizedCreateSubject,
        isAuthorizedUpdateSchemaRegistryMode,
        isAuthorizedUpdateSchemaRegistryCompatibility,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/schema_registries',
                        label: 'Schema Registries',
                    },
                    {
                        highlighted: false,
                        to: `/schema_registries/${schemaRegistryCode}/dashboard`,
                        label: schemaRegistryCode,
                    },
                    {
                        highlighted: true,
                        label: 'Subjects',
                    },
                ]}
                title={title}
            />

            <UpdateCompatibility
                isModalOpen={isCompatibilityModalOpen}
                setIsModalOpen={setIsCompatibilityModalOpen}
                initialCompatibility={schemaRegistryConfig?.compatibility}
                target="Schema Registry"
                isSubject={false}
            />
            <UpdateMode
                isModalOpen={isModeModalOpen}
                setIsModalOpen={setIsModeModalOpen}
                initialMode={schemaRegistryConfig?.mode}
                target="Schema Registry"
                isSubject={false}
            />
        </>
    );
}

export default SubjectsComponent;
