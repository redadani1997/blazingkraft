import { Divider, Grid, Input } from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonUtils } from 'common/utils/CommonUtils';
import moment from 'moment';
import { useMemo, useState } from 'react';
import CommonDateTimePicker from 'scenes/common/date/CommonDateTimePicker';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonSelect from 'scenes/common/select/CommonSelect';

const ConversionsTimeComponent = () => {
    const [milliseconds, setMilliseconds] = useState<number | ''>(10000000);

    const [timezone, setTimezone] = useState<string>(
        CommonTimeUtils.CURRENT_TIMEZONE,
    );
    const [date, setDate] = useState<Date>(
        moment(CommonTimeUtils.nowAsDate(timezone)).toDate(),
    );

    const beautifiedMilliseconds = useMemo(
        () => CommonUtils.beautifyMilliseconds(milliseconds, 10),
        [milliseconds],
    );

    const timestamp = useMemo(
        () => CommonTimeUtils.dateToTimestamp(date, timezone),
        [date, timezone],
    );

    return (
        <div className="flex flex-col">
            <Divider
                label="Beautify Time"
                labelPosition="center"
                className="p-4"
            />
            <Grid className="">
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonNumberInput
                        label="Milliseconds"
                        value={milliseconds}
                        onChange={value => setMilliseconds(value)}
                        placeholder="Enter milliseconds"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonTextInput
                        label="Beautified Milliseconds"
                        value={beautifiedMilliseconds}
                        placeholder="Beautified Milliseconds"
                        onChange={() => {
                            // no-op
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Divider
                label="Format Date"
                labelPosition="center"
                className="p-4"
            />
            <Grid>
                <Grid.Col span={12} sm={6} md={4}>
                    <Input.Wrapper label="Timezone">
                        <CommonSelect
                            placeholder="Select Timezone"
                            creatable
                            searchable
                            value={timezone}
                            data={CommonTimeUtils.TIMEZONES_OPTIONS}
                            onChange={value => {
                                setTimezone(value);
                            }}
                            clearable={false}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={5}>
                    <CommonDateTimePicker
                        onChange={value => {
                            setDate(value);
                        }}
                        value={date}
                        label="Date"
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonNumberInput
                        label="Timestamp"
                        onChange={() => {
                            // no-op
                        }}
                        value={timestamp}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ConversionsTimeComponent;
