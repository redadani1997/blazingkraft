import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="Cluster Creation" />;
}

function CreateClusterHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/clusters',
                    label: 'Clusters',
                },
                {
                    highlighted: true,
                    label: 'Create Cluster',
                },
            ]}
            title={title}
        />
    );
}

export default CreateClusterHeaderComponent;
