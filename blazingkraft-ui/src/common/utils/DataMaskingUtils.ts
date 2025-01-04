const RESULTS_OPTIONS = [
    {
        label: 'Stars (****)',
        value: 'STAR',
    },
    {
        label: 'Dashes (----)',
        value: 'DASH',
    },
    {
        label: 'Remove',
        value: 'REMOVE',
    },
    {
        label: 'Blazing Label (---Blazing Mask---)',
        value: 'BLAZING_LABEL',
    },
];

function getResultLabelByResult(value: string): string {
    const option = RESULTS_OPTIONS.find(option => option.value === value);
    return option ? option.label : undefined;
}

const TOPIC_TYPES_OPTIONS = [
    {
        label: 'Equals',
        value: 'EQUALS',
    },
    {
        label: 'Regex',
        value: 'REGEX',
    },
];

function getTopicTypeLabelByTopicType(value: string): string {
    const option = TOPIC_TYPES_OPTIONS.find(option => option.value === value);
    return option ? option.label : undefined;
}

const MASKING_TYPES_OPTIONS = [
    {
        label: 'Consumer Key',
        value: 'CONSUMER_KEY',
    },
    {
        label: 'Consumer Value',
        value: 'CONSUMER_VALUE',
    },
    {
        label: 'KsqlDb Query',
        value: 'KSQLDB_QUERY',
    },
];

function getMaskingTypeLabelByMaskingType(value: string): string {
    const option = MASKING_TYPES_OPTIONS.find(option => option.value === value);
    return option ? option.label : undefined;
}

const RULE_TYPES_OPTIONS = [
    {
        label: 'Attribute Equals',
        value: 'ATTRIBUTE_EQUALS',
    },
];

function getRuleTypeLabelByRuleType(value: string): string {
    const option = RULE_TYPES_OPTIONS.find(option => option.value === value);
    return option ? option.label : undefined;
}

const DataMaskingUtils = {
    RESULTS_OPTIONS,
    getResultLabelByResult,
    TOPIC_TYPES_OPTIONS,
    getTopicTypeLabelByTopicType,
    MASKING_TYPES_OPTIONS,
    getMaskingTypeLabelByMaskingType,
    RULE_TYPES_OPTIONS,
    getRuleTypeLabelByRuleType,
};

export { DataMaskingUtils };
