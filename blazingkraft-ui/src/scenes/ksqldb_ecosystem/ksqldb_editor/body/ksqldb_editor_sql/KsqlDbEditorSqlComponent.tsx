import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface KsqlDbEditorSqlComponentProps {
    sql: string;
    properties: string;
    setSql: (sql: string) => void;
    setProperties: (properties: string) => void;
}

function KsqlDbEditorSqlComponent({
    sql,
    properties,
    setSql,
    setProperties,
}: KsqlDbEditorSqlComponentProps) {
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: 'SQL',
                className: 'h-full',
            }}
            items={[
                {
                    label: 'SQL',
                    value: 'SQL',
                    children: (
                        <CommonEditorWrapper minHeight="23rem">
                            <CommonEditor
                                content={sql}
                                defaultValue={sql}
                                language="sql"
                                onContentChange={setSql}
                            />
                        </CommonEditorWrapper>
                    ),
                },
                {
                    label: 'Properties',
                    value: 'Properties',
                    children: (
                        <CommonEditorWrapper minHeight="23rem">
                            <CommonEditor
                                content={properties}
                                defaultValue={properties}
                                language="json"
                                onContentChange={setProperties}
                            />
                        </CommonEditorWrapper>
                    ),
                },
            ]}
        />
    );
}

export default KsqlDbEditorSqlComponent;
