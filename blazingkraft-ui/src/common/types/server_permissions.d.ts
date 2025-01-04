export interface ICommonPermissions {
    clusterPermissions: Map<string, string[]>;
    kafkaConnectPermissions: Map<string, string[]>;
    schemaRegistryPermissions: Map<string, string[]>;
    ksqlDbPermissions: Map<string, string[]>;
    managementPermissions: string[];
    playgroundPermissions: string[];
}
