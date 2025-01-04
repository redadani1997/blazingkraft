import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import { SubjectDetails } from 'common/types/schema_registry';
import { useState } from 'react';
import {
    TbCirclePlus,
    TbDotsVertical,
    TbPencil,
    TbTrash,
} from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteSubject from 'scenes/schema_registry/delete_subject/DeleteSubject';
import DeleteSubjectVersion from 'scenes/schema_registry/delete_subject_version/DeleteSubjectVersion';
import UpdateCompatibility from 'scenes/schema_registry/update_compatibility/UpdateCompatibility';
import UpdateMode from 'scenes/schema_registry/update_mode/UpdateMode';

interface SubjectDetailsComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    subjectDetails?: SubjectDetails;
    isAuthorizedDeleteSubject: boolean;
    isAuthorizedDeleteSubjectVersion: boolean;
    isAuthorizedUpdateSubjectCompatibility: boolean;
    isAuthorizedUpdateSubjectMode: boolean;
    isAuthorizedCreateSubjectVersion: boolean;
}

function renderAdditionalActions(
    setIsSubjectDeletionModalOpened,
    setIsSubjectDeletionPermanent,
    setIsSchemaVersionDeletionModalOpened,
    setIsSchemaVersionDeletionPermanent,
    setIsCompatibilityModalOpen,
    setIsModeModalOpen,
    isAuthorizedDeleteSubject,
    isAuthorizedDeleteSubjectVersion,
    isAuthorizedUpdateSubjectCompatibility,
    isAuthorizedUpdateSubjectMode,
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
                {(isAuthorizedDeleteSubject ||
                    isAuthorizedDeleteSubjectVersion) && (
                    <Menu.Label>Soft Zone</Menu.Label>
                )}
                {isAuthorizedUpdateSubjectCompatibility && (
                    <Menu.Item
                        icon={<TbPencil size="1rem" />}
                        onClick={() => {
                            setIsCompatibilityModalOpen(true);
                        }}
                    >
                        Update Compatibily
                    </Menu.Item>
                )}
                {isAuthorizedUpdateSubjectMode && (
                    <Menu.Item
                        icon={<TbPencil size="1rem" />}
                        onClick={() => {
                            setIsModeModalOpen(true);
                        }}
                    >
                        Update Mode
                    </Menu.Item>
                )}
                {isAuthorizedDeleteSubject && (
                    <Menu.Item
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsSubjectDeletionModalOpened(true);
                            setIsSubjectDeletionPermanent(false);
                        }}
                    >
                        Soft Delete Subject
                    </Menu.Item>
                )}
                {isAuthorizedDeleteSubjectVersion && (
                    <Menu.Item
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsSchemaVersionDeletionModalOpened(true);
                            setIsSchemaVersionDeletionPermanent(false);
                        }}
                    >
                        Soft Delete Schema Version
                    </Menu.Item>
                )}
                {(isAuthorizedDeleteSubject ||
                    isAuthorizedDeleteSubjectVersion) && (
                    <>
                        <Menu.Divider />
                        <Menu.Label>Danger Zone</Menu.Label>
                    </>
                )}
                {isAuthorizedDeleteSubject && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsSubjectDeletionModalOpened(true);
                            setIsSubjectDeletionPermanent(true);
                        }}
                    >
                        Permanent Delete Subject
                    </Menu.Item>
                )}
                {isAuthorizedDeleteSubjectVersion && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsSchemaVersionDeletionModalOpened(true);
                            setIsSchemaVersionDeletionPermanent(true);
                        }}
                    >
                        Permanent Delete Schema Version
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}

