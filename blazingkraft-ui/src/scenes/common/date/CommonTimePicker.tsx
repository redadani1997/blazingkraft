import { ActionIcon, TextInputProps } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import classNames from 'classnames';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useMemo, useRef } from 'react';
import { TbClock } from 'react-icons/tb';

interface CommonTimePickerProps extends TextInputProps {
    /** Determines whether seconds input should be rendered */
    withSeconds?: boolean;
    className?: string;
    onTimeChange: (time: string | null) => void;
}

function CommonTimePicker(props: CommonTimePickerProps) {
    const ref = useRef<HTMLInputElement>();
    const { rest, onTimeChange, onChange } = useMemo(() => {
        const { onTimeChange, onChange, ...rest } = props;
        return { onTimeChange, onChange, rest };
    }, [props]);
    return (
        <TimeInput
            {...rest}
            className={classNames(props.className)}
            onChange={e => {
                const { value } = e.target;
                if (CommonValidationUtils.isTruthy(value)) {
                    onTimeChange(value);
                } else {
                    onTimeChange(null);
                }
                onChange?.(e);
            }}
            ref={ref}
            rightSection={
                <ActionIcon
                    disabled={props.disabled}
                    onClick={() => {
                        if (!props.disabled) {
                            ref.current.showPicker();
                        }
                    }}
                >
                    <TbClock size="1rem" />
                </ActionIcon>
            }
        />
    );
}

CommonTimePicker.defaultProps = {
    withSeconds: true,
};

export default CommonTimePicker;
