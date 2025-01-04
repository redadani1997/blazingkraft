function isTruthy(value: any): boolean {
    return value !== null && value !== undefined;
}

function isFalsy(value: any): boolean {
    return value === null || value === undefined;
}

function isFalsyArray(value: any[]): boolean {
    return value === null || value === undefined || value.length === 0;
}

function isTruthyArray(value: any[]): boolean {
    return value !== null && value !== undefined && value.length > 0;
}

function isFalsyString(value: string): boolean {
    return value === null || value === undefined || value === '';
}

function isTruthyString(value: string): boolean {
    return value !== null && value !== undefined && value !== '';
}

function areAllFalsy(...values): boolean {
    return values.every(isFalsy);
}

function areSomeFalsy(...values): boolean {
    return values.some(isFalsy);
}

const CommonValidationUtils = {
    isTruthy,
    isFalsy,
    isFalsyArray,
    isTruthyArray,
    areAllFalsy,
    areSomeFalsy,
    isFalsyString,
    isTruthyString,
};

export { CommonValidationUtils };
