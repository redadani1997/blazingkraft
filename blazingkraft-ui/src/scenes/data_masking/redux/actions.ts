import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import dataMaskingTypes from './types';

export interface IDataMaskingRequest {
    name: string;
    code: string;
    dataMaskingType: string;
    rule: string;
    ruleType: string;
    result: string;
    topicType: string;
    topic: string;
}

function createDataMasking(request: IDataMaskingRequest) {
    return {
        type: dataMaskingTypes.CREATE_DATA_MASKING,
        payload: POST('/management/data-maskings', request),
        meta: {
            dataMaskingCode: request.code,
            context: 'Data Masking Creation',
        },
    };
}

function getAllDataMaskings() {
    return {
        type: dataMaskingTypes.GET_ALL_DATA_MASKINGS,
        payload: GET('/management/data-maskings'),
        meta: { context: 'Data Masking' },
    };
}

function deleteDataMasking(dataMaskingCode) {
    return {
        type: dataMaskingTypes.DELETE_DATA_MASKING,
        payload: DELETE(`/management/data-maskings/${dataMaskingCode}`),
        meta: { context: 'Data Masking Deletion', dataMaskingCode },
    };
}

function editDataMasking(code, request: IDataMaskingRequest) {
    return {
        type: dataMaskingTypes.EDIT_DATA_MASKING,
        payload: PUT(`/management/data-maskings/${code}`, request),
        meta: { dataMaskingCode: code, context: 'Data Masking Edit' },
    };
}

const dataMaskingActions = {
    createDataMasking,
    getAllDataMaskings,
    deleteDataMasking,
    editDataMasking,
};

export default dataMaskingActions;