function renderTitle(
    schemaRegistryCode,
    subject,
    subjectDetails: SubjectDetails | undefined,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsSubjectDeletionModalOpened,
    setIsSubjectDeletionPermanent,
    setIsSchemaVersionDeletionModalOpened,
    setIsSchemaVersionDeletionPermanent,
    setIsCompatibilityModalOpen,
    setIsModeModalOpen,
    isAuthorizedDeleteSubject,
    isAuthorizedDeleteSubjectVersion,
    isAuthorizedUpdateSubjectCompatibility,
    isAuthorizedUpdateSubjectMode,
    isAuthorizedCreateSubjectVersion,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Subject Details"
                subLabel={
                    <div className="flex font-semibold">
                        <Tooltip label="Compatibility">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.compatibility}
                            </Text>
                        </Tooltip>
                        <Tooltip label="Mode">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.mode}
                            </Text>
                        </Tooltip>
                        <Tooltip label="Schema Type">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.schemasMetaData[0]?.schemaType}
                            </Text>
                        </Tooltip>
                    </div>
                }
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            <div className="flex items-center">
                {isAuthorizedCreateSubjectVersion && (
                    <Button
                        component={Link}
                        to={`/schema_registries/${schemaRegistryCode}/subjects/${subject}/versions/create`}
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Version
                    </Button>
                )}
                {(isAuthorizedDeleteSubject ||
                    isAuthorizedDeleteSubjectVersion ||
                    isAuthorizedUpdateSubjectCompatibility ||
                    isAuthorizedUpdateSubjectMode) &&
                    renderAdditionalActions(
                        setIsSubjectDeletionModalOpened,
                        setIsSubjectDeletionPermanent,
                        setIsSchemaVersionDeletionModalOpened,
                        setIsSchemaVersionDeletionPermanent,
                        setIsCompatibilityModalOpen,
                        setIsModeModalOpen,
                        isAuthorizedDeleteSubject,
                        isAuthorizedDeleteSubjectVersion,
                        isAuthorizedUpdateSubjectCompatibility,
                        isAuthorizedUpdateSubjectMode,
                    )}
            </div>
        </div>
    );
}

function SubjectDetailsComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    subjectDetails,
    isAuthorizedDeleteSubject,
    isAuthorizedDeleteSubjectVersion,
    isAuthorizedUpdateSubjectCompatibility,
    isAuthorizedUpdateSubjectMode,
    isAuthorizedCreateSubjectVersion,
}: SubjectDetailsComponentProps) {
    const { schemaRegistryCode, subject } = useParams();
    const [isSubjectDeletionModalOpen, setIsSubjectDeletionModalOpened] =
        useState(false);
    const [isSubjectDeletionPermanent, setIsSubjectDeletionPermanent] =
        useState(false);
    const [
        isSchemaVersionDeletionModalOpen,
        setIsSchemaVersionDeletionModalOpened,
    ] = useState(false);
    const [
        isSchemaVersionDeletionPermanent,
        setIsSchemaVersionDeletionPermanent,
    ] = useState(false);
    const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] =
        useState(false);
    const [isModeModalOpen, setIsModeModalOpen] = useState(false);
    const title = renderTitle(
        schemaRegistryCode,
        subject,
        subjectDetails,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsSubjectDeletionModalOpened,
        setIsSubjectDeletionPermanent,
        setIsSchemaVersionDeletionModalOpened,
        setIsSchemaVersionDeletionPermanent,
        setIsCompatibilityModalOpen,
        setIsModeModalOpen,
        isAuthorizedDeleteSubject,
        isAuthorizedDeleteSubjectVersion,
        isAuthorizedUpdateSubjectCompatibility,
        isAuthorizedUpdateSubjectMode,
        isAuthorizedCreateSubjectVersion,
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
                        highlighted: false,
                        to: `/schema_registries/${schemaRegistryCode}/subjects`,
                        label: 'Subjects',
                    },
                    {
                        highlighted: true,
                        label: subject,
                    },
                ]}
                title={title}
            />
            <DeleteSubject
                isModalOpen={isSubjectDeletionModalOpen}
                setIsModalOpen={setIsSubjectDeletionModalOpened}
                permanent={isSubjectDeletionPermanent}
                subject={subject}
            />
            <DeleteSubjectVersion
                isModalOpen={isSchemaVersionDeletionModalOpen}
                setIsModalOpen={setIsSchemaVersionDeletionModalOpened}
                permanent={isSchemaVersionDeletionPermanent}
                subject={subject}
            />
            <UpdateCompatibility
                isModalOpen={isCompatibilityModalOpen}
                setIsModalOpen={setIsCompatibilityModalOpen}
                target={subject}
                isSubject
                initialCompatibility={subjectDetails?.compatibility}
            />
            <UpdateMode
                isModalOpen={isModeModalOpen}
                setIsModalOpen={setIsModeModalOpen}
                target={subject}
                isSubject
                initialMode={subjectDetails?.mode}
            />
        </>
    );
}

export default SubjectDetailsComponent;
