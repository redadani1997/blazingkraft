import { Alert, Input, Text, TextInput } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';
import { GroupIdFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerGroupFilterProps {
    groupIdFilter: GroupIdFilter;
    setGroupIdFilter: (groupIdFilter: GroupIdFilter) => void;
}

function BlazingConsumerGroupFilter({
    groupIdFilter,
    setGroupIdFilter,
}: BlazingConsumerGroupFilterProps) {
    const { groupId } = groupIdFilter;
    return (
        <div className="flex flex-col">
            <Input.Wrapper label="Group Id">
                <TextInput
                    value={groupId}
                    placeholder="Your Group Id"
                    onChange={e => {
                        setGroupIdFilter({
                            groupId: e.currentTarget.value,
                        });
                    }}
                />
            </Input.Wrapper>
            <Alert
                className="mt-2"
                icon={<TbAlertCircle size={20} />}
                title="Info"
                color="blue"
            >
                <Text>
                    * If you do specify a group id, the consumer will force a
                    rebalance before joining the group, so that if there's
                    already as much members as partitions you may have the
                    chance to take another member's partition(s).
                </Text>
                <Text className="pt-1">
                    * Make sure you disable the Time filter if you want your
                    consumer group to seek to the commited offsets.
                </Text>
            </Alert>
        </div>
    );
}

export default BlazingConsumerGroupFilter;
