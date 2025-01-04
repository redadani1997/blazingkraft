import { Grid, Input } from '@mantine/core';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import { OffsetFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerOffsetInputProps {
    setOffsetFilter: (offsetFilter: OffsetFilter) => void;
    offsetFilter: OffsetFilter;
    topic: string;
    isTimeFilterEnabled: boolean;
}

function BlazingConsumerOffsetInput({
    offsetFilter,
    setOffsetFilter,
    topic,
    isTimeFilterEnabled,
}: BlazingConsumerOffsetInputProps) {
    const { offsets, disabled } = offsetFilter;
    const offsetPerTopic = offsets.get(topic);
    return (
        <Grid.Col key={topic} span={12} md={12} xl={6}>
            <Input.Wrapper
                label={<CommonCode className="text-xs">{topic}</CommonCode>}
            >
                <CommonNumberInput
                    disabled={disabled || isTimeFilterEnabled}
                    value={offsetPerTopic}
                    onChange={value => {
                        const newOffsets = new Map(offsets);
                        newOffsets.set(topic, value);
                        setOffsetFilter({
                            offsets: newOffsets,
                            disabled: false,
                        });
                    }}
                />
            </Input.Wrapper>
        </Grid.Col>
    );
}

export default BlazingConsumerOffsetInput;
