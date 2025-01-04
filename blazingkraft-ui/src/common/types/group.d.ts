export interface GroupMeta {
    code: string;
    name: string;
    description: string;
    numberOfUsers: number;
    numberOfPermissions: number;
}

export interface GroupDetails {
    code: string;
    name: string;
    description: string;
    usersMeta: GroupUserMeta[];
    clusterPermissions: Map<string, string[]>;
    kafkaConnectPermissions: Map<string, string[]>;
    schemaRegistryPermissions: Map<string, string[]>;
    ksqlDbPermissions: Map<string, string[]>;
    managementPermissions: string[];
    playgroundPermissions: string[];
}

export interface GroupUserMeta {
    email: string;
    createdBy: string;
    updatedBy: string;
    creationTime: number;
    updateTime: number;
}
