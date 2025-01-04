import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditKafkaConnectHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    kafkaConnectCode,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Kafka Connect Edit"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditKafkaConnectHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditKafkaConnectHeaderComponentProps) {
    const { kafkaConnectCode } = useParams();

    const title = renderTitle(
        kafkaConnectCode,
        refreshPageContent,
        isRefreshPageContentPending,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/kafka_connects',
                        label: 'Kafka Connects',
                    },
                    {
                        highlighted: false,
                        to: `/kafka_connects/${kafkaConnectCode}/dashboard`,
                        label: kafkaConnectCode,
                    },
                    {
                        highlighted: true,
                        label: 'Edit',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default EditKafkaConnectHeaderComponent;
