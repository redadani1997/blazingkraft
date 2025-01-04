import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditConnectorHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    kafkaConnectCode,
    connector,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={connector}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditConnectorHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditConnectorHeaderComponentProps) {
    const { kafkaConnectCode, connector } = useParams();
    const title = renderTitle(
        kafkaConnectCode,
        connector,
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
                        highlighted: false,
                        to: `/kafka_connects/${kafkaConnectCode}/connectors/${connector}/details`,
                        label: connector,
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

export default EditConnectorHeaderComponent;
