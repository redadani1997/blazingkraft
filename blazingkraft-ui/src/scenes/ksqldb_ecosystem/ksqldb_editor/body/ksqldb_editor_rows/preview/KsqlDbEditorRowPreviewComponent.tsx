import { Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';

interface KsqlDbEditorRowPreviewComponentProps {
    selectedRow: IKsqlDbRow | null;
    isPreviewModalOpen: boolean;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
}

function KsqlDbEditorRowPreviewComponent({
    selectedRow,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
}: KsqlDbEditorRowPreviewComponentProps) {
    const stringifiedRow = CommonUtils.beautifyJson(
        selectedRow ? selectedRow.data : null,
    );
    return (
        <CommonModal
            onClose={() => setIsPreviewModalOpen(false)}
            isOpen={isPreviewModalOpen}
            modalBody={
                <CommonEditorWrapper minHeight="23rem">
                    <CommonEditor
                        content={stringifiedRow}
                        defaultValue={stringifiedRow}
                        readOnly={true}
                        language="json"
                    />
                </CommonEditorWrapper>
            }
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Row Preview</Text>
                </div>
            }
        />
    );
}

export default KsqlDbEditorRowPreviewComponent;
