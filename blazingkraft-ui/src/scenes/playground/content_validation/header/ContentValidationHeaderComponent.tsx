import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="Content Validation" />
        </div>
    );
}

function ContentValidationHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Playground',
                },
                {
                    highlighted: true,
                    label: 'Content Validation',
                },
            ]}
            title={title}
        />
    );
}

export default ContentValidationHeaderComponent;
