import { Alert, Button, Text } from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';
import { BiImport } from 'react-icons/bi';
import { TbAlertCircle, TbX } from 'react-icons/tb';
import CommonDropzone from 'scenes/common/dropzone/CommonDropzone';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ImportClusterComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    importCluster: (zipFile) => Promise<any>;
    isImportClusterPending: boolean;
}

function renderModalBody(zipFile: File, setZipFile: (File) => void) {
    return (
        <div className="flex flex-col">
            <CommonDropzone
                onDrop={file => {
                    setZipFile(file);
                }}
                droppedFile={zipFile}
                acceptedFiles={[MIME_TYPES.zip]}
                title="Drag Zip file here or click to select from file system"
            />
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Confirmation"
                color="blue"
                className="mt-4"
            >
                <Text>Please confirm Cluster Import.</Text>
            </Alert>
        </div>
    );
}

function renderModalFooter(setIsModalOpen, action, zipFile) {
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
            <Button
                color="blue"
                leftIcon={<BiImport size="1rem" />}
                onClick={() => action()}
                disabled={!zipFile}
            >
                Import
            </Button>
        </div>
    );
}

function ImportClusterComponent({
    setIsModalOpen,
    isModalOpen,
    isImportClusterPending,
    importCluster,
}: ImportClusterComponentProps) {
    const [zipFile, setZipFile] = useState<File>(null);

    const action = () => importCluster(zipFile);

    const modalBody = renderModalBody(zipFile, setZipFile);
    const modalFooter = renderModalFooter(setIsModalOpen, action, zipFile);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Import Cluster</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isImportClusterPending}
        />
    );
}

export default ImportClusterComponent;
