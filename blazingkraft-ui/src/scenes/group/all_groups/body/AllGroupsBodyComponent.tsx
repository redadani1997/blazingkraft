import { ActionIcon, Anchor, Text, Tooltip } from '@mantine/core';
import { GroupMeta } from 'common/types/group';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { IGroupToDelete } from 'scenes/group/delete_group/DeleteGroup';

interface AllGroupsBodyComponentProps {
    groups?: GroupMeta[];
    isGetAllGroupsPending: boolean;
    setIsDeleteGroupModalOpen: (isDeleteGroupModalOpen: boolean) => void;
    setGroupToDelete: (groupToDelete: IGroupToDelete) => void;
    isAuthorizedDeleteGroup: boolean;
    isAuthorizedEditGroup: boolean;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '35%',
        },
        {
            id: 'description',
            label: 'Description',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '25%',
        },
        {
            id: 'numberOfPermissions',
            label: 'Permissions',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '20%',
        },
        {
            id: 'numberOfUsers',
            label: 'Users',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
    ];
}

function getData(
    groups: GroupMeta[],
    setIsDeleteGroupModalOpen: (isDeleteGroupModalOpen: boolean) => void,
    setGroupToDelete: (groupToDelete: IGroupToDelete) => void,
    isAuthorizedDeleteGroup,
    isAuthorizedEditGroup,
): CommonTableData[] {
    return groups.map(group => ({
        name: {
            value: group.name,
            displayedValue: (
                <div className="flex justify-between items-center w-full">
                    <Anchor
                        component={Link}
                        to={`/management/groups/${group.code}/details`}
                    >
                        {group.name}
                    </Anchor>
                    {(isAuthorizedEditGroup || isAuthorizedDeleteGroup) && (
                        <div className="pl-2 flex">
                            {isAuthorizedEditGroup && (
                                <Tooltip label="Edit">
                                    <ActionIcon
                                        color="blue"
                                        component={Link}
                                        to={`/management/groups/${group.code}/edit`}
                                    >
                                        <TbPencil size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {isAuthorizedDeleteGroup && (
                                <Tooltip label="Delete">
                                    <ActionIcon
                                        className="ml-1"
                                        color="red"
                                        onClick={() => {
                                            setGroupToDelete({
                                                code: group.code,
                                                name: group.name,
                                                description: group.description,
                                                numberOfUsers:
                                                    group.numberOfUsers,
                                            });
                                            setIsDeleteGroupModalOpen(true);
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
        description: {
            value: group.description,
            displayedValue: (
                <Text className="break-all">{group.description}</Text>
            ),
        },
        numberOfUsers: {
            value: group.numberOfUsers,
            displayedValue: group.numberOfUsers,
        },
        numberOfPermissions: {
            value: group.numberOfPermissions,
            displayedValue: group.numberOfPermissions,
        },
    }));
}

const AllGroupsBodyComponent = ({
    groups,
    isGetAllGroupsPending,
    setIsDeleteGroupModalOpen,
    setGroupToDelete,
    isAuthorizedDeleteGroup,
    isAuthorizedEditGroup,
}: AllGroupsBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                groups,
                setIsDeleteGroupModalOpen,
                setGroupToDelete,
                isAuthorizedDeleteGroup,
                isAuthorizedEditGroup,
            ),
        [
            groups,
            setGroupToDelete,
            setIsDeleteGroupModalOpen,
            isAuthorizedDeleteGroup,
            isAuthorizedEditGroup,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={groups.length}
            perPage={5}
            isLoading={isGetAllGroupsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllGroupsBodyComponent;
