import CommonButton from 'scenes/common/button/CommonButton';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import { TbArrowBigUpLines, TbInfoCircle } from 'react-icons/tb';

interface BlazingProducerFilterButtonProps {
    action: () => void;
    isKeySchemaDefinitionValid: boolean;
    isKeySchemaSyntaxValid: boolean;
    isKeyContentSchemaValid: boolean;
    isKeyContentSyntaxValid: boolean;
    isValueSchemaSyntaxValid: boolean;
    isValueSchemaDefinitionValid: boolean;
    isValueContentSyntaxValid: boolean;
    isValueContentSchemaValid: boolean;
    isHeadersSyntaxValid: boolean;
    topicExists: boolean;
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
                Produce
            </CommonButton>
        </CommonTooltip>
    );
}

function BlazingProducerFilterButton({
    action,
    isKeySchemaDefinitionValid,
    isKeySchemaSyntaxValid,
    isKeyContentSchemaValid,
    isKeyContentSyntaxValid,
    isValueSchemaSyntaxValid,
    isValueSchemaDefinitionValid,
    isValueContentSyntaxValid,
    isValueContentSchemaValid,
    isHeadersSyntaxValid,
    topicExists,
}: BlazingProducerFilterButtonProps) {
    if (!topicExists) {
        return buttonByColor(action, 'red', 'Please select a valid topic');
    }
    if (!isKeyContentSyntaxValid) {
        return buttonByColor(action, 'yellow', 'The Key syntax is invalid');
    }
    if (!isValueContentSyntaxValid) {
        return buttonByColor(action, 'yellow', 'The Value syntax is invalid');
    }
    if (!isHeadersSyntaxValid) {
        return buttonByColor(action, 'yellow', 'The Headers syntax is invalid');
    }
    if (!isKeySchemaSyntaxValid) {
        return buttonByColor(
            action,
            'yellow',
            'The Key Schema syntax is invalid',
        );
    }
    if (!isValueSchemaSyntaxValid) {
        return buttonByColor(
            action,
            'yellow',
            'The Value Schema syntax is invalid',
        );
    }
    if (!isKeySchemaDefinitionValid) {
        return buttonByColor(
            action,
            'red',
            'The Key Schema Definition is not valid',
        );
    }
    if (!isValueSchemaDefinitionValid) {
        return buttonByColor(
            action,
            'red',
            'The Value Schema Definition is not valid',
        );
    }
    if (!isKeyContentSchemaValid) {
        return buttonByColor(
            action,
            'red',
            'The Key Content Schema is not valid',
        );
    }
    if (!isValueContentSchemaValid) {
        return buttonByColor(
            action,
            'red',
            'The Value Content Schema is not valid',
        );
    }

    return (
        <CommonButton
            leftIcon={<TbArrowBigUpLines size={22} />}
            onClick={() => {
                action();
            }}
        >
            Produce
        </CommonButton>
    );
}

export default BlazingProducerFilterButton;
