import { Grid, Text } from '@mantine/core';
import { ITopicDetails } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useMemo } from 'react';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';

interface TopicDetailsMetadataComponentProps {
    topicDetails?: ITopicDetails;
    isGetTopicDetailsPending?: boolean;
}

const TopicDetailsMetadataComponent = ({
    topicDetails,
    isGetTopicDetailsPending,
}: TopicDetailsMetadataComponentProps) => {
    const totalRecords = useMemo(() => {
        if (
            !topicDetails ||
            CommonValidationUtils.isFalsyArray(
                topicDetails.latestOffsetInfos,
            ) ||
            CommonValidationUtils.isFalsyArray(topicDetails.earliestOffsetInfos)
        ) {
            return 0;
        }

        return topicDetails.latestOffsetInfos.reduce(
            (acc, latestOffsetInfo) => {
                const earliestOffsetInfo =
                    topicDetails.earliestOffsetInfos.find(
                        earliestOffsetInfo =>
                            earliestOffsetInfo.partition ===
                            latestOffsetInfo.partition,
                    );

                if (!earliestOffsetInfo) {
                    return acc;
                }

                return (
                    acc + latestOffsetInfo.offset - earliestOffsetInfo.offset
                );
            },
            0,
        );
    }, [topicDetails]);

    const totalSize = useMemo(() => {
        if (
            !topicDetails ||
            CommonValidationUtils.isFalsyArray(topicDetails.partitionsDetails)
        ) {
            return 0;
        }

        return topicDetails.partitionsDetails.reduce((acc, partition) => {
            return acc + partition.size;
        }, 0);
    }, [topicDetails]);

    const totalLag = useMemo(() => {
        if (
            !topicDetails ||
            CommonValidationUtils.isFalsyArray(topicDetails.partitionsDetails)
        ) {
            return 0;
        }

        return topicDetails.partitionsDetails.reduce(
            (acc, partitionDetails) => {
                return acc + partitionDetails.offsetLag;
            },
            0,
        );
    }, [topicDetails]);

    return (
        <Grid className="pb-3">
            <Grid.Col span={12} sm={6} md={3}>
                <CommonCardDetails
                    title="Total Records"
                    content={
                        <Text className="italic">
                            {CommonUtils.beautifyNumber(totalRecords)}
                        </Text>
                    }
                    copyText={totalRecords}
                    isLoading={isGetTopicDetailsPending}
                />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={3}>
                <CommonCardDetails
                    title="Total Size"
                    content={
                        <Text className="italic">
                            {CommonUtils.beautifyBytes(totalSize || 0)}
                        </Text>
                    }
                    copyText={totalSize}
                    isLoading={isGetTopicDetailsPending}
                />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={3}>
                <CommonCardDetails
                    title="Partitions"
                    content={
                        <Text className="italic">
                            {topicDetails?.topicDescription?.partitions?.length}
                        </Text>
                    }
                    copyText={
                        topicDetails?.topicDescription?.partitions?.length
                    }
                    isLoading={isGetTopicDetailsPending}
                />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={3}>
                <CommonCardDetails
                    title="Total Lag"
                    content={
                        <Text className="italic">
                            {CommonUtils.beautifyNumber(totalLag)}
                        </Text>
                    }
                    copyText={totalLag}
                    isLoading={isGetTopicDetailsPending}
                />
            </Grid.Col>
        </Grid>
    );
};

export default TopicDetailsMetadataComponent;
