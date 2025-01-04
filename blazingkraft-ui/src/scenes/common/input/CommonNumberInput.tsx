import { NumberInput, NumberInputProps } from '@mantine/core';

export interface CommonTextInputProps extends NumberInputProps {
    onChange?: (value: number) => void;
}

function CommonNumberInput(props: CommonTextInputProps) {
    return (
        <NumberInput
            {...props}
            onChange={value => {
                if (props.onChange) {
                    if (value === '') {
                        props.onChange(0);
                    } else {
                        props.onChange(value);
                    }
                }
            }}
        />
    );
}

export default CommonNumberInput;
