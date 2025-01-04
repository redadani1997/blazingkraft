import { Alert, Checkbox, Grid, Text } from '@mantine/core';
import { TbAlertCircle, TbAlertTriangle } from 'react-icons/tb';
import { OffsetFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';
import BlazingConsumerOffsetInput from './BlazingConsumerOffsetInput';

interface BlazingConsumerOffsetsFilterProps {
    setOffsetFilter: (offsetFilter: OffsetFilter) => void;
    offsetFilter: OffsetFilter;
    topics: string[];
    isTimeFilterEnabled: boolean;
}

function BlazingConsumerOffsetsFilter({
    offsetFilter,
    setOffsetFilter,
    topics,
    isTimeFilterEnabled,
}: BlazingConsumerOffsetsFilterProps) {
    const { disabled } = offsetFilter;

    if (!topics || topics.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Warning"
                color="lime"
                className="mb-4"
            >
                <Text>Please select at least one topic.</Text>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col">
            <Checkbox
                className="my-2"
                checked={disabled}
                disabled={isTimeFilterEnabled}
                onChange={() =>
                    setOffsetFilter({
                        ...offsetFilter,
                        disabled: !disabled,
                    })
                }
                label="Disabled"
            />
            <Grid>
                {topics.map(topic => {
                    return (
                        <BlazingConsumerOffsetInput
                            key={topic}
                            topic={topic}
                            offsetFilter={offsetFilter}
                            setOffsetFilter={setOffsetFilter}
                            isTimeFilterEnabled={isTimeFilterEnabled}
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
                <Text>
                    * The Offsets filter can be enabled only if the Time filter
                    is disabled.
                </Text>
                <Text className="pt-1">
                    * Choose an offset to start from for each topic.
                </Text>
                <Text className="pt-1">
                    * The same offset is utilized for all the partitions per
                    topic.
                </Text>
                <Text className="pt-1">
                    * If the beginning offset of a partition is greater than the
                    provided offset, the beginning offset is the one utilized
                    for that partition.
                </Text>
            </Alert>
        </div>
    );
}

export default BlazingConsumerOffsetsFilter;
