import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { TbPlugConnected } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function HomeKafkaConnectLinkComponent() {
    return (
        <Grid.Col span={12} xs={6} sm={4} md={3} lg={2}>
            <div className="flex items-center justify-center w-full h-full">
                <Tooltip label="Kafka Connects">
                    <ActionIcon
                        className="p-4"
                        component={Link}
                        to="/kafka_connects"
                        color="blue"
                        size="10rem"
                    >
                        <TbPlugConnected size="10rem" />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Grid.Col>
    );
}

export default React.memo(HomeKafkaConnectLinkComponent);
