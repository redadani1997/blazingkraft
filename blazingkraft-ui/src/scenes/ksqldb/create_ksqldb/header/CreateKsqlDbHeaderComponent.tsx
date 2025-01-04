import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="KsqlDb Creation" />;
}

function CreateKsqlDbHeaderComponent() {
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
                    highlighted: true,
                    label: 'Create KsqlDb',
                },
            ]}
            title={title}
        />
    );
}

export default CreateKsqlDbHeaderComponent;
