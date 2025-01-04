import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllKsqlDbQueriesHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbQueriesLength: number;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbQueriesLength,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Queries"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Queries">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    ksqlDbQueriesLength,
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

function AllKsqlDbQueriesHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbQueriesLength,
}: AllKsqlDbQueriesHeaderComponentProps) {
    const { ksqlDbCode } = useParams();
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbQueriesLength,
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
                        label: 'Queries',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllKsqlDbQueriesHeaderComponent;
