import {
    ActionIcon,
    Alert,
    Button,
    Checkbox,
    FileButton,
    Grid,
    Menu,
    Text,
} from '@mantine/core';
import { CommonFileUtils } from 'common/utils/CommonFileUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useRef } from 'react';
import { TbAlertCircle, TbFileUpload, TbTrash, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import { IFile } from '../redux';
import { IFilesCreateRequest } from '../redux/actions';

interface FilesManagementModalComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    value: string;
    setValue: (value: string) => void;
    files: IFile[];
    isAuthorizedCreateFile: boolean;
    isAuthorizedDeleteFile: boolean;
    isCreateFilePending: boolean;
    isDeleteFilePending: boolean;
    isGetFilesPending: boolean;
    createFile: (request: IFilesCreateRequest) => Promise<void>;
    deleteFile: (path: string) => Promise<void>;
}

function renderModalBody(
    files: IFile[],
    deleteFile,
    value,
    setValue,
    setIsModalOpen,
    isAuthorizedDeleteFile,
) {
    if (CommonValidationUtils.isFalsyArray(files)) {
        return (
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
                className="mb-4"
            >
                <Text>
                    No Files Found. Please upload a new file to use it as a
                    configuration location.
                </Text>
            </Alert>
        );
    }
    return files.map((file: IFile) => (
        <Grid key={file.path} className="pb-3 flex items-center">
            <Grid.Col span={9} className="flex items-center">
                <Checkbox
                    label={CommonFileUtils.getLeafName(file.path)}
                    checked={file.path === value}
                    onChange={e => {
                        if (e.target.checked) {
                            setValue(file.path);
                            setIsModalOpen(false);
                        } else {
                            setValue(null);
                        }
                    }}
                />
            </Grid.Col>
            {isAuthorizedDeleteFile && (
                <Grid.Col span={3} className="flex justify-end">
                    <Menu shadow="md" width={280}>
                        <Menu.Target>
                            <ActionIcon color="red" className="ml-3">
                                <TbTrash size="1.2rem" />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Danger Zone</Menu.Label>
                            <Menu.Item
                                color="red"
                                icon={<TbTrash size="1rem" />}
                                onClick={() => {
                                    deleteFile(file.path);
                                }}
                            >
                                Delete File
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            )}
        </Grid>
    ));
}

function renderModalFooter(
    setIsModalOpen,
    createFile,
    resetFileRef,
    isAuthorizedCreateFile,
) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            {isAuthorizedCreateFile && (
                <FileButton
                    resetRef={resetFileRef}
                    onChange={(file: File) =>
                        createFile({ file }).finally(() =>
                            resetFileRef?.current?.(),
                        )
                    }
                >
                    {props => (
                        <Button
                            {...props}
                            color="blue"
                            leftIcon={<TbFileUpload size="1.2rem" />}
                        >
                            Upload New File
                        </Button>
                    )}
                </FileButton>
            )}
        </div>
    );
}

function FilesManagementModalComponent({
    isModalOpen,
    setIsModalOpen,
    createFile,
    deleteFile,
    isCreateFilePending,
    isDeleteFilePending,
    isGetFilesPending,
    isAuthorizedCreateFile,
    isAuthorizedDeleteFile,
    files,
    value,
    setValue,
}: FilesManagementModalComponentProps) {
    const resetFileRef = useRef<() => void>(null);

    const modalBody = renderModalBody(
        files,
        deleteFile,
        value,
        setValue,
        setIsModalOpen,
        isAuthorizedDeleteFile,
    );
    const modalFooter = renderModalFooter(
        setIsModalOpen,
        createFile,
        resetFileRef,
        isAuthorizedCreateFile,
    );
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Files Management</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={
                isCreateFilePending || isDeleteFilePending || isGetFilesPending
            }
        />
    );
}

export default FilesManagementModalComponent;
