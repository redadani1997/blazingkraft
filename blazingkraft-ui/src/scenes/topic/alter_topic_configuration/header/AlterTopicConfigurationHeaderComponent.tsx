import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AlterTopicConfigurationHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(topic, refreshPageContent, isRefreshPageContentPending) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={topic}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function AlterTopicConfigurationHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: AlterTopicConfigurationHeaderComponentProps) {
    const { clusterCode, topic } = useParams();

    const title = renderTitle(
        topic,
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
                        highlighted: false,
                        to: `/clusters/${clusterCode}/topics`,
                        label: 'Topics',
                    },
                    {
                        highlighted: false,
                        to: `/clusters/${clusterCode}/topics/${topic}`,
                        label: topic,
                    },
                    {
                        highlighted: true,
                        label: 'Alter Configuration',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AlterTopicConfigurationHeaderComponent;
