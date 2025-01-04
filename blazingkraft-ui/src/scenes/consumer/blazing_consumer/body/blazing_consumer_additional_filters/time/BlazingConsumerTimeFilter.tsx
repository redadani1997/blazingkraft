import { Checkbox, Grid, Input, SimpleGrid } from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import CommonCalendar from 'scenes/common/date/CommonCalendar';
import CommonTimePicker from 'scenes/common/date/CommonTimePicker';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { TimeFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerTimeFilterProps {
    setTimeFilter: (timeFilter: TimeFilter) => void;
    timeFilter: TimeFilter;
    timezone: string;
    setTimezone: (timezone: string) => void;
}

function BlazingConsumerTimeFilter({
    timeFilter,
    setTimeFilter,
    timezone,
    setTimezone,
}: BlazingConsumerTimeFilterProps) {
    const {
        liveConsumption,
        allowEnd,
        allowStart,
        disabled,
        earliest,
        latest,
        startDate,
        startTime,
        endDate,
        endTime,
    } = timeFilter;

    return (
        <>
            <Grid>
                <Grid.Col span={12} md={12} xl={4}>
                    <SimpleGrid
                        cols={1}
                        spacing="sm"
                        breakpoints={[
                            { maxWidth: 'xl', cols: 2, spacing: 'sm' },
                            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                        ]}
                    >
                        <Checkbox
                            label="Disabled"
                            className=" pt-4"
                            checked={disabled}
                            onChange={() => {
                                if (!disabled) {
                                    setTimeFilter({
                                        ...timeFilter,
                                        disabled: true,
                                        liveConsumption: false,
                                        allowStart: false,
                                        allowEnd: false,
                                        earliest: false,
                                        latest: false,
                                    });
                                }
                            }}
                        />
                        <Checkbox
                            label="Live Consumption"
                            className=" pt-4"
                            checked={liveConsumption}
                            onChange={() => {
                                setTimeFilter({
                                    ...timeFilter,
                                    disabled: liveConsumption,
                                    liveConsumption: !liveConsumption,
                                    allowStart: false,
                                    allowEnd: false,
                                    earliest: false,
                                    latest: false,
                                });
                            }}
                        />
                        <Checkbox
                            label="Start"
                            className=" pt-4"
                            checked={allowStart}
                            onChange={() => {
                                setTimeFilter({
                                    ...timeFilter,
                                    disabled: allowEnd ? false : allowStart,
                                    liveConsumption: false,
                                    allowStart: !allowStart,
                                    allowEnd,
                                    earliest: false,
                                    latest: false,
                                });
                            }}
                        />
                        <Checkbox
                            label="End"
                            className=" pt-4"
                            checked={allowEnd}
                            onChange={() => {
                                setTimeFilter({
                                    ...timeFilter,
                                    disabled: allowStart ? false : allowEnd,
                                    liveConsumption: false,
                                    allowEnd: !allowEnd,
                                    earliest: false,
                                    latest: false,
                                });
                            }}
                        />
                        <Checkbox
                            label="Earliest"
                            className=" pt-4"
                            checked={earliest}
                            onChange={() => {
                                setTimeFilter({
                                    ...timeFilter,
                                    disabled: earliest,
                                    liveConsumption: false,
                                    allowStart: false,
                                    allowEnd: false,
                                    earliest: !earliest,
                                    latest: false,
                                });
                            }}
                        />
                        <Checkbox
                            label="Latest"
                            className=" pt-4"
                            checked={latest}
                            onChange={() => {
                                setTimeFilter({
                                    ...timeFilter,
                                    disabled: latest,
                                    liveConsumption: false,
                                    allowStart: false,
                                    allowEnd: false,
                                    earliest: false,
                                    latest: !latest,
                                });
                            }}
                        />
                        <Input.Wrapper label="Timezone">
                            <CommonSelect
                                placeholder="Select Timezone"
                                creatable
                                searchable
                                disabled={!allowEnd && !allowStart}
                                value={timezone}
                                data={CommonTimeUtils.TIMEZONES_OPTIONS}
                                onChange={value => setTimezone(value)}
                                clearable={false}
                            />
                        </Input.Wrapper>
                    </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={12} sm={6} xl={4}>
                    <div className="flex flex-col items-start h-full justify-between">
                        <CommonCalendar
                            label="Start"
                            disabled={!allowStart}
                            value={startDate}
                            onChange={date => {
                                setTimeFilter({
                                    ...timeFilter,
                                    startDate: date,
                                });
                            }}
                        />
                        <CommonTimePicker
                            disabled={!allowStart}
                            value={startTime}
                            onTimeChange={value => {
                                setTimeFilter({
                                    ...timeFilter,
                                    startTime: value,
                                });
                            }}
                            className="mt-2"
                        />
                    </div>
                </Grid.Col>
                <Grid.Col span={12} sm={6} xl={4}>
                    <div className="flex flex-col items-start h-full justify-between">
                        <CommonCalendar
                            label="End"
                            disabled={!allowEnd}
                            value={endDate}
                            onChange={date => {
                                setTimeFilter({
                                    ...timeFilter,
                                    endDate: date,
                                });
                            }}
                        />
                        <CommonTimePicker
                            withSeconds
                            disabled={!allowEnd}
                            value={endTime}
                            onTimeChange={value =>
                                setTimeFilter({
                                    ...timeFilter,
                                    endTime: value,
                                })
                            }
                            className="mt-2"
                        />
                    </div>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default BlazingConsumerTimeFilter;
