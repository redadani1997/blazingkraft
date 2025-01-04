import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditProducerConfigurationHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={`Producer Configuration`}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditProducerConfigurationHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditProducerConfigurationHeaderComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
    );
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
                    highlighted: false,
                    to: `/clusters/${clusterCode}/producer/blazing_producer`,
                    label: 'Producer',
                },
                {
                    highlighted: false,
                    to: `/clusters/${clusterCode}/producer/configuration`,
                    label: 'Configuration',
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

export default EditProducerConfigurationHeaderComponent;
