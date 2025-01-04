import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useCallback } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';

interface RawConfigurationComponent {
    setRawConfiguration?: (rawConfiguration: string) => void;
    rawConfiguration: string;
    setConfigurationValues?: (configurationValues: Map<string, any>) => void;
    setIsRawConfigurationSyntaxValid?: (
        isRawConfigurationSyntaxValid: boolean,
    ) => void;
    readOnly?: boolean;
    minHeight?: string;
}

function RawConfigurationComponent({
    rawConfiguration,
    setRawConfiguration,
    setConfigurationValues,
    setIsRawConfigurationSyntaxValid,
    readOnly,
    minHeight,
}: RawConfigurationComponent) {
    const onContentChange = (value: string) => {
        setRawConfiguration(value);
        const object = CommonUtils.stringToObject(value);
        setConfigurationValues(CommonUtils.objectToMap(object));
    };

    const setIsSyntaxValid = useCallback(
        markers => {
            if (
                CommonValidationUtils.isFalsy(setIsRawConfigurationSyntaxValid)
            ) {
                return;
            }
            setIsRawConfigurationSyntaxValid(!markers || markers.length === 0);
        },
        [setIsRawConfigurationSyntaxValid],
    );

    return (
        <div className="h-full w-full flex flex-col">
            <Grid className="flex-1">
                <Grid.Col span={12} md={8} className="">
                    <CommonEditorWrapper minHeight={minHeight}>
                        <CommonEditor
                            content={rawConfiguration}
                            defaultValue={rawConfiguration}
                            onContentChange={onContentChange}
                            onValidate={setIsSyntaxValid}
                            readOnly={readOnly}
                            language="json"
                        />
                    </CommonEditorWrapper>
                </Grid.Col>
            </Grid>
        </div>
    );
}

RawConfigurationComponent.defaultProps = {
    minHeight: '24rem',
};

export default RawConfigurationComponent;
