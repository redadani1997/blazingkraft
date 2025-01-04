import { Grid } from '@mantine/core';
import HomeClusterLink from './cluster_link/HomeClusterLink';
import HomeKafkaConnectLink from './kafka_connect_link/HomeKafkaConnectLink';
import HomeKsqldbLink from './ksqldb_link/HomeKsqldbLink';
import HomeManagementLink from './management_link/HomeManagementLink';
import HomePlaygroundLink from './playground_link/HomePlaygroundLink';
import HomeSchemaRegistryLink from './schema_registry_link/HomeSchemaRegistryLink';

function HomeBodyComponent() {
    return (
        <Grid className="w-full h-full flex items-center justify-center">
            <HomeManagementLink />
            <HomeClusterLink />
            <HomeKafkaConnectLink />
            <HomeSchemaRegistryLink />
            <HomeKsqldbLink />
            <HomePlaygroundLink />
        </Grid>
    );
}

export default HomeBodyComponent;
