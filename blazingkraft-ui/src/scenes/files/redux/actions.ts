import { GET, POST, POST_FORM } from 'rest/RestCalls';
import filesTypes from './types';

export interface IFilesCreateRequest {
    file: File;
}

function getFiles() {
    return {
        type: filesTypes.GET_FILES,
        payload: GET(`/files`),
        meta: { context: 'Files' },
    };
}

function createFile(request: IFilesCreateRequest) {
    return {
        type: filesTypes.CREATE_FILE,
        payload: POST_FORM(`/files`, request),
        meta: { context: 'Files' },
    };
}

function deleteFile(path: string) {
    return {
        type: filesTypes.DELETE_FILE,
        payload: POST(`/files/delete`, { filePath: path }),
        meta: { context: 'Files', path },
    };
}

const filesActions = {
    getFiles,
    createFile,
    deleteFile,
};

export default filesActions;
