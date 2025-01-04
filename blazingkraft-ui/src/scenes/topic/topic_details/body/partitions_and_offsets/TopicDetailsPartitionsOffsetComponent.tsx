import { Text } from '@mantine/core';
import { OffsetInfo } from 'common/types/offset';
import { ITopicDetails } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo } from 'react';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface TopicDetailsPartitionsOffsetComponentProps {
    topicDetails: ITopicDetails;
    isGetTopicDetailsPending: boolean;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'partition',
            label: 'Partition',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '15%',
        },
        {
            id: 'replicas',
            label: 'Replicas',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '15%',
        },
        {
            id: 'osr',
            label: 'OSR',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'earliestOffset',
            label: 'Earliest Offset',
            filterable: false,
            sortable: true,
            minWidth: '7rem',
            width: '15%',
        },
        {
            id: 'latestOffset',
            label: 'Latest Offset',
            filterable: false,
            sortable: true,
            minWidth: '9rem',
            width: '15%',
        },
        {
            id: 'offsetLag',
            label: 'Lag',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'records',
            label: 'Records',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'size',
            label: 'Size',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
    ];
}

function getOffset(offsetInfo: OffsetInfo[], topic: string, partition: number) {
    const offset = offsetInfo.find(
        offset => offset.topic === topic && offset.partition === partition,
    );
    return offset?.offset || 0;
}

function getData(topicDetails: ITopicDetails): CommonTableData[] {
    const { topicDescription } = topicDetails;
    if (!topicDescription) {
        return [];
    }
    return topicDescription.partitions.map(topicPartition => {
        const partitionDetails = topicDetails.partitionsDetails.find(
            pd => pd.partition === topicPartition.partition,
        );
        const earliestOffset = getOffset(
            topicDetails.earliestOffsetInfos,
            topicDescription.name,
            topicPartition.partition,
        );
        const latestOffset = getOffset(
            topicDetails.latestOffsetInfos,
            topicDescription.name,
            topicPartition.partition,
        );
        const records = latestOffset - earliestOffset;
        return {
            partition: {
                value: topicPartition.partition,
                displayedValue: topicPartition.partition,
            },
            replicas: {
                value: topicPartition.replicas?.length || 0,
                displayedValue: topicPartition.replicas?.length || 0,
            },
            osr: {
                value:
                    (topicPartition.replicas?.length || 0) -
                    (topicPartition.isr?.length || 0),
                displayedValue: (
                    <Text color="red">
                        {(topicPartition.replicas?.length || 0) -
                            (topicPartition.isr?.length || 0)}
                    </Text>
                ),
            },
            earliestOffset: {
                value: earliestOffset,
                displayedValue: CommonUtils.beautifyNumber(earliestOffset),
            },
            latestOffset: {
                value: latestOffset,
                displayedValue: CommonUtils.beautifyNumber(latestOffset),
            },
            size: {
                value: partitionDetails?.size || 0,
                displayedValue: CommonUtils.beautifyBytes(
                    partitionDetails?.size || 0,
                ),
            },
            records: {
                value: records,
                displayedValue: CommonUtils.beautifyNumber(records),
            },
            offsetLag: {
                value: partitionDetails?.offsetLag || 0,
                displayedValue: (
                    <Text color="red">
                        {CommonUtils.beautifyNumber(
                            partitionDetails?.offsetLag || 0,
                        )}
                    </Text>
                ),
            },
        };
    });
}

const TopicDetailsPartitionsOffsetComponent = ({
    topicDetails,
}: TopicDetailsPartitionsOffsetComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(topicDetails);
    }, [topicDetails]);

    const length = topicDetails.topicDescription?.partitions.length || 0;

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter={false}
            totalElements={length}
            perPage={25}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default TopicDetailsPartitionsOffsetComponent;
