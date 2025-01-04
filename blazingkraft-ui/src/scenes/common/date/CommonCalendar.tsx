import { CalendarProps, DatePicker } from '@mantine/dates';

interface CommonCalendarProps<Multiple extends boolean = false>
    extends CalendarProps {
    label?: string;
    multiple?: Multiple;
    value?: Multiple extends true ? Date[] : Date | null;
    onChange?(value: Multiple extends true ? Date[] : Date | null): void;
    disabled: boolean;
}

function CommonCalendar(props: CommonCalendarProps) {
    return (
        <DatePicker
            {...props}
            allowDeselect={false}
            excludeDate={() => props.disabled}
            // disableOutsideEvents={props.disabled}
            // allowLevelChange={!props.disabled}
        />
    );
}

CommonCalendar.defaultProps = {
    disabled: false,
};

export default CommonCalendar;
