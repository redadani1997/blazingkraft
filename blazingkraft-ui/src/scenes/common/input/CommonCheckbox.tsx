import { Checkbox, Input } from '@mantine/core';
import { useRef } from 'react';

export interface CommonCheckboxProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    wrapperClassName?: any;
    id?: string;
    /** Input label, displayed before input */
    label?: React.ReactNode;
    /** Input description, displayed after label */
    description?: React.ReactNode;
    /** Displays error message after input */
    error?: React.ReactNode;
    /** Adds required attribute to the input and red asterisk on the right side of label */
    required?: boolean;
    /** Determines whether required asterisk should be rendered, overrides required prop, does not add required attribute to the input */
    withAsterisk?: boolean;
    /** Props spread to label element */
    labelProps?: Record<string, any>;
    /** Props spread to description element */
    descriptionProps?: Record<string, any>;
    /** Props spread to error element */
    errorProps?: Record<string, any>;
    /** Input container component, defaults to React.Fragment */
    inputContainer?(children: React.ReactNode): React.ReactNode;
    /** Controls order of the Input.Wrapper elements */
    inputWrapperOrder?: ('label' | 'input' | 'description' | 'error')[];
}

function CommonCheckbox({
    checked,
    onChange,
    disabled,
    label,
    error,
    wrapperClassName,
    id,
    description,
}: CommonCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <Input.Wrapper
            id={id}
            description={description}
            className={wrapperClassName}
            label={label}
            labelProps={{
                style: {
                    width: '100%',
                    cursor: disabled ? 'default' : 'pointer',
                },
            }}
            error={error}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
            onClick={() => {
                if (
                    onChange &&
                    (disabled === null ||
                        disabled === undefined ||
                        disabled === false)
                ) {
                    onChange(!checked);
                }
            }}
        >
            <Checkbox
                ref={ref}
                checked={checked}
                disabled={disabled}
                onChange={() => {
                    // no-op
                }}
            />
        </Input.Wrapper>
    );
}

export default CommonCheckbox;
