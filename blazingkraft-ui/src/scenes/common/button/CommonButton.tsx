import {
    Button,
    Loader,
    LoaderProps,
    MantineColor,
    MantineGradient,
    MantineNumberSize,
    MantineSize,
    Variants,
} from '@mantine/core';
import classNames from 'classnames';

interface CommonButtonProps {
    size?: MantineSize;
    /** Button type attribute */
    type?: 'submit' | 'button' | 'reset';
    /** Button color from theme */
    color?: MantineColor;
    /** Adds icon before button label  */
    leftIcon?: React.ReactNode;
    /** Adds icon after button label  */
    rightIcon?: React.ReactNode;
    /** Sets button width to 100% of parent element */
    fullWidth?: boolean;
    /** Button border-radius from theme or number to set border-radius in px */
    radius?: MantineNumberSize;
    /** Controls button appearance */
    variant?: Variants<
        | 'filled'
        | 'outline'
        | 'light'
        | 'white'
        | 'default'
        | 'subtle'
        | 'gradient'
    >;
    /** Controls gradient settings in gradient variant only */
    gradient?: MantineGradient;
    /** Set text-transform to uppercase */
    uppercase?: boolean;
    /** Reduces vertical and horizontal spacing */
    compact?: boolean;
    /** Indicate loading state */
    loading?: boolean;
    /** Props spread to Loader component */
    loaderProps?: LoaderProps;
    /** Loader position relative to button label */
    loaderPosition?: 'left' | 'right' | 'center';
    /** Button label */
    children?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Disabled state */
    loadingWithoutDisabled?: boolean;
    /** Button click event handler */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** Additional class name */
    className?: string;
}

function CommonButton({
    children,
    color,
    compact,
    disabled,
    fullWidth,
    gradient,
    leftIcon,
    loaderPosition,
    loaderProps,
    loading,
    loadingWithoutDisabled,
    onClick,
    radius,
    rightIcon,
    size,
    type,
    uppercase,
    variant,
    className,
}: CommonButtonProps) {
    return (
        <Button
            className={classNames('w-full', className)}
            onClick={onClick}
            color={color}
            compact={compact}
            disabled={loading || disabled}
            fullWidth={fullWidth}
            gradient={gradient}
            leftIcon={leftIcon}
            loaderPosition={loaderPosition}
            loaderProps={loaderProps}
            radius={radius}
            rightIcon={
                loading || loadingWithoutDisabled ? (
                    <Loader size="sm" />
                ) : (
                    rightIcon
                )
            }
            size={size}
            type={type}
            uppercase={uppercase}
            variant={variant}
        >
            {children}
        </Button>
    );
}

export default CommonButton;
