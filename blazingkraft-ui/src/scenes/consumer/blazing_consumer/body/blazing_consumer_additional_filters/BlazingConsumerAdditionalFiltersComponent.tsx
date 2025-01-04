import { ConsumerDeserializer } from 'common/types/consumer';
import { TopicDescription } from 'common/types/topic';
import { useEffect, useState } from 'react';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import {
    GroupIdFilter,
    JavascriptFilter,
    OffsetFilter,
    PartitionFilter,
    TextSearchFilter,
    TimeFilter,
} from '../blazing_consumer_filter/BlazingConsumerFilterComponent';
import BlazingConsumerAdditionalFiltersButton from './button/BlazingConsumerAdditionalFiltersButton';
import BlazingConsumerGroupFilter from './group/BlazingConsumerGroupFilter';
import BlazingConsumerJavascriptFilter from './javascript/BlazingConsumerJavascriptFilter';
import BlazingConsumerOffsetsFilter from './offset/BlazingConsumerOffsetsFilter';
import BlazingConsumerPartitionsFilter from './partition/BlazingConsumerPartitionsFilter';
import BlazingConsumerTextSearchFilter from './textsearch/BlazingConsumerTextSearchFilter';
import BlazingConsumerTimeFilter from './time/BlazingConsumerTimeFilter';

interface BlazingConsumerAdditionalFiltersComponentProps {
    topics: string[];
    topicsDescriptions: TopicDescription[];
    timeFilter: TimeFilter;
    setTimeFilter: (timeFilter: TimeFilter) => void;
    partitionFilter: PartitionFilter;
    setPartitionFilter: (partitionFilter: PartitionFilter) => void;
    offsetFilter: OffsetFilter;
    setOffsetFilter: (offsetFilter: OffsetFilter) => void;
    groupIdFilter: GroupIdFilter;
    setGroupIdFilter: (groupIdFilter: GroupIdFilter) => void;
    javascriptFilter: JavascriptFilter;
    setJavascriptFilter: (javascriptFilter: JavascriptFilter) => void;
    textSearchFilter: TextSearchFilter;
    setTextSearchFilter: (textSearchFilter: TextSearchFilter) => void;
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    timezone: string;
    setTimezone: (timezone: string) => void;
    timeFormat: string;
    setPartitionFilterInitialized: (initialized: boolean) => void;
    isGetAllTopicsDescriptionsPending: boolean;
}

const ALL_PARTITIONS_OPTION = {
    label: 'All',
    value: '-1',
};

function modalBody(
    topics: string[],
    topicsDescriptions: TopicDescription[],
    globaTabValue,
    setGlobalTabValue,
    javascripTabValue,
    setJavascriptTabValue,
    timeFilter: TimeFilter,
    setTimeFilter,
    partitionFilter,
    setPartitionFilter,
    offsetFilter,
    setOffsetFilter,
    groupIdFilter,
    setGroupIdFilter,
    javascriptFilter,
    setJavascriptFilter,
    textSearchFilter,
    setTextSearchFilter,
    timezone: string,
    setTimezone: (timezone: string) => void,
) {
    const items: CommonTabsItemProps[] = [
        {
            label: 'Time',
            value: 'time',
            children: (
                <BlazingConsumerTimeFilter
                    timeFilter={timeFilter}
                    setTimeFilter={setTimeFilter}
                    timezone={timezone}
                    setTimezone={setTimezone}
                />
            ),
        },
        {
            label: 'Text Search',
            value: 'textSearch',
            children: (
                <BlazingConsumerTextSearchFilter
                    textSearchFilter={textSearchFilter}
                    setTextSearchFilter={setTextSearchFilter}
                />
            ),
        },
        {
            label: 'Partitions',
            value: 'partitions',
            children: (
                <BlazingConsumerPartitionsFilter
                    partitionFilter={partitionFilter}
                    setPartitionFilter={setPartitionFilter}
                    topicsDescriptions={topicsDescriptions}
                    topics={topics}
                />
            ),
        },
        {
            label: 'Offsets',
            value: 'offsets',
            children: (
                <BlazingConsumerOffsetsFilter
                    offsetFilter={offsetFilter}
                    setOffsetFilter={setOffsetFilter}
                    isTimeFilterEnabled={!timeFilter.disabled}
                    topics={topics}
                />
            ),
        },
        {
            label: 'Group Id',
            value: 'group',
            children: (
                <BlazingConsumerGroupFilter
                    groupIdFilter={groupIdFilter}
                    setGroupIdFilter={setGroupIdFilter}
                />
            ),
        },
        {
            label: 'Javascript',
            value: 'javascript',
            children: (
                <BlazingConsumerJavascriptFilter
                    javascriptFilter={javascriptFilter}
                    setJavascriptFilter={setJavascriptFilter}
                    javascriptTabValue={javascripTabValue}
                    setJavascriptTabValue={setJavascriptTabValue}
                />
            ),
        },
    ];

    return (
        <CommonTabs
            container={{
                defaultValue: globaTabValue,
                onTabChange: setGlobalTabValue,
                value: globaTabValue,
                variant: 'default',
            }}
            items={items}
        />
    );
}

