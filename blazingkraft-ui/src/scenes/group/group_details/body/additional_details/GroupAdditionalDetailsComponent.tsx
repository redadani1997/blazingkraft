import { Anchor, Text } from '@mantine/core';
import { GroupDetails, GroupUserMeta } from 'common/types/group';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface GroupAdditionalDetailsComponentProps {
    groupDetails: GroupDetails;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'email',
            label: 'Email',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '34%',
        },
        {
            id: 'createdBy',
            label: 'Created By',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '33%',
        },
        {
            id: 'updatedBy',
            label: 'Updated By',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '33%',
        },
    ];
}

function getData(usersMeta: GroupUserMeta[]): CommonTableData[] {
    return usersMeta.map(user => ({
        email: {
            value: user.email,
            displayedValue: (
                <Anchor
                    className="break-all"
                    component={Link}
                    to={`/management/users/${user.email}/details`}
                >
                    {user.email}
                </Anchor>
            ),
        },
        createdBy: {
            value: user.createdBy,
            displayedValue: <Text className="break-all">{user.createdBy}</Text>,
        },
        updatedBy: {
            value: user.updatedBy,
            displayedValue: <Text className="break-all">{user.updatedBy}</Text>,
        },
    }));
}

const GroupAdditionalDetailsComponent = ({
    groupDetails,
}: GroupAdditionalDetailsComponentProps) => {
    const { usersMeta } = groupDetails;
    const memoizedData = useMemo(() => getData(usersMeta), [usersMeta]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={usersMeta.length}
            perPage={5}
            isLoading={false}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default GroupAdditionalDetailsComponent;
