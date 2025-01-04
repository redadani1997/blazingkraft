import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import { useMemo } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import {
    GroupIdFilter,
    JavascriptFilter,
    OffsetFilter,
    PartitionFilter,
    TextSearchFilter,
    TimeFilter,
} from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerAdditionalFiltersButtonProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    timeFilter: TimeFilter;
    partitionFilter: PartitionFilter;
    offsetFilter: OffsetFilter;
    groupIdFilter: GroupIdFilter;
    javascriptFilter: JavascriptFilter;
    textSearchFilter: TextSearchFilter;
    timezone: string;
    timeFormat: string;
}

function formatDateAndTime(
    date: Date,
    time: string,
    timezone: string,
    timeFormat: string,
) {
    return CommonTimeUtils.timestampToFormattedDate(
        CommonTimeUtils.datesToTimestamp(date, time, timezone),
        timezone,
        timeFormat,
    );
}

function BlazingConsumerAdditionalFiltersButton({
    setIsModalOpen,
    groupIdFilter,
    javascriptFilter,
    offsetFilter,
    timeFilter,
    textSearchFilter,
    timezone,
    timeFormat,
}: BlazingConsumerAdditionalFiltersButtonProps) {
    const timeLabel = useMemo(() => {
        if (timeFilter.earliest) {
            return 'Earliest';
        }
        if (timeFilter.latest) {
            return 'Latest';
        }
        if (timeFilter.disabled) {
            return 'Disabled';
        }
        if (timeFilter.allowStart || timeFilter.allowEnd) {
            const start = timeFilter.allowStart
                ? formatDateAndTime(
                      timeFilter.startDate,
                      timeFilter.startTime,
                      timezone,
                      timeFormat,
                  )
                : undefined;
            const end = timeFilter.allowEnd
                ? formatDateAndTime(
                      timeFilter.endDate,
                      timeFilter.endTime,
                      timezone,
                      timeFormat,
                  )
                : undefined;
            return (
                <span className="flex flex-col pl-2">
                    {start && (
                        <span className="flex">
                            <span className="break-words italic font-semibold pr-1">
                                Start:
                            </span>
                            <span className="break-all">{start}</span>
                        </span>
                    )}
                    {end && (
                        <span className="flex">
                            <span className="break italic font-semibold pr-1">
                                End:
                            </span>
                            <span className="break-all">{end}</span>
                        </span>
                    )}
                </span>
            );
        }
        if (timeFilter.liveConsumption) {
            return 'Live';
        }
    }, [timeFilter, timezone, timeFormat]);

    const offsetLabel = useMemo(() => {
        return offsetFilter.disabled ? 'Disabled' : 'Enabled';
    }, [offsetFilter]);

    const partitionLabel = useMemo(() => {
        return 'Enabled';
    }, []);

    const groupIdLabel = useMemo(() => {
        return !groupIdFilter.groupId ? 'Disabled' : groupIdFilter.groupId;
    }, [groupIdFilter]);

    const javascriptLabel = useMemo(() => {
        return javascriptFilter.disabled ? 'Disabled' : 'Enabled';
    }, [javascriptFilter]);

    const textSearchLabel = useMemo(() => {
        if (
            textSearchFilter.headersType === 'DISABLED' &&
            textSearchFilter.keyType === 'DISABLED' &&
            textSearchFilter.valueType === 'DISABLED' &&
            textSearchFilter.metadataType === 'DISABLED'
        ) {
            return 'Disabled';
        }
        return (
            <span className="flex flex-col pl-2">
                {textSearchFilter.keyType !== 'DISABLED' && (
                    <span className="flex">
                        <span className="break-words italic font-semibold pr-1">
                            Key:
                        </span>
                        <span className="break-all">
                            {
                                ConsumerUtils
                                    .TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE[
                                    textSearchFilter.keyType
                                ]
                            }
                        </span>
                    </span>
                )}
                {textSearchFilter.valueType !== 'DISABLED' && (
                    <span className="flex">
                        <span className="break-words italic font-semibold pr-1">
                            Value:
                        </span>
                        <span className="break-all">
                            {
                                ConsumerUtils
                                    .TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE[
                                    textSearchFilter.valueType
                                ]
                            }
                        </span>
                    </span>
                )}
                {textSearchFilter.headersType !== 'DISABLED' && (
                    <span className="flex">
                        <span className="break-words italic font-semibold pr-1">
                            Headers:
                        </span>
                        <span className="break-all">
                            {
                                ConsumerUtils
                                    .TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE[
                                    textSearchFilter.headersType
                                ]
                            }
                        </span>
                    </span>
                )}
                {textSearchFilter.metadataType !== 'DISABLED' && (
                    <span className="flex">
                        <span className="break-words italic font-semibold pr-1">
                            Metadata:
                        </span>
                        <span className="break-all">
                            {
                                ConsumerUtils
                                    .TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE[
                                    textSearchFilter.metadataType
                                ]
                            }
                        </span>
                    </span>
                )}
            </span>
        );
    }, [textSearchFilter]);

    return (
        <CommonTooltip
            maxWidth="300px"
            label={
                <div className="flex flex-col">
                    <div className="text-sm">
                        <span className="font-bold">Time: </span>
                        {timeLabel}
                    </div>
                    <div className="text-sm pt-3">
                        <span className="font-bold">Text Search: </span>
                        {textSearchLabel}
                    </div>
                    <div className="text-sm pt-3">
                        <span className="font-bold">Partition: </span>
                        <span className="break-words">{partitionLabel}</span>
                    </div>
                    <div className="text-sm pt-3">
                        <span className="font-bold">Offset: </span>
                        <span className="break-words">{offsetLabel}</span>
                    </div>
                    <div className="text-sm pt-3">
                        <span className="font-bold">Group Id: </span>
                        <span className="break-words">{groupIdLabel}</span>
                    </div>
                    <div className="text-sm pt-3">
                        <span className="font-bold">Javascript: </span>
                        <span className="break-words">{javascriptLabel}</span>
                    </div>
                </div>
            }
        >
            <CommonButton
                variant="outline"
                onClick={() => setIsModalOpen(true)}
            >
                Filters
            </CommonButton>
        </CommonTooltip>
    );
}

export default BlazingConsumerAdditionalFiltersButton;
