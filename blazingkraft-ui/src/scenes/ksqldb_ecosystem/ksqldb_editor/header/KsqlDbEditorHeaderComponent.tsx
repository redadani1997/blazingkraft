import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="Editor" />
        </div>
    );
}

function KsqlDbEditorComponent() {
    const { ksqlDbCode } = useParams();
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/ksqldbs',
                    label: 'KsqlDbs',
                },
                {
                    highlighted: false,
                    to: `/ksqldbs/${ksqlDbCode}/dashboard`,
                    label: ksqlDbCode,
                },
                {
                    highlighted: true,
                    label: 'Editor',
                },
            ]}
            title={title}
        />
    );
}

export default KsqlDbEditorComponent;
