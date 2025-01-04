import { FilesPermissions } from 'common/permissions/management/FilesPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import filesActions from '../redux/actions';
import FilesManagementModalComponent from './FilesManagementModalComponent';

interface FilesManagementModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    value: string;
    setValue: (value: string) => void;
}

const FilesManagementModal = (props: FilesManagementModalProps) => {
    // Map State To Props
    const {
        files,
        isCreateFilePending,
        isDeleteFilePending,
        isGetFilesPending,
    } = useSelector((store: ReduxStore) => {
        return {
            files: store.filesReducer.files,
            isCreateFilePending: store.filesReducer.isCreateFilePending,
            isDeleteFilePending: store.filesReducer.isDeleteFilePending,
            isGetFilesPending: store.filesReducer.isGetFilesPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getFiles = () => dispatch(filesActions.getFiles());

    const createFile = request =>
        dispatch(filesActions.createFile(request)).then(() => {
            getFiles();
        });

    const deleteFile = path =>
        dispatch(filesActions.deleteFile(path)).then(() => {
            getFiles();
        });

    const { isAuthorized: isAuthorizedCreateFile } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: FilesPermissions.FILES_PERMISSIONS.CREATE_FILE,
            },
        ],
    });

    const { isAuthorized: isAuthorizedDeleteFile } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: FilesPermissions.FILES_PERMISSIONS.DELETE_FILE,
            },
        ],
    });

    return (
        <>
            <FilesManagementModalComponent
                {...props}
                files={files}
                isAuthorizedCreateFile={isAuthorizedCreateFile}
                isAuthorizedDeleteFile={isAuthorizedDeleteFile}
                isCreateFilePending={isCreateFilePending}
                isDeleteFilePending={isDeleteFilePending}
                isGetFilesPending={isGetFilesPending}
                createFile={createFile}
                deleteFile={deleteFile}
            />
        </>
    );
};

export default FilesManagementModal;
