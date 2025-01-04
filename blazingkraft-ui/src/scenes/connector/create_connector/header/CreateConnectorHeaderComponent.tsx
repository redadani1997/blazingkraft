import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface CreateConnectorHeaderComponentProps {
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
                label="Connector Creation"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function CreateConnectorHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: CreateConnectorHeaderComponentProps) {
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
                        highlighted: false,
                        to: `/kafka_connects/${kafkaConnectCode}/connectors`,
                        label: 'Connectors',
                    },
                    {
                        highlighted: true,
                        label: 'Create',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default CreateConnectorHeaderComponent;
