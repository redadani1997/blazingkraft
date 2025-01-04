import {
    TbArrowBigDownLines,
    TbInfoCircle,
    TbPlayerStop,
} from 'react-icons/tb';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';

interface BlazingConsumerFilterButtonProps {
    isConsuming: boolean;
    doStart: () => void;
    doStop: () => void;
    isKeySchemaSyntaxValid: boolean;
    isKeySchemaDefinitionValid: boolean;
    isValueSchemaSyntaxValid: boolean;
    isValueSchemaDefinitionValid: boolean;
    topicsExists: boolean;
}

function buttonByColor(action, color, label) {
    return (
        <CommonTooltip label={label}>
            <CommonButton
                leftIcon={<TbInfoCircle size={22} />}
                onClick={() => {
                    action();
                }}
                color={color}
            >
                Consume
            </CommonButton>
        </CommonTooltip>
    );
}
function BlazingConsumerFilterButton({
    isConsuming,
    doStart,
    doStop,
    isKeySchemaDefinitionValid,
    isKeySchemaSyntaxValid,
    isValueSchemaDefinitionValid,
    isValueSchemaSyntaxValid,
    topicsExists,
}: BlazingConsumerFilterButtonProps) {
    if (isConsuming) {
        return (
            <CommonButton
                leftIcon={<TbPlayerStop size={22} />}
                onClick={() => {
                    doStop();
                }}
                variant="light"
                loadingWithoutDisabled
            >
                Stop
            </CommonButton>
        );
    }

    if (!topicsExists) {
        return buttonByColor(doStart, 'red', 'Please select valid topics');
    }
    if (!isKeySchemaSyntaxValid) {
        return buttonByColor(
            doStart,
            'yellow',
            'The Key Schema syntax is invalid',
        );
    }
    if (!isValueSchemaSyntaxValid) {
        return buttonByColor(
            doStart,
            'yellow',
            'The Value Schema syntax is invalid',
        );
    }
    if (!isKeySchemaDefinitionValid) {
        return buttonByColor(
            doStart,
            'red',
            'The Key Schema Definition is not valid',
        );
    }
    if (!isValueSchemaDefinitionValid) {
        return buttonByColor(
            doStart,
            'red',
            'The Value Schema Definition is not valid',
        );
    }
    return (
        <CommonButton
            leftIcon={<TbArrowBigDownLines size={22} />}
            onClick={() => {
                doStart();
            }}
        >
            Consume
        </CommonButton>
    );
}

export default BlazingConsumerFilterButton;
