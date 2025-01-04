import { ActionIcon, Alert, Grid, Text, Tooltip } from '@mantine/core';
import { ConnectorStateInfo } from 'common/types/connector';
import { useState } from 'react';
import { TbAlertTriangle, TbEyeCheck, TbEyeOff } from 'react-icons/tb';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ConsumerGroupMetadataComponentProps {
    connectorStateInfo: ConnectorStateInfo;
    isGetConnectorStateInfoPending: boolean;
}

const ConsumerGroupMetadataComponent = ({
    connectorStateInfo,
    isGetConnectorStateInfoPending,
}: ConsumerGroupMetadataComponentProps) => {
    const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
    return (
        <>
            <Grid className="pb-4">
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Type"
                        content={
                            <Text className="italic">
                                {connectorStateInfo?.type}
                            </Text>
                        }
                        copyText={connectorStateInfo?.type}
                        isLoading={isGetConnectorStateInfoPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="State"
                        content={
                            <Text className="italic">
                                {connectorStateInfo?.connector?.state}
                            </Text>
                        }
                        copyText={connectorStateInfo?.connector?.state}
                        isLoading={isGetConnectorStateInfoPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Woker Id"
                        content={
                            <Text className="italic">
                                {connectorStateInfo?.connector?.worker_id}
                            </Text>
                        }
                        copyText={connectorStateInfo?.connector?.worker_id}
                        isLoading={isGetConnectorStateInfoPending}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                    <CommonCardDetails
                        title="Trace"
                        content={
                            <div className="flex items-center">
                                <Text className="italic">
                                    {connectorStateInfo?.connector?.trace
                                        ? 'Available'
                                        : '---unavailable---'}
                                </Text>
                                <Tooltip label="Trace Details">
                                    <ActionIcon
                                        color="blue"
                                        onClick={() => {
                                            setIsTraceModalOpen(true);
                                        }}
                                        className="ml-3"
                                        disabled={
                                            !connectorStateInfo?.connector
                                                ?.trace
                                        }
                                    >
                                        {connectorStateInfo?.connector
                                            ?.trace ? (
                                            <TbEyeCheck size="1.4rem" />
                                        ) : (
                                            <TbEyeOff size="1.4rem" />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        }
                        copyText={
                            connectorStateInfo?.connector?.trace || undefined
                        }
                        isLoading={isGetConnectorStateInfoPending}
                    />
                </Grid.Col>
            </Grid>
            <CommonModal
                isOpen={isTraceModalOpen}
                modalBody={
                    <Alert
                        icon={<TbAlertTriangle size="1.4rem" />}
                        title="Trace"
                        color="lime"
                        className="mb-1 break-all"
                    >
                        <Text>{connectorStateInfo?.connector?.trace}</Text>
                    </Alert>
                }
                modalTitle={
                    <div className="flex items-center">
                        <Text className="pr-2">Connector Trace Details</Text>
                    </div>
                }
                onClose={() => setIsTraceModalOpen(false)}
            />
        </>
    );
};

export default ConsumerGroupMetadataComponent;
