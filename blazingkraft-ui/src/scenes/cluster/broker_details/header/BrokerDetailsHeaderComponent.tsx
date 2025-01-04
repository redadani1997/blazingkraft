import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BrokerDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    brokerId,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={`Broker ${brokerId}`}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function BrokerDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: BrokerDetailsHeaderComponentProps) {
    const { clusterCode, brokerId } = useParams();

    const title = renderTitle(
        brokerId,
        refreshPageContent,
        isRefreshPageContentPending,
    );
    return (
        <>
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
                        label: 'Brokers',
                    },
                    {
                        highlighted: true,
                        label: 'Configuration',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default BrokerDetailsHeaderComponent;
