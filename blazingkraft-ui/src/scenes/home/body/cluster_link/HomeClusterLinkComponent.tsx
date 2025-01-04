import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { SiApachekafka } from 'react-icons/si';
import { Link } from 'react-router-dom';

function HomeClusterLinkComponent() {
    return (
        <Grid.Col span={12} xs={6} sm={4} md={3} lg={2}>
            <div className="flex items-center justify-center w-full h-full">
                <Tooltip label="Clusters">
                    <ActionIcon
                        className="p-4"
                        component={Link}
                        to="/clusters"
                        color="blue"
                        size="10rem"
                    >
                        <SiApachekafka size="10rem" />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Grid.Col>
    );
}

export default React.memo(HomeClusterLinkComponent);
