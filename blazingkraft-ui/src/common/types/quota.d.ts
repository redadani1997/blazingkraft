export interface QuotaEntity {
    entityType: string;
    entityName: string;
}

export interface QuotaOperation {
    key: string;
    value: string | null;
}

export interface QuotaEntry {
    entities: QuotaEntity[];
    quotas: QuotaOperation[];
}
