import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="OpenAPI Definition Validation" />
        </div>
    );
}

function OpenAPIDefinitionHeaderComponent() {
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
                    label: 'OpenAPI Definition',
                },
            ]}
            title={title}
        />
    );
}

export default OpenAPIDefinitionHeaderComponent;
