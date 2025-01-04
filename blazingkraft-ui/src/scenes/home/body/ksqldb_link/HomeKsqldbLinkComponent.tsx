import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { BsDatabase } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function HomeKsqldbLinkComponent() {
    return (
        <Grid.Col span={12} xs={6} sm={4} md={3} lg={2}>
            <div className="flex items-center justify-center w-full h-full">
                <Tooltip label="KsqlDbs">
                    <ActionIcon
                        className="p-4"
                        component={Link}
                        to="/ksqldbs"
                        color="blue"
                        size="10rem"
                    >
                        <BsDatabase size="10rem" />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Grid.Col>
    );
}

export default React.memo(HomeKsqldbLinkComponent);
