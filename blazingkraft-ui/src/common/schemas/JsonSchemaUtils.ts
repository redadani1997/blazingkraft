const parseStringToJson = (jsonString: string): JSON => {
    try {
        return JSON.parse(jsonString);
    } catch (err) {
        // try to throw a more detailed error message using validate
        // validateString(jsonString);
        // rethrow the original error
        return null;
    }
};
const JsonSchemaUtils = {
    parseStringToJson,
};

export { JsonSchemaUtils };
