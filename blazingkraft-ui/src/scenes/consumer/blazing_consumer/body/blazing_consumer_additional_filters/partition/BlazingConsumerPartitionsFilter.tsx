import { Alert, Grid, Text } from '@mantine/core';
import { TopicDescription } from 'common/types/topic';
import { TbAlertCircle, TbAlertTriangle } from 'react-icons/tb';
import { PartitionFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';
import BlazingConsumerPartitionCombobox from './BlazingConsumerPartitionCombobox';

interface BlazingConsumerPartitionsFilterProps {
    setPartitionFilter: (partitionFilter: PartitionFilter) => void;
    partitionFilter: PartitionFilter;
    topicsDescriptions: TopicDescription[];
    topics: string[];
}

const ALL_PARTITIONS_OPTION = {
    label: 'All',
    value: '-1',
};

function getPartitionOptionsByTopic(
    topic: string,
    topicsDescriptions: TopicDescription[],
) {
    const topicDescription = topicsDescriptions.find(
        topicDescription => topicDescription.name === topic,
    );
    if (topicDescription) {
        const partitions = topicDescription.partitions.map(partition => ({
            label: String(partition.partition),
            value: String(partition.partition),
        }));
        return [ALL_PARTITIONS_OPTION, ...partitions];
    }
    return [{ label: '0', value: '0' }];
}

function BlazingConsumerPartitionsFilter({
    partitionFilter,
    setPartitionFilter,
    topicsDescriptions,
    topics,
}: BlazingConsumerPartitionsFilterProps) {
    const { partitions } = partitionFilter;

    if (!topics || topics.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Warning"
                color="lime"
                className="mb-4"
            >
                <Text>* Please select at least one topic.</Text>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col">
            <Grid>
                {topics.map(topic => {
                    const partitionsOptions = getPartitionOptionsByTopic(
                        topic,
                        topicsDescriptions,
                    );

                    return (
                        <BlazingConsumerPartitionCombobox
                            key={topic}
                            topic={topic}
                            partitions={partitions}
                            options={partitionsOptions}
                            topicExists={topicsDescriptions.some(
                                topicDescription =>
                                    topicDescription.name === topic,
                            )}
                            setPartitionFilter={setPartitionFilter}
                        />
                    );
                })}
            </Grid>
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Info"
                color="blue"
                className="mt-4"
            >
                <Text>* Select one or multiple partitions per topic.</Text>
            </Alert>
        </div>
    );
}

export default BlazingConsumerPartitionsFilter;
