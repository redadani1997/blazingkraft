import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllKsqlDbStreamsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbStreamsLength: number;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbStreamsLength,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Streams"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Streams">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    ksqlDbStreamsLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
        </div>
    );
}

function AllKsqlDbStreamsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbStreamsLength,
}: AllKsqlDbStreamsHeaderComponentProps) {
    const { ksqlDbCode } = useParams();
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbStreamsLength,
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
                        label: 'Streams',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllKsqlDbStreamsHeaderComponent;
