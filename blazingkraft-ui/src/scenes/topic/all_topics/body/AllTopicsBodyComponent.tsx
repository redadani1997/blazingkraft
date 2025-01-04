import { TopicDescription } from 'common/types/topic';
import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import AllTopicsBodyLink from './link/AllTopicsBodyLink';

interface AllTopicsBodyComponentProps {
    topicsDescriptions: TopicDescription[];
    isGetAllTopicsDescriptionsPending: boolean;
    isAuthorizedConsume: boolean;
    isAuthorizedProduce: boolean;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '60%',
        },
        {
            id: 'partitions',
            label: 'Partitions',
            filterable: true,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
        {
            id: 'replicas',
            label: 'Replicas',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
        {
            id: 'isr',
            label: 'ISR',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
        {
            id: 'osr',
            label: 'OSR',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
    ];
}

function getData(
    topicsDescriptions: TopicDescription[],
    isAuthorizedConsume,
    isAuthorizedProduce,
): CommonTableData[] {
    return topicsDescriptions.map(topicDescription => {
        return {
            name: {
                value: topicDescription.name,
                displayedValue: (
                    <AllTopicsBodyLink
                        topicDescription={topicDescription}
                        isAuthorizedProduce={isAuthorizedProduce}
                        isAuthorizedConsume={isAuthorizedConsume}
                    />
                ),
            },
            partitions: {
                value: topicDescription.partitions.length,
                displayedValue: topicDescription.partitions.length,
            },
            replicas: {
                value: topicDescription.replicas,
                displayedValue: topicDescription.replicas,
            },
            isr: {
                value: topicDescription.isr,
                displayedValue: topicDescription.isr,
            },
            osr: {
                value: topicDescription.replicas - topicDescription.isr,
                displayedValue:
                    topicDescription.replicas - topicDescription.isr,
            },
        };
    });
}

const AllTopicsBodyComponent = ({
    isGetAllTopicsDescriptionsPending,
    topicsDescriptions,
    isAuthorizedConsume,
    isAuthorizedProduce,
}: AllTopicsBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            topicsDescriptions,
            isAuthorizedConsume,
            isAuthorizedProduce,
        );
    }, [topicsDescriptions, isAuthorizedConsume, isAuthorizedProduce]);

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={topicsDescriptions.length}
            perPage={25}
            isLoading={isGetAllTopicsDescriptionsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllTopicsBodyComponent;
