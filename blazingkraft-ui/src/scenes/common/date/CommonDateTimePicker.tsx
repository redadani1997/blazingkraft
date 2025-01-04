import { ActionIcon, Popover } from '@mantine/core';
import { DateTimePicker, DateTimePickerProps } from '@mantine/dates';
import { useRef } from 'react';
import { TbClock } from 'react-icons/tb';

interface CommonDateTimePickerProps extends DateTimePickerProps {
    className?: string;
}

function CommonDateTimePicker(props: CommonDateTimePickerProps) {
    const ref = useRef<HTMLInputElement>();
    return (
        <Popover withinPortal>
            <DateTimePicker
                {...props}
                withSeconds
                valueFormat="DD MMM YYYY hh:mm:ss A"
                timeInputProps={{
                    ref: ref,
                    rightSection: (
                        <ActionIcon
                            disabled={props.disabled}
                            onClick={() => {
                                if (!props.disabled) {
                                    ref.current?.showPicker();
                                }
                            }}
                        >
                            <TbClock size="1rem" />
                        </ActionIcon>
                    ),
                }}
                styles={
                    {
                        // calendar: {
                        //     position: 'static',
                        //     top: 0,
                        // },
                    }
                }
            />
        </Popover>
    );
}

export default CommonDateTimePicker;
