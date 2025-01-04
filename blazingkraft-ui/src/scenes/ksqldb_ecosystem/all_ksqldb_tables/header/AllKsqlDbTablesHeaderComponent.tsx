import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllKsqlDbTablesHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbTablesLength: number;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbTablesLength,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Tables"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Tables">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(ksqlDbTablesLength)}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
        </div>
    );
}

function AllKsqlDbTablesHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbTablesLength,
}: AllKsqlDbTablesHeaderComponentProps) {
    const { ksqlDbCode } = useParams();
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbTablesLength,
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
                        label: 'Tables',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllKsqlDbTablesHeaderComponent;
