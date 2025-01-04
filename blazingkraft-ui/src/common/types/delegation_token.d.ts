export interface KafkaPrincipal {
    principalType: string;
    principalName: string;
    tokenAuthenticated: boolean;
}

export interface DelegationTokenInformation {
    owner: KafkaPrincipal;
    tokenRequester: KafkaPrincipal;
    renewers: KafkaPrincipal[];
    issueTimestamp: number;
    expiryTimestamp: number;
    maxTimestamp: number;
    tokenId: string;
}

export interface DelegationToken {
    hmac: string;
    tokenInformation: DelegationTokenInformation;
}
