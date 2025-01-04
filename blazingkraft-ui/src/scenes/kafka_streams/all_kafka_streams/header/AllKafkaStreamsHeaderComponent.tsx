import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="Streams Topologies" />
        </div>
    );
}

function AllKafkaStreamsHeaderComponent() {
    const { clusterCode } = useParams();
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
                    highlighted: false,
                    to: `/clusters/${clusterCode}/dashboard`,
                    label: clusterCode,
                },
                {
                    highlighted: true,
                    label: 'Streams',
                },
            ]}
            title={title}
        />
    );
}

export default AllKafkaStreamsHeaderComponent;
