import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteSchemaRegistry from 'scenes/schema_registry/delete_schema_registry/DeleteSchemaRegistry';

interface SchemaRegistryDashboardHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedDeleteSchemaRegistry: boolean;
    isAuthorizedEditSchemaRegistry: boolean;
}

function renderAdditionalActions(
    schemaRegistryCode,
    setIsDeleteSchemaRegistryModalOpen,
    isAuthorizedDeleteSchemaRegistry,
    isAuthorizedEditSchemaRegistry,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <div className="w-auto">
                    <CommonButton
                        variant="outline"
                        color="blue"
                        leftIcon={<IoArrowDownCircleOutline size="1.4rem" />}
                    >
                        Actions
                    </CommonButton>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                {isAuthorizedEditSchemaRegistry && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to={`/schema_registries/${schemaRegistryCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit Schema Registry
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteSchemaRegistry && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteSchemaRegistryModalOpen(true);
                            }}
                        >
                            Delete Schema Registry
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    schemaRegistryCode,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteSchemaRegistryModalOpen,
    isAuthorizedDeleteSchemaRegistry,
    isAuthorizedEditSchemaRegistry,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Dashboard"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditSchemaRegistry ||
                isAuthorizedDeleteSchemaRegistry) &&
                renderAdditionalActions(
                    schemaRegistryCode,
                    setIsDeleteSchemaRegistryModalOpen,
                    isAuthorizedDeleteSchemaRegistry,
                    isAuthorizedEditSchemaRegistry,
                )}
        </div>
    );
}

function SchemaRegistryDashboardHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedDeleteSchemaRegistry,
    isAuthorizedEditSchemaRegistry,
}: SchemaRegistryDashboardHeaderComponentProps) {
    const { schemaRegistryCode } = useParams();
    const [
        isDeleteSchemaRegistryModalOpen,
        setIsDeleteSchemaRegistryModalOpen,
    ] = useState(false);
    const navigate = useNavigate();

    const title = renderTitle(
        schemaRegistryCode,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteSchemaRegistryModalOpen,
        isAuthorizedDeleteSchemaRegistry,
        isAuthorizedEditSchemaRegistry,
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
                        highlighted: true,
                        label: schemaRegistryCode,
                    },
                ]}
                title={title}
            />
            <DeleteSchemaRegistry
                schemaRegistryToDelete={schemaRegistryCode}
                isModalOpen={isDeleteSchemaRegistryModalOpen}
                setIsModalOpen={setIsDeleteSchemaRegistryModalOpen}
                onSuccess={() => {
                    navigate('/schema_registries');
                }}
            />
        </>
    );
}

export default SchemaRegistryDashboardHeaderComponent;
