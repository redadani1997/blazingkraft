import { AxiosError } from 'axios';
import byteSize from 'byte-size';
import prettyMilliseconds from 'pretty-ms';

function getRestErrorMessage(error: AxiosError<any, any> | undefined) {
    if (!error) {
        return undefined;
    }
    return error.response?.data?.message || error.message;
}

function beautifyJsonString(string): string {
    if (!string) return string;
    try {
        const json = JSON.parse(string);
        return JSON.stringify(json, null, 2);
    } catch (err) {
        return string;
    }
}

function beautifyJson(json): string {
    try {
        return JSON.stringify(json, null, 2);
    } catch (err) {
        return String(json);
    }
}

function mapToString(map): string {
    return beautifyJson(mapToObject(map));
}

function beautifyBytes(bytes) {
    if (bytes === undefined || bytes === null) {
        return undefined;
    }
    return byteSize(bytes).toString();
}

function percentage(num) {
    if (num === undefined || num === null) {
        return undefined;
    }
    const numb = Number(num);
    if (Number.isNaN(numb)) {
        return undefined;
    }
    return `${(numb * 100).toFixed(2)}%`;
}

function beautifyMilliseconds(milliseconds, unitCount = 2) {
    if (!Number.isFinite(Number(milliseconds))) {
        return undefined;
    }
    return prettyMilliseconds(Number(milliseconds), { unitCount });
}

function beautifySeconds(seconds) {
    if (!Number.isFinite(Number(seconds * 1000))) {
        return undefined;
    }
    return prettyMilliseconds(Number(seconds * 1000), { unitCount: 2 });
}

function objectToMap(obj): Map<string, any> {
    return new Map(Object.entries(obj || {}));
}

function mapToObject(map) {
    return Object.fromEntries(map || new Map());
}

function mapToArray<K, V>(map: Map<K, V>): { key: K; value: V }[] {
    if (!map) {
        return [];
    }
    return [...map.entries()].map(([key, value]) => ({ key, value }));
}

function stringToObject(string) {
    try {
        return JSON.parse(string);
    } catch (err) {
        return null;
    }
}

function getNextId(arr: any[] | undefined | null) {
    if (!arr) return 0;
    return arr.length > 0 ? Math.max(...arr.map(ele => ele.lineId)) + 1 : 0;
}

function toNonNullValuesMap(map: Map<string, any>) {
    if (!map) return new Map();
    const nonNullValuesMap = new Map();
    map.forEach((value, key) => {
        if (value !== null) {
            nonNullValuesMap.set(key, value);
        }
    });
    return nonNullValuesMap;
}

function beautifyNumber(number) {
    if (!Number.isFinite(Number(number))) {
        return number;
    }
    return Number(number).toLocaleString();
}

const CommonUtils = {
    getRestErrorMessage,
    beautifyJsonString,
    beautifyJson,
    beautifyBytes,
    beautifyMilliseconds,
    objectToMap,
    mapToObject,
    mapToString,
    mapToArray,
    beautifySeconds,
    stringToObject,
    getNextId,
    toNonNullValuesMap,
    percentage,
    beautifyNumber,
};

export { CommonUtils };
