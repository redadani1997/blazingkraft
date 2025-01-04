import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { AclBinding } from 'common/types/acl_binding';
import { useMemo } from 'react';
import { TbTrash } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllAclsBodyComponentProps {
    aclBindings: AclBinding[];
    isGetAclBindingsPending: boolean;
    setAclBindingToDelete: (aclBinding: AclBinding) => void;
    setIsDeleteAclBindingModalOpen: (isOpen: boolean) => void;
    isAuthorizedDeleteAcl: boolean;
}

function getColumns(): CommonTableColumn[] {
    const columns: CommonTableColumn[] = [
        {
            id: 'principal',
            label: 'Principal',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '20%',
        },
        {
            id: 'resourceName',
            label: 'Resource Name',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'resourceType',
            label: 'Resource Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'operation',
            label: 'Operation',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'permissionType',
            label: 'Permission Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'patternType',
            label: 'Pattern Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'host',
            label: 'Host',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
    ];
    return columns;
}

function getData(
    aclBindings: AclBinding[],
    setAclBindingToDelete: (aclBinding: AclBinding) => void,
    setIsDeleteAclBindingModalOpen: (isOpen: boolean) => void,
    isAuthorizedDeleteAcl,
): CommonTableData[] {
    return aclBindings.map(aclBinding => {
        const data: CommonTableData = {
            principal: {
                value: aclBinding.principal,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <Text>{aclBinding.principal}</Text>
                        {isAuthorizedDeleteAcl && (
                            <Tooltip label="Delete">
                                <ActionIcon
                                    className="ml-1"
                                    color="red"
                                    onClick={() => {
                                        setAclBindingToDelete(aclBinding);
                                        setIsDeleteAclBindingModalOpen(true);
                                    }}
                                >
                                    <TbTrash size="1.3rem" />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </div>
                ),
            },
            resourceName: {
                value: aclBinding.resourceName,
                displayedValue: aclBinding.resourceName,
            },
            resourceType: {
                value: aclBinding.resourceType,
                displayedValue: aclBinding.resourceType,
            },
            operation: {
                value: aclBinding.operation,
                displayedValue: aclBinding.operation,
            },
            permissionType: {
                value: aclBinding.permissionType,
                displayedValue: aclBinding.permissionType,
            },
            patternType: {
                value: aclBinding.patternType,
                displayedValue: aclBinding.patternType,
            },
            host: {
                value: aclBinding.host,
                displayedValue: aclBinding.host,
            },
        };
        return data;
    });
}

const AllAclsBodyComponent = ({
    aclBindings,
    isGetAclBindingsPending,
    setAclBindingToDelete,
    setIsDeleteAclBindingModalOpen,
    isAuthorizedDeleteAcl,
}: AllAclsBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                aclBindings,
                setAclBindingToDelete,
                setIsDeleteAclBindingModalOpen,
                isAuthorizedDeleteAcl,
            ),
        [
            aclBindings,
            setAclBindingToDelete,
            setIsDeleteAclBindingModalOpen,
            isAuthorizedDeleteAcl,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={aclBindings.length}
            perPage={25}
            isLoading={isGetAclBindingsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllAclsBodyComponent;
