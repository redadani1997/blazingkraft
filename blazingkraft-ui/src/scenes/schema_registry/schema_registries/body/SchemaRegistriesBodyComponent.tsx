import { ActionIcon, Tooltip } from '@mantine/core';
import { SchemaRegistry } from 'common/types/schema_registry';
import {
    SCHEMA_COMPATIBILITY_OPTIONS,
    SCHEMA_REGISTRY_MODE_OPTIONS,
} from 'common/utils/SchemaRegistryUtils';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { SchemaRegistryDescription } from 'scenes/schema_registry/redux';
import SchemaRegistriesBodyLink from './link/SchemaRegistriesBodyLink';

interface SchemaRegistriesBodyComponentProps {
    isGetSchemaRegistriesDescriptionsPending: Map<string, boolean>;
    isGetSchemaRegistriesPending: boolean;
    schemaRegistries: SchemaRegistry[];
    schemaRegistriesDescriptions: Map<string, SchemaRegistryDescription>;
    isAuthorizedEditSchemaRegistry: boolean;
    isAuthorizedDeleteSchemaRegistry: boolean;
    setSchemaRegistryToDelete: (schemaRegistryToDelete: string | null) => void;
    setIsDeleteSchemaRegistryModalOpen: (
        isDeleteSchemaRegistryModalOpen: boolean,
    ) => void;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '30%',
        },
        {
            id: 'urls',
            label: 'Urls',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '20%',
        },
        {
            id: 'subjects',
            label: 'Subjects',
            filterable: false,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
        },
        {
            id: 'compatibility',
            label: 'Compatibility',
            filterable: true,
            sortable: true,
            customOptions: SCHEMA_COMPATIBILITY_OPTIONS,
            minWidth: '12rem',
            width: '20%',
        },
        {
            id: 'mode',
            label: 'Mode',
            filterable: true,
            sortable: true,
            customOptions: SCHEMA_REGISTRY_MODE_OPTIONS,
            minWidth: '12rem',
            width: '20%',
        },
    ];
}

function getData(
    schemaRegistries: SchemaRegistry[],
    schemaRegistriesDescriptions: Map<string, SchemaRegistryDescription>,
    isGetSchemaRegistriesDescriptionsPending: Map<string, boolean>,
    setSchemaRegistryToDelete: (schemaRegistryToDelete: string | null) => void,
    setIsDeleteSchemaRegistryModalOpen: (
        isDeleteSchemaRegistryModalOpen: boolean,
    ) => void,
    isAuthorizedEditSchemaRegistry: boolean,
    isAuthorizedDeleteSchemaRegistry: boolean,
): CommonTableData[] {
    return schemaRegistries.map(schemaRegistry => {
        const schemaRegistryDescription = schemaRegistriesDescriptions.get(
            schemaRegistry.code,
        );
        const isDescriptionPending =
            isGetSchemaRegistriesDescriptionsPending.get(schemaRegistry.code);

        return {
            name: {
                value: schemaRegistry.name,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <SchemaRegistriesBodyLink
                            code={schemaRegistry.code}
                            name={schemaRegistry.name}
                        />
                        {(isAuthorizedEditSchemaRegistry ||
                            isAuthorizedDeleteSchemaRegistry) && (
                            <div className="pl-2 flex">
                                {isAuthorizedEditSchemaRegistry && (
                                    <Tooltip label="Edit">
                                        <ActionIcon
                                            color="blue"
                                            component={Link}
                                            to={`/schema_registries/${schemaRegistry.code}/edit`}
                                        >
                                            <TbPencil size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {isAuthorizedDeleteSchemaRegistry && (
                                    <Tooltip label="Delete">
                                        <ActionIcon
                                            className="ml-1"
                                            color="red"
                                            onClick={() => {
                                                setSchemaRegistryToDelete(
                                                    schemaRegistry.code,
                                                );
                                                setIsDeleteSchemaRegistryModalOpen(
                                                    true,
                                                );
                                            }}
                                        >
                                            <TbTrash size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </div>
                        )}
                    </div>
                ),
            },
            urls: {
                value: schemaRegistry.schemaRegistryUrls,
                displayedValue: schemaRegistry.schemaRegistryUrls,
            },
            subjects: {
                value: schemaRegistryDescription?.subjects,
                displayedValue: schemaRegistryDescription?.subjects,
                isLoading: isDescriptionPending,
                isError: !schemaRegistryDescription?.succeeded,
                errorMessage: schemaRegistryDescription?.errorMessage,
            },
            compatibility: {
                value: schemaRegistryDescription?.compatibility,
                displayedValue: schemaRegistryDescription?.compatibility,
                isLoading: isDescriptionPending,
                isError: !schemaRegistryDescription?.succeeded,
                errorMessage: schemaRegistryDescription?.errorMessage,
            },
            mode: {
                value: schemaRegistryDescription?.mode,
                displayedValue: schemaRegistryDescription?.mode,
                isLoading: isDescriptionPending,
                isError: !schemaRegistryDescription?.succeeded,
                errorMessage: schemaRegistryDescription?.errorMessage,
            },
        };
    });
}

const SchemaRegistriesBodyComponent = ({
    isGetSchemaRegistriesDescriptionsPending,
    isGetSchemaRegistriesPending,
    schemaRegistries,
    schemaRegistriesDescriptions,
    isAuthorizedEditSchemaRegistry,
    isAuthorizedDeleteSchemaRegistry,
    setSchemaRegistryToDelete,
    setIsDeleteSchemaRegistryModalOpen,
}: SchemaRegistriesBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            schemaRegistries,
            schemaRegistriesDescriptions,
            isGetSchemaRegistriesDescriptionsPending,
            setSchemaRegistryToDelete,
            setIsDeleteSchemaRegistryModalOpen,
            isAuthorizedEditSchemaRegistry,
            isAuthorizedDeleteSchemaRegistry,
        );
    }, [
        schemaRegistries,
        schemaRegistriesDescriptions,
        isGetSchemaRegistriesDescriptionsPending,
        setSchemaRegistryToDelete,
        setIsDeleteSchemaRegistryModalOpen,
        isAuthorizedEditSchemaRegistry,
        isAuthorizedDeleteSchemaRegistry,
    ]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={schemaRegistries.length}
            perPage={25}
            isLoading={isGetSchemaRegistriesPending}
            paperClassName="h-5/6 w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default SchemaRegistriesBodyComponent;
