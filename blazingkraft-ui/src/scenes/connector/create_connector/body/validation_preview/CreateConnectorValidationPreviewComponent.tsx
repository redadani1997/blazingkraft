import { ConnectPluginValidationResponse } from 'common/types/connect_plugin';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useState } from 'react';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';

interface CreateConnectorValidationPreviewComponent {
    serverErrorMessage: string;
    setHasConfigurationError: (hasConfigurationError: boolean) => void;
    connectPluginValidationResponse: ConnectPluginValidationResponse;
    setActiveTab: (activeTab: string) => void;
}

function CreateConnectorValidationPreviewComponent({
    serverErrorMessage,
    connectPluginValidationResponse,
    setHasConfigurationError,
    setActiveTab,
}: CreateConnectorValidationPreviewComponent) {
    const [errorMessage, setErrorMessage] = useState(
        CommonUtils.beautifyJson({ errorMessage: 'No error message' }),
    );

    useEffect(() => {
        if (
            !connectPluginValidationResponse ||
            !connectPluginValidationResponse.configs
        ) {
            setErrorMessage(
                CommonUtils.beautifyJson({ errorMessage: 'No error message' }),
            );
            return;
        }
        const computedValidationMessage =
            connectPluginValidationResponse.configs
                .filter(config => config.value?.errors?.length > 0)
                .map(config => {
                    return {
                        configName: config.definition.name,
                        errors: config.value.errors,
                        recommendedValues: config.value.recommended_values,
                    };
                });
        if (connectPluginValidationResponse.error_count === 0) {
            setErrorMessage(
                CommonUtils.beautifyJson({ errorMessage: 'No error message' }),
            );
            setHasConfigurationError(false);
        } else {
            setErrorMessage(
                CommonUtils.beautifyJson(computedValidationMessage),
            );
            setActiveTab('Validation');
            setHasConfigurationError(true);
        }
    }, [connectPluginValidationResponse]);

    useEffect(() => {
        if (!serverErrorMessage) {
            setErrorMessage(
                CommonUtils.beautifyJson({ errorMessage: 'No error message' }),
            );
            setHasConfigurationError(false);
        } else {
            const computedValidationMessage = {
                serverError: serverErrorMessage,
            };
            setErrorMessage(
                CommonUtils.beautifyJson(computedValidationMessage),
            );
            setActiveTab('Validation');
            setHasConfigurationError(true);
        }
    }, [serverErrorMessage]);

    return (
        <CommonEditorWrapper minHeight="23rem">
            <CommonEditor
                content={errorMessage}
                defaultValue={errorMessage}
                language="json"
                readOnly
            />
        </CommonEditorWrapper>
    );
}

export default CreateConnectorValidationPreviewComponent;
