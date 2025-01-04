import { PasswordInput } from '@mantine/core';

export interface CommonPasswordInputProps {
    placeholder: string;
    value: string;
    onChange?: (value: string | null) => void;
    disabled?: boolean;
    className?: any;
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

    onEnterPress?: () => void;
}

function CommonPasswordInput({
    placeholder,
    value,
    onChange,
    disabled,
    label,
    error,
    className,
    id,
    description,
    withAsterisk,
    onEnterPress,
}: CommonPasswordInputProps) {
    return (
        <PasswordInput
            placeholder={placeholder}
            label={label}
            description={description}
            withAsterisk={withAsterisk}
            className={className}
            id={id}
            value={value}
            onChange={event => {
                if (onChange) {
                    onChange(event.target?.value);
                }
            }}
            disabled={disabled}
            error={error}
            onKeyDown={event => {
                if (onEnterPress) {
                    if (event.key === 'Enter') {
                        onEnterPress();
                    }
                }
            }}
        />
    );
}

export default CommonPasswordInput;
