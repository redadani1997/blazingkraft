import { Grid, Text } from '@mantine/core';
import { ConsumerGroupDescription } from 'common/types/consumer_group';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';

interface ConsumerGroupMetadataComponentProps {
    consumerGroupDescription?: ConsumerGroupDescription;
    isDescribeConsumerGroupPending?: boolean;
}

const ConsumerGroupMetadataComponent = ({
    consumerGroupDescription,
    isDescribeConsumerGroupPending,
}: ConsumerGroupMetadataComponentProps) => {
    return (
        <>
            <Grid>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="State"
                        content={
                            <Text className="italic">
                                {consumerGroupDescription?.state}
                            </Text>
                        }
                        copyText={consumerGroupDescription?.state}
                        isLoading={isDescribeConsumerGroupPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Members"
                        content={
                            <Text className="italic">
                                {consumerGroupDescription?.members?.length}
                            </Text>
                        }
                        copyText={consumerGroupDescription?.members?.length}
                        isLoading={isDescribeConsumerGroupPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Authorized Operations"
                        content={
                            <div className="">
                                {consumerGroupDescription?.authorizedOperations.map(
                                    operation => (
                                        <Text
                                            key={operation}
                                            className="italic pr-2"
                                            component="span"
                                        >
                                            {operation}
                                        </Text>
                                    ),
                                )}
                            </div>
                        }
                        copyText={consumerGroupDescription?.authorizedOperations.join(
                            ' ',
                        )}
                        isLoading={isDescribeConsumerGroupPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Coordinator"
                        content={
                            <Text className="italic">
                                {consumerGroupDescription?.coordinator?.host}:
                                {consumerGroupDescription?.coordinator?.port}
                            </Text>
                        }
                        copyText={`${consumerGroupDescription?.coordinator?.host}:${consumerGroupDescription?.coordinator?.port}`}
                        isLoading={isDescribeConsumerGroupPending}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default ConsumerGroupMetadataComponent;
