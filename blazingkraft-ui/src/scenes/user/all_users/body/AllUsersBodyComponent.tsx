import { ActionIcon, Anchor, Text, Tooltip } from '@mantine/core';
import { UserMeta } from 'common/types/user';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllUsersBodyComponentProps {
    users?: UserMeta[];
    isGetAllUsersPending: boolean;
    isAuthorizedDeleteUser: boolean;
    isAuthorizedEditUser: boolean;
    setIsDeleteUserModalOpen: (isModalOpen: boolean) => void;
    setUserToDelete: (userEmail: string) => void;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'email',
            label: 'Email',
            filterable: true,
            sortable: true,
            minWidth: '25rem',
            width: '40%',
        },
        {
            id: 'firstName',
            label: 'First Name',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'lastName',
            label: 'Last Name',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'group',
            label: 'Group',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '20%',
        },
    ];
}

function getData(
    users: UserMeta[],
    isAuthorizedEditUser: boolean,
    isAuthorizedDeleteUser: boolean,
    setIsDeleteUserModalOpen: (isModalOpen: boolean) => void,
    setUserToDelete: (userEmail: string) => void,
): CommonTableData[] {
    return users.map(user => ({
        email: {
            value: user.email,
            displayedValue: (
                <div className="flex justify-between items-center w-full">
                    <Anchor
                        component={Link}
                        to={`/management/users/${user.email}/details`}
                    >
                        {user.email}
                    </Anchor>
                    {(isAuthorizedEditUser || isAuthorizedDeleteUser) && (
                        <div className="pl-2 flex">
                            {isAuthorizedEditUser && (
                                <Tooltip label="Edit">
                                    <ActionIcon
                                        color="blue"
                                        component={Link}
                                        to={`/management/users/${user.email}/edit`}
                                    >
                                        <TbPencil size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {isAuthorizedDeleteUser && (
                                <Tooltip label="Delete">
                                    <ActionIcon
                                        className="ml-1"
                                        color="red"
                                        onClick={() => {
                                            setUserToDelete(user.email);
                                            setIsDeleteUserModalOpen(true);
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
        firstName: {
            value: user.firstName,
            displayedValue: <Text className="break-all">{user.firstName}</Text>,
        },
        lastName: {
            value: user.lastName,
            displayedValue: <Text className="break-all">{user.lastName}</Text>,
        },
        group: {
            value: user.groupName,
            displayedValue: (
                <Anchor
                    component={Link}
                    to={`/management/groups/${user.groupCode}/details`}
                >
                    {user.groupName}
                </Anchor>
            ),
        },
    }));
}

const AllUsersBodyComponent = ({
    users,
    isGetAllUsersPending,
    isAuthorizedDeleteUser,
    isAuthorizedEditUser,
    setIsDeleteUserModalOpen,
    setUserToDelete,
}: AllUsersBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                users,
                isAuthorizedEditUser,
                isAuthorizedDeleteUser,
                setIsDeleteUserModalOpen,
                setUserToDelete,
            ),
        [
            users,
            isAuthorizedEditUser,
            isAuthorizedDeleteUser,
            setIsDeleteUserModalOpen,
            setUserToDelete,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={users.length}
            perPage={5}
            isLoading={isGetAllUsersPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllUsersBodyComponent;
