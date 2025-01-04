import { Alert, Anchor, Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { TbAlertCircle } from 'react-icons/tb';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import { IKsqlDbMonitoring } from 'scenes/ksqldb/redux';

interface KsqlDbDashboardMonitoringComponentProps {
    ksqlDbMonitoring: IKsqlDbMonitoring;
    isMonitorKsqlDbPending: boolean;
}

function renderNotice() {
    return (
        <Alert
            icon={<TbAlertCircle size="1.4rem" />}
            title="Info"
            color="blue"
            className="mb-4"
        >
            <Text>KsqlDb Monitoring is still a work in progress.</Text>
            <Text>
                <Anchor
                    size="xs"
                    href="https://docs.ksqldb.io/en/latest/reference/metrics/"
                    target="_blank"
                >
                    Click here
                </Anchor>{' '}
                to learn more about KsqlDb JMX attributes.
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

const KsqlDbDashboardMonitoringComponent = ({
    ksqlDbMonitoring,
    isMonitorKsqlDbPending,
}: KsqlDbDashboardMonitoringComponentProps) => {
    return (
        <div className="flex flex-col">
            {renderNotice()}

            <CommonTabs
                container={{
                    defaultValue: 'Node Utilization',
                    className: 'h-full',
                }}
                items={[
                    {
                        label: 'Node Utilization',
                        value: 'Node Utilization',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="node_storage_total_bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        ksqlDbMonitoring[
                                                            'node_storage_total_bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="node_storage_free_bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        ksqlDbMonitoring[
                                                            'node_storage_free_bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="node_storage_used_bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        ksqlDbMonitoring[
                                                            'node_storage_used_bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="storage_utilization"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.percentage(
                                                        ksqlDbMonitoring[
                                                            'storage_utilization'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="num_stateful_tasks"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'num_stateful_tasks'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Common',
                        value: 'Common',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="bytes-consumed-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        ksqlDbMonitoring[
                                                            'bytes-consumed-total'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-consumed-min"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-consumed-min'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-consumed-max"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-consumed-max'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-consumed-avg"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-consumed-avg'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-consumed-per-sec"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-consumed-per-sec'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-produced-per-sec"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-produced-per-sec'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="error-rate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'error-rate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Consumer',
                        value: 'Consumer',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="consumer-total-messages"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'consumer-total-messages'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="consumer-messages-per-sec"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'consumer-messages-per-sec'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="consumer-total-bytes"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    CommonUtils.beautifyBytes(
                                                        ksqlDbMonitoring[
                                                            'consumer-total-bytes'
                                                        ],
                                                    ),
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Producer',
                        value: 'Producer',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="total-messages"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'total-messages'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="messages-per-sec"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'messages-per-sec'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                            </Grid>
                        ),
                    },
                    {
                        label: 'Pull Query',
                        value: 'Pull Query',
                        children: (
                            <Grid className="">
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="pull-query-requests-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'pull-query-requests-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="pull-query-requests-rate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'pull-query-requests-rate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="pull-query-requests-error-total"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'pull-query-requests-error-total'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12} sm={6} lg={4} xl={3}>
                                    <CommonCardDetails
                                        title="pull-query-requests-error-rate"
                                        content={
                                            <Text className="italic">
                                                {valueOrUnavailable(
                                                    ksqlDbMonitoring[
                                                        'pull-query-requests-error-rate'
                                                    ],
                                                )}
                                            </Text>
                                        }
                                        isLoading={isMonitorKsqlDbPending}
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

export default KsqlDbDashboardMonitoringComponent;
