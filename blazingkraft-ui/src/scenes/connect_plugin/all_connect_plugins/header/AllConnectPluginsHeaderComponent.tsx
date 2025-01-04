import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllConnectPluginsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    allConnectPluginsLength: number;
}

function renderTitle(
    kafkaConnectCode,
    refreshPageContent,
    isRefreshPageContentPending,
    allConnectPluginsLength,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Plugins"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Plugins">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    allConnectPluginsLength,
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

function AllConnectPluginsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    allConnectPluginsLength,
}: AllConnectPluginsHeaderComponentProps) {
    const { kafkaConnectCode } = useParams();
    const title = renderTitle(
        kafkaConnectCode,
        refreshPageContent,
        isRefreshPageContentPending,
        allConnectPluginsLength,
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
                        highlighted: true,
                        label: 'Plugins',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllConnectPluginsHeaderComponent;
