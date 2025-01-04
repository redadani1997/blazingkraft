import { Button } from '@mantine/core';
import { TbPencil } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface BlazingConsumerDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedEditConsumerConfiguration: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditConsumerConfiguration,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={`Consumer Configuration`}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {isAuthorizedEditConsumerConfiguration && (
                <Button
                    component={Link}
                    to={`/clusters/${clusterCode}/consumer/configuration/edit`}
                    leftIcon={<TbPencil size={22} />}
                >
                    Edit Configuration
                </Button>
            )}
        </div>
    );
}

function BlazingConsumerDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditConsumerConfiguration,
}: BlazingConsumerDetailsHeaderComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        isAuthorizedEditConsumerConfiguration,
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
                    to: `/clusters/${clusterCode}/consumer/blazing_consumer`,
                    label: 'Consumer',
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

export default BlazingConsumerDetailsHeaderComponent;
