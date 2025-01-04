export interface CommonTableColumn {
    id: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    customOptions?: { label: any; value: any }[];
    loading?: boolean;
}

export interface CommonTableData {
    [key: string]: {
        value: any;
        displayedValue: any;
        isLoading?: boolean;
        isError?: boolean;
        errorMessage?: string;
    };
}

export interface CommonTableFilter {
    id: string;
    value: string;
    type: CommonTableFilterValueType;
}

export type CommonTableFilterValueType =
    | 'CONTAINS'
    | 'STARTS_WITH'
    | 'ENDS_WITH'
    | 'EQUALS_TO';

export type CommonTableFilterType = 'row' | 'menu';

export type CommonTableSortDirection = 'ASC' | 'DESC' | 'NONE';
