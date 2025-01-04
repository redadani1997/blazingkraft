import type { SpotlightAction } from '@mantine/spotlight';
import { SpotlightProvider } from '@mantine/spotlight';
import { useMemo } from 'react';
import { TbSearch } from 'react-icons/tb';
import UseSpotlightClusterActions from './cluster/UseSpotlighClusterActions';
import UseSpotlightKafkaConnectActions from './kafka_connect/UseSpotlightKafkaConnectActions';
import UseSpotlightKsqlDbActions from './ksqldb/UseSpotlighKsqlDbActions';
import UseSpotlightManagementActions from './management/UseSpotlightManagementActions';
import UseSpotlightPlaygroundActions from './playground/UseSpotlightPlaygroundActions';
import UseSpotlightSchemaRegistryActions from './schema_registry/UseSpotlighSchemaRegistryActions';
interface WithCommonSpotlightComponentProps {
    children: React.ReactNode;
}

function WithCommonSpotlightComponent({
    children,
}: WithCommonSpotlightComponentProps) {
    const managementActions: SpotlightAction[] =
        UseSpotlightManagementActions();
    const playgroundActions: SpotlightAction[] =
        UseSpotlightPlaygroundActions();
    const kafkaConnectActions: SpotlightAction[] =
        UseSpotlightKafkaConnectActions();
    const ksqlDbActions: SpotlightAction[] = UseSpotlightKsqlDbActions();
    UseSpotlightKafkaConnectActions();
    const schemaRegistryActions: SpotlightAction[] =
        UseSpotlightSchemaRegistryActions();
    const clusterActions: SpotlightAction[] = UseSpotlightClusterActions();

    const actions: SpotlightAction[] = useMemo(() => {
        return [
            ...managementActions,
            ...clusterActions,
            ...kafkaConnectActions,
            ...schemaRegistryActions,
            ...ksqlDbActions,
            ...playgroundActions,
        ];
    }, [
        managementActions,
        clusterActions,
        kafkaConnectActions,
        schemaRegistryActions,
        ksqlDbActions,
        playgroundActions,
    ]);

    return (
        <SpotlightProvider
            actions={actions}
            searchIcon={<TbSearch size="1.2rem" />}
            searchPlaceholder="Search for Action..."
            shortcut="mod + /"
            nothingFoundMessage="No results found..."
            limit={20}
        >
            {children}
        </SpotlightProvider>
    );
}

export default WithCommonSpotlightComponent;
