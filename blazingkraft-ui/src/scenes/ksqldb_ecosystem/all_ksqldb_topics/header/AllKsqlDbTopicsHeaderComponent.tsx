import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllKsqlDbTopicsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbTopicsLength: number;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbTopicsLength,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Topics"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Topics">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(ksqlDbTopicsLength)}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
        </div>
    );
}

function AllKsqlDbTopicsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbTopicsLength,
}: AllKsqlDbTopicsHeaderComponentProps) {
    const { ksqlDbCode } = useParams();
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbTopicsLength,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/ksqldbs',
                        label: 'KsqlDbs',
                    },
                    {
                        highlighted: false,
                        to: `/ksqldbs/${ksqlDbCode}/dashboard`,
                        label: ksqlDbCode,
                    },
                    {
                        highlighted: true,
                        label: 'Topics',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllKsqlDbTopicsHeaderComponent;
