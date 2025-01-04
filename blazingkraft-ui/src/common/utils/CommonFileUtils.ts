import { CommonValidationUtils } from './CommonValidationUtils';

function getLeafName(fullPath) {
    if (CommonValidationUtils.isFalsyString(fullPath)) {
        return null;
    }
    return fullPath.split('\\').pop().split('/').pop();
}

const CommonFileUtils = {
    getLeafName,
};

export { CommonFileUtils };
