import { Input, TextInput } from '@mantine/core';
import { Ref } from 'react';

export interface CommonTextInputProps {
    placeholder: string;
    value: string;
    onChange?: (value: string | null) => void;
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

    onEnterPress?: () => void;

    textInputRef?: Ref<any>;
}

function CommonTextInput({
    placeholder,
    value,
    onChange,
    disabled,
    label,
    error,
    wrapperClassName,
    id,
    description,
    onEnterPress,
    textInputRef,
}: CommonTextInputProps) {
    return (
        <Input.Wrapper
            id={id}
            description={description}
            className={wrapperClassName}
            label={label}
            labelProps={{ style: { width: '100%' } }}
            error={error}
        >
            <TextInput
                ref={textInputRef}
                placeholder={placeholder}
                value={value}
                onChange={event => {
                    if (onChange) {
                        onChange(event.target?.value);
                    }
                }}
                error={error}
                disabled={disabled}
                onKeyDown={event => {
                    if (onEnterPress) {
                        if (event.key === 'Enter') {
                            onEnterPress();
                        }
                    }
                }}
            />
        </Input.Wrapper>
    );
}

export default CommonTextInput;