function BlazingConsumerAdditionalFiltersComponent({
    topics,
    topicsDescriptions,
    timeFilter,
    setTimeFilter,
    partitionFilter,
    setPartitionFilter,
    offsetFilter,
    setOffsetFilter,
    groupIdFilter,
    setGroupIdFilter,
    javascriptFilter,
    setJavascriptFilter,
    textSearchFilter,
    setTextSearchFilter,
    timezone,
    setTimezone,
    timeFormat,
    setPartitionFilterInitialized,
    isGetAllTopicsDescriptionsPending,
}: BlazingConsumerAdditionalFiltersComponentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [globaTabValue, setGlobalTabValue] = useState('time');
    const [javascriptTabValue, setJavascriptTabValue] = useState('docs');

    const [
        alreadyStartedFetchingTopicsDescriptions,
        setAlreadyStartedFetchingTopicsDescriptions,
    ] = useState(false);

    useEffect(() => {
        if (alreadyStartedFetchingTopicsDescriptions) {
            return;
        }
        if (
            isGetAllTopicsDescriptionsPending ||
            topicsDescriptions.length > 0
        ) {
            setAlreadyStartedFetchingTopicsDescriptions(true);
        }
    }, [
        alreadyStartedFetchingTopicsDescriptions,
        isGetAllTopicsDescriptionsPending,
    ]);

    // Set Partitions state
    useEffect(() => {
        if (
            alreadyStartedFetchingTopicsDescriptions &&
            !isGetAllTopicsDescriptionsPending
        ) {
            setPartitionFilterInitialized(true);
        }
        const newPartitions = new Map();
        topics.forEach(topic => {
            const topicExists = topicsDescriptions.some(
                topicDescription => topicDescription.name === topic,
            );
            if (topicExists) {
                newPartitions.set(topic, [ALL_PARTITIONS_OPTION.value]);
            } else {
                newPartitions.set(topic, ['0']);
            }
        });

        setPartitionFilter({ partitions: newPartitions });
    }, [
        topics,
        topicsDescriptions,
        isGetAllTopicsDescriptionsPending,
        alreadyStartedFetchingTopicsDescriptions,
    ]);

    // Set Offsets state
    useEffect(() => {
        const newOffsets = new Map();
        topics.forEach(topic => {
            newOffsets.set(topic, 0);
        });

        setOffsetFilter({ ...offsetFilter, offsets: newOffsets });
    }, [topics]);

    return (
        <>
            <BlazingConsumerAdditionalFiltersButton
                setIsModalOpen={setIsModalOpen}
                timeFilter={timeFilter}
                partitionFilter={partitionFilter}
                offsetFilter={offsetFilter}
                groupIdFilter={groupIdFilter}
                javascriptFilter={javascriptFilter}
                textSearchFilter={textSearchFilter}
                timezone={timezone}
                timeFormat={timeFormat}
            />
            <CommonModal
                modalTitle="Additional Filters"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalBody={modalBody(
                    topics,
                    topicsDescriptions,
                    globaTabValue,
                    setGlobalTabValue,
                    javascriptTabValue,
                    setJavascriptTabValue,
                    timeFilter,
                    setTimeFilter,
                    partitionFilter,
                    setPartitionFilter,
                    offsetFilter,
                    setOffsetFilter,
                    groupIdFilter,
                    setGroupIdFilter,
                    javascriptFilter,
                    setJavascriptFilter,
                    textSearchFilter,
                    setTextSearchFilter,
                    timezone,
                    setTimezone,
                )}
            />
        </>
    );
}

export default BlazingConsumerAdditionalFiltersComponent;
