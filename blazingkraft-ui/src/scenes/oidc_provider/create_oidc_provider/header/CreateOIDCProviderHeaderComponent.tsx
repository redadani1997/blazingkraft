import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="OpenID Connect Provider Creation" />;
}

function CreateOIDCProviderHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: false,
                    to: '/management/oidc_providers',
                    label: 'OIDC Providers',
                },
                {
                    highlighted: true,
                    label: 'Create',
                },
            ]}
            title={title}
        />
    );
}

export default CreateOIDCProviderHeaderComponent;
