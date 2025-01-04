import { ColorInput } from '@mantine/core';

export interface CommonColorInputProps {
    placeholder?: string;
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
}

function CommonColorInput({
    placeholder,
    value,
    onChange,
    disabled,
    label,
    error,
    className,
    id,
    description,
}: CommonColorInputProps) {
    return (
        <ColorInput
            className={className}
            description={description}
            format="hexa"
            label={label}
            value={value || '#ff0000ff'}
            onChange={value => {
                onChange(value);
            }}
            placeholder={placeholder}
            error={error}
            id={id}
            disabled={disabled}
        />
    );
}

export default CommonColorInput;
