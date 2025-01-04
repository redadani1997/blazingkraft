import { useParams } from 'react-router';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="Topic Creation" />;
}

function CreateTopicHeaderComponent() {
    const title = renderTitle();
    const { clusterCode } = useParams();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/clusters',
                    label: 'Clusters',
                },
                {
                    highlighted: false,
                    to: `/clusters/${clusterCode}/dashboard`,
                    label: clusterCode,
                },
                {
                    highlighted: false,
                    to: `/clusters/${clusterCode}/topics`,
                    label: 'Topics',
                },
                {
                    highlighted: true,
                    label: 'Create Topic',
                },
            ]}
            title={title}
        />
    );
}

export default CreateTopicHeaderComponent;
