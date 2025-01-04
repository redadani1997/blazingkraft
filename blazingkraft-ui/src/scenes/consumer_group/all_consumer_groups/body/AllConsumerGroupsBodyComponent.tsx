import { Anchor } from '@mantine/core';
import { ConsumerGroupListing } from 'common/types/consumer_group';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllConsumerGroupsBodyComponentProps {
    consumerGroupsListings: ConsumerGroupListing[];
    isListAllConsumerGroupsPending: boolean;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'groupId',
            label: 'Group ID',
            filterable: true,
            sortable: true,
            minWidth: '18rem',
            width: '60%',
        },
        {
            id: 'state',
            label: 'State',
            filterable: true,
            sortable: true,
            minWidth: '12rem',
            width: '25%',
        },
        {
            id: 'isSimple',
            label: 'Is Simple',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
    ];
}

function getData(
    consumerGroupsListings: ConsumerGroupListing[],
    clusterCode: string,
): CommonTableData[] {
    return consumerGroupsListings.map(consumerGroupListing => {
        return {
            groupId: {
                value: consumerGroupListing.groupId,
                displayedValue: (
                    <Anchor
                        component={Link}
                        to={`/clusters/${clusterCode}/consumer_groups/${consumerGroupListing.groupId}`}
                    >
                        {consumerGroupListing.groupId}
                    </Anchor>
                ),
            },
            state: {
                value: consumerGroupListing.state,
                displayedValue: consumerGroupListing.state,
            },
            isSimple: {
                value: consumerGroupListing.isSimpleConsumerGroup
                    ? 'Yes'
                    : 'No',
                displayedValue: consumerGroupListing.isSimpleConsumerGroup
                    ? 'Yes'
                    : 'No',
            },
        };
    });
}

const AllConsumerGroupsBodyComponent = ({
    consumerGroupsListings,
    isListAllConsumerGroupsPending,
}: AllConsumerGroupsBodyComponentProps) => {
    const { clusterCode } = useParams();
    const memoizedData = useMemo(
        () => getData(consumerGroupsListings, clusterCode),
        [consumerGroupsListings, clusterCode],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={consumerGroupsListings.length}
            perPage={25}
            isLoading={isListAllConsumerGroupsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllConsumerGroupsBodyComponent;
