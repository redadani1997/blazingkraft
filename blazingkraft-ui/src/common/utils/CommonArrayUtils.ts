function arrayToUniqueArray<T>(array: T[]): T[] {
    return array.filter((topic, index, self) => self.indexOf(topic) === index);
}

const CommonArrayUtils = {
    arrayToUniqueArray,
};

export { CommonArrayUtils };
