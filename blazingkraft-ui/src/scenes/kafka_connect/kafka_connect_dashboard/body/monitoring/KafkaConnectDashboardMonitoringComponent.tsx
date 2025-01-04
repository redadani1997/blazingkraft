import { Alert, Anchor, Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { TbAlertCircle } from 'react-icons/tb';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { IKafkaConnectMonitoring } from 'scenes/kafka_connect/redux';

interface KafkaConnectDashboardMonitoringComponentProps {
    kafkaConnectMonitoring: IKafkaConnectMonitoring;
    isMonitorKafkaConnectPending: boolean;
}

function renderNotice() {
    return (
        <Alert
            icon={<TbAlertCircle size="1.4rem" />}
            title="Info"
            color="blue"
            className="mb-4"
        >
            <Text>Kafka Connect Monitoring is still a work in progress.</Text>
            <Text>
                <Anchor
                    size="xs"
                    href="https://docs.confluent.io/platform/current/connect/monitoring.html#use-jmx-to-monitor-kconnect"
                    target="_blank"
                >
                    Click here
                </Anchor>{' '}
                to learn more about Kafka Connect JMX attributes.
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

const KafkaConnectDashboardMonitoringComponent = ({
    kafkaConnectMonitoring,
    isMonitorKafkaConnectPending,
}: KafkaConnectDashboardMonitoringComponentProps) => {
    return (
        <div className="flex flex-col">
            {renderNotice()}

            <CommonTabs
                container={{
                    defaultValue: 'Connectors',
                    className: 'h-full',
                }}
                items={[
                    {
                        label: 'Connectors',
                        value: 'Connectors',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-count"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'connector-count'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-startup-attempts-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'connector-startup-attempts-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-startup-failure-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'connector-startup-failure-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-startup-failure-percentage"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.percentage(
                                                        kafkaConnectMonitoring[
                                                            'connector-startup-failure-percentage'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-startup-success-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'connector-startup-success-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="connector-startup-success-percentage"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.percentage(
                                                        kafkaConnectMonitoring[
                                                            'connector-startup-success-percentage'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Tasks',
                        value: 'Tasks',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-count"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'task-count'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-startup-attempts-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'task-startup-attempts-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-startup-failure-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'task-startup-failure-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-startup-failure-percentage"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.percentage(
                                                        kafkaConnectMonitoring[
                                                            'task-startup-failure-percentage'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-startup-success-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    kafkaConnectMonitoring[
                                                        'task-startup-success-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={4}>
                                    <CommonCardDetails
                                        title="task-startup-success-percentage"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.percentage(
                                                        kafkaConnectMonitoring[
                                                            'task-startup-success-percentage'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKafkaConnectPending}
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

export default KafkaConnectDashboardMonitoringComponent;
