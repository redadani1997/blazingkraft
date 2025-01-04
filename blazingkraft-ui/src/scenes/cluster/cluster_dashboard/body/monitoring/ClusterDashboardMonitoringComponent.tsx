import { Alert, Anchor, Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { TbAlertCircle } from 'react-icons/tb';
import { IClusterMonitoring } from 'scenes/cluster/redux';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface ClusterDashboardMonitoringComponentProps {
    clusterMonitoring: IClusterMonitoring;
    isMonitorClusterPending: boolean;
}

function renderNotice() {
    return (
        <Alert
            icon={<TbAlertCircle size="1.4rem" />}
            title="Info"
            color="blue"
            className="mb-4"
        >
            <Text>Kafka Cluster Monitoring is still a work in progress.</Text>
            <Text>
                <Anchor
                    size="xs"
                    href="https://docs.confluent.io/platform/current/kafka/monitoring.html#server-metrics"
                    target="_blank"
                >
                    Click here
                </Anchor>{' '}
                <Anchor
                    size="xs"
                    href="https://hevodata.com/learn/kafka-metrics/"
                    target="_blank"
                >
                    and here
                </Anchor>{' '}
                to learn more about Kafka Cluster JMX attributes.
            </Text>
        </Alert>
    );
}

function valueOrUnavailable(value: string) {
    if (CommonValidationUtils.isFalsy(value)) {
        return '---unavailable---';
    }
    return value;
}

const ClusterDashboardMonitoringComponent = ({
    clusterMonitoring,
    isMonitorClusterPending,
}: ClusterDashboardMonitoringComponentProps) => {
    return (
        <div className="flex flex-col">
            {renderNotice()}

            <CommonTabs
                container={{
                    defaultValue: 'Controller & Partitions',
                    className: 'h-full',
                }}
                items={[
                    {
                        label: 'Controller & Partitions',
                        value: 'Controller & Partitions',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="ActiveControllerCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'ActiveControllerCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="UnderReplicatedPartitions"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'UnderReplicatedPartitions'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="OfflinePartitionsCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'OfflinePartitionsCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="LeaderElectionRateAndTimeMsCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'LeaderElectionRateAndTimeMsCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="LeaderElectionRateAndTimeMsMeanRate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'LeaderElectionRateAndTimeMsMeanRate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Server',
                        value: 'Server',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="linux-disk-write-bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'linux-disk-write-bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="linux-disk-read-bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'linux-disk-read-bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="BytesInPerSecCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'BytesInPerSecCount'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="BytesInPerSecMeanRate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'BytesInPerSecMeanRate'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="BytesOutPerSecCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'BytesOutPerSecCount'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="BytesOutPerSecMeanRate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        clusterMonitoring[
                                                            'BytesOutPerSecMeanRate'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalFetchRequestsPerSecCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalFetchRequestsPerSecCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalFetchRequestsPerSecMeanRate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalFetchRequestsPerSecMeanRate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalProduceRequestsPerSecCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalProduceRequestsPerSecCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalProduceRequestsPerSecMeanRate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalProduceRequestsPerSecMeanRate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Network',
                        value: 'Network',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsProduceCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsProduceCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsProduceMean"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsProduceMean'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchMean"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchMean'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchConsumerCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchConsumerCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchConsumerMean"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchConsumerMean'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchFollowerCount"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchFollowerCount'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="TotalTimeMsFetchFollowerMean"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    clusterMonitoring[
                                                        'TotalTimeMsFetchFollowerMean'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorClusterPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default ClusterDashboardMonitoringComponent;
