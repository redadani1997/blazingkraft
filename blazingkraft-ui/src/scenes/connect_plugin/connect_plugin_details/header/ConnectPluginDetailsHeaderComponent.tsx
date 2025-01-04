import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface ConnectPluginDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    kafkaConnectCode,
    pluginName,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={pluginName}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function ConnectPluginDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: ConnectPluginDetailsHeaderComponentProps) {
    const { kafkaConnectCode, pluginName } = useParams();

    const title = renderTitle(
        kafkaConnectCode,
        pluginName,
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
                        to: `/kafka_connects/${kafkaConnectCode}/plugins`,
                        label: 'Plugins',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default ConnectPluginDetailsHeaderComponent;
