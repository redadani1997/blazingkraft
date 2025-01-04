import {
    DefaultProps,
    InputSharedProps,
    InputWrapperBaseProps,
    MantineSize,
    TextInputStylesNames,
    Textarea,
} from '@mantine/core';

export interface CommonTextareaProps
    extends DefaultProps<TextInputStylesNames>,
        InputWrapperBaseProps,
        InputSharedProps,
        React.ComponentPropsWithoutRef<'textarea'> {
    /** Id is used to bind input and label, if not passed unique id will be generated for each input */
    id?: string;
    /** If true textarea will grow with content until maxRows are reached  */
    autosize?: boolean;
    /** Defines maxRows in autosize variant, not applicable to regular variant */
    maxRows?: number;
    /** Defined minRows in autosize variant and rows in regular variant */
    minRows?: number;
    /** Props passed to root element */
    wrapperProps?: Record<string, any>;
    /** Input size */
    size?: MantineSize;
    /** Static selectors base */
    __staticSelector?: string;

    wrapperClassName?: any;

    onChange?: (value: string | null) => void;
}
function CommonTextareaInput(props: CommonTextareaProps) {
    return (
        <Textarea
            // defaultValue={
            //     configurationValue === null ? '' : configurationValue
            // }
            minRows={1}
            maxRows={9}
            autosize
            styles={{
                input: {
                    paddingTop: '0.4rem !important',
                    paddingBottom: '0px !important',
                },
            }}
            {...props}
            onChange={event => {
                if (props.onChange) {
                    props.onChange(event.target?.value);
                }
            }}
        />
    );
}

export default CommonTextareaInput;
