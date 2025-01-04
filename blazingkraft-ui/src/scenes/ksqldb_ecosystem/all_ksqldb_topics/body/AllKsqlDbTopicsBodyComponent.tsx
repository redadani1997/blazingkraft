import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { KsqlDbTopic } from 'scenes/ksqldb_ecosystem/redux';

interface AllKsqlDbTopicsBodyComponentProps {
    isGetAllKsqlDbTopicsPending: boolean;
    ksqlDbTopics: KsqlDbTopic[];
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '50%',
        },
        {
            id: 'partitions',
            label: 'Partitions',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
        {
            id: 'replicas',
            label: 'Replicas',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '25%',
        },
    ];
}

function getData(ksqlDbTopics: KsqlDbTopic[]): CommonTableData[] {
    return ksqlDbTopics.map(topic => {
        return {
            name: {
                value: topic.name,
                displayedValue: topic.name,
            },
            partitions: {
                value: topic.partitions,
                displayedValue: topic.partitions,
            },
            replicas: {
                value: topic.replicas,
                displayedValue: topic.replicas,
            },
        };
    });
}

const AllKsqlDbTopicsBodyComponent = ({
    ksqlDbTopics,
    isGetAllKsqlDbTopicsPending,
}: AllKsqlDbTopicsBodyComponentProps) => {
    const memoizedData = useMemo(() => getData(ksqlDbTopics), [ksqlDbTopics]);

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={ksqlDbTopics.length}
            perPage={25}
            isLoading={isGetAllKsqlDbTopicsPending}
            paperClassName="h-full w-full"
            // topicClassName="h-full w-full"
        />
    );
};

export default AllKsqlDbTopicsBodyComponent;
