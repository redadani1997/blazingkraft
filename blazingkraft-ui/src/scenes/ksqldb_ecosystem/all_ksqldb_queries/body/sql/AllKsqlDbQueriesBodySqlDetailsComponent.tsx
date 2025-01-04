import { Text } from '@mantine/core';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonModal from 'scenes/common/modal/CommonModal';
import { KsqlDbQuery } from 'scenes/ksqldb_ecosystem/redux';

interface AllKsqlDbQueriesBodySqlDetailsComponentProps {
    ksqlDbQuery: KsqlDbQuery;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

function renderModalBody(sql: string) {
    return CommonValidationUtils.isTruthy(sql) ? (
        <CommonEditorWrapper minHeight="23rem">
            <CommonEditor
                content={sql}
                defaultValue={sql}
                readOnly={true}
                language="sql"
            />
        </CommonEditorWrapper>
    ) : (
        <></>
    );
}

function AllKsqlDbQueriesBodySqlDetailsComponent({
    ksqlDbQuery,
    isModalOpen,
    setIsModalOpen,
}: AllKsqlDbQueriesBodySqlDetailsComponentProps) {
    const modalBody = renderModalBody(ksqlDbQuery?.sql);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Persistent Query Details</Text>
                    <Text color="dimmed" size="xs">
                        {ksqlDbQuery?.id}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
        />
    );
}

export default AllKsqlDbQueriesBodySqlDetailsComponent;
