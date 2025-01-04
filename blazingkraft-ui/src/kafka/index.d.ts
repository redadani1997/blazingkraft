import React from 'react';

type ConfigurationDataTypesType =
    | 'LIST'
    | 'INT'
    | 'PASSWORD'
    | 'STRING'
    | 'LONG'
    | 'CLASS'
    | 'DOUBLE'
    | 'BOOLEAN'
    | 'SHORT';
type ConfigurationImportanceType = 'HIGH' | 'MEDIUM' | 'LOW';
type ConfigurationOptionType = {
    label: string;
    value: string;
};
type ConfigurationNumericUnit =
    | 'BYTES'
    | 'SECONDS'
    | 'MILLISECONDS'
    | undefined;

export type KafkaConfiguration = {
    displayedName: string;
    name: string;
    documentation: React.ReactNode;
    type: ConfigurationDataTypesType;
    required: boolean;
    overriddenDefault?: boolean;
    default?: any;
    displayedDefault?: any;
    validValues: string;
    documentationProps: React.ReactNode;
    importance: ConfigurationImportanceType;
    validate: (target: any) => boolean;
    errorMessage: string;
    isSelectable: boolean;
    disabledForever: boolean;
    disabled?: boolean;
    disabledMessage?: string;
    options?: ConfigurationOptionType[];
    proTip?: React.ReactNode;
    numericUnit?: ConfigurationNumericUnit;
    group?: string;
    order?: number;
    orderInGroup?: number;
    width?: string;
    dependents?: string[];
    isFileConfig?: boolean;
    readOnly?: boolean;
    sensitive?: boolean;
    source?: string;
};
