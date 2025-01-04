import { useParams } from 'react-router';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle(OIDCProviderCode) {
    return <CommonTitleLabel label={OIDCProviderCode} />;
}

function EditOIDCProviderHeaderComponent() {
    const { OIDCProviderCode } = useParams();

    const title = renderTitle(OIDCProviderCode);
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
                    highlighted: false,
                    to: `/management/oidc_providers/${OIDCProviderCode}/details`,
                    label: OIDCProviderCode,
                },
                {
                    highlighted: true,
                    label: 'Edit',
                },
            ]}
            title={title}
        />
    );
}

export default EditOIDCProviderHeaderComponent;
