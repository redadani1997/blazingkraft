export interface IFile {
    path: string;
}

export type FilesReducerState = {
    isGetFilesPending: boolean;
    isCreateFilePending: boolean;
    isDeleteFilePending: boolean;
    files: IFile[];
};
