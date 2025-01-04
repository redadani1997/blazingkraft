import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllClustersHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    kafkaConnectsLength: number;
    isAuthorizedCreateKafkaConnect: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    kafkaConnectsLength,
    isAuthorizedCreateKafkaConnect,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Kafka Connects"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Kafka Connects">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    kafkaConnectsLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateKafkaConnect && (
                <Button
                    component={Link}
                    to="/kafka_connects/create"
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create Kafka Connect
                </Button>
            )}
        </div>
    );
}

function AllClustersHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    kafkaConnectsLength,
    isAuthorizedCreateKafkaConnect,
}: AllClustersHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        kafkaConnectsLength,
        isAuthorizedCreateKafkaConnect,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Kafka Connects',
                },
            ]}
            title={title}
        />
    );
}

export default AllClustersHeaderComponent;
