import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllConnectorsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    connectorsLength: number;
    isAuthorizedCreateCluster: boolean;
}

function renderTitle(
    kafkaConnectCode,
    refreshPageContent,
    isRefreshPageContentPending,
    connectorsLength,
    isAuthorizedCreateCluster,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Connectors"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Connectors">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(connectorsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateCluster && (
                <div className="flex items-center">
                    <Button
                        component={Link}
                        to={`/kafka_connects/${kafkaConnectCode}/connectors/create`}
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Connector
                    </Button>
                </div>
            )}
        </div>
    );
}

function AllConnectorsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    connectorsLength,
    isAuthorizedCreateCluster,
}: AllConnectorsHeaderComponentProps) {
    const { kafkaConnectCode } = useParams();
    const title = renderTitle(
        kafkaConnectCode,
        refreshPageContent,
        isRefreshPageContentPending,
        connectorsLength,
        isAuthorizedCreateCluster,
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
                        label: 'Connectors',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllConnectorsHeaderComponent;
