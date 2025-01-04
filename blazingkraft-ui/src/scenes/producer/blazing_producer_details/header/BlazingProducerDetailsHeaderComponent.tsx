import { Button } from '@mantine/core';
import { TbPencil } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BlazingProducerDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedEditProducerConfiguration: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditProducerConfiguration,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={`Producer Configuration`}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {isAuthorizedEditProducerConfiguration && (
                <Button
                    component={Link}
                    to={`/clusters/${clusterCode}/producer/configuration/edit`}
                    leftIcon={<TbPencil size={22} />}
                >
                    Edit Configuration
                </Button>
            )}
        </div>
    );
}

function BlazingProducerDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditProducerConfiguration,
}: BlazingProducerDetailsHeaderComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        isAuthorizedEditProducerConfiguration,
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
                    highlighted: true,
                    label: 'Configuration',
                },
            ]}
            title={title}
        />
    );
}

export default BlazingProducerDetailsHeaderComponent;
