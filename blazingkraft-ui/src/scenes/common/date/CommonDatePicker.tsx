import {
    MantineShadow,
    MantineSize,
    MantineTransition,
    ModalProps,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMemo } from 'react';

interface CommonDatePickerProps {
    /** Props spread to root element */
    wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
    /** Placeholder, displayed when date is not selected */
    placeholder?: string;
    /** Dropdown appear/disappear transition */
    transition?: MantineTransition;
    /** Dropdown appear/disappear transition duration */
    transitionDuration?: number;
    /** Dropdown appear/disappear transition timing function, defaults to theme.transitionTimingFunction */
    transitionTimingFunction?: string;
    /** Dropdown shadow from theme or css value for custom box-shadow */
    shadow?: MantineShadow;
    /** Input name, useful fon uncontrolled variant to capture data with native form */
    name?: string;
    /** Input size */
    size?: MantineSize;
    /** Where to show calendar in modal or popover */
    dropdownType?: 'popover' | 'modal';
    /** Dropdown positioning behavior */
    dropdownPosition?: 'bottom-start' | 'top-start' | 'flip';
    /** Allow to clear value */
    clearable?: boolean;
    /** aria-label for clear button */
    clearButtonLabel?: string;
    /** useEffect dependencies to force update dropdown position */
    positionDependencies?: any[];
    /** Dropdown zIndex */
    zIndex?: React.CSSProperties['zIndex'];
    /** call onChange with last valid value onBlur */
    fixOnBlur?: boolean;
    /** Whether to render the dropdown in a Portal */
    withinPortal?: boolean;
    /** Called when dropdown opens */
    onDropdownOpen?(): void;
    /** Called when dropdown closes */
    onDropdownClose?(): void;
    /** Events that should trigger outside clicks */
    clickOutsideEvents?: string[];
    /** Props spread to Modal component */
    modalProps?: Partial<ModalProps>;
    /** Modal z-index */
    modalZIndex?: React.CSSProperties['zIndex'];
    /** Set the clear button tab index to disabled or default after input field */
    clearButtonTabIndex?: -1 | 0;

    /** Selected date, required with controlled input */
    value?: Date | null;
    /** Called when date changes */
    onChange?(value: Date | null): void;
    /** Default value for uncontrolled input */
    defaultValue?: Date | null;
    /** Set to false to force dropdown to stay open after date was selected */
    closeCalendarOnChange?: boolean;
    /** Set to true to open dropdown on clear */
    openDropdownOnClear?: boolean;
    /** dayjs input format */
    inputFormat?: string;
    /** Control initial dropdown opened state */
    initiallyOpened?: boolean;
    /** Parser function for date provided by input typing */
    dateParser?: (value: string) => Date;
    /** Allow free input */
    allowFreeInput?: boolean;
    /** Render day based on the date */
    renderDay?(date: Date): React.ReactNode;
    /** Label */
    label?: string;

    fixedWithNoTop?: boolean;

    disabled?: boolean;
}

function CommonDatePicker(props: CommonDatePickerProps) {
    const rest = useMemo(() => {
        const { fixedWithNoTop, ...rest } = props;
        return rest;
    }, [props]);

    if (props.fixedWithNoTop) {
        return (
            <DatePickerInput
                {...rest}
                styles={{
                    pickerControl: {
                        position: 'fixed',
                        top: 0,
                    },
                    // calendar: {
                    //     position: 'fixed',
                    //     top: 0,
                    // },
                }}
            />
        );
    }
    return <DatePickerInput {...props} />;
}

export default CommonDatePicker;
