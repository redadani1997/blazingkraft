import { Alert, Button, Grid, Text } from '@mantine/core';
import { useState } from 'react';
import { BiImport } from 'react-icons/bi';
import { TbAlertCircle, TbX } from 'react-icons/tb';
import CommonDropzone from 'scenes/common/dropzone/CommonDropzone';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ProducerImportRecordsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    importBlazingRecords: (
        jsonFile: any,
        failFast: boolean,
        async: boolean,
    ) => Promise<any>;
    isImportBlazingRecordsPending: boolean;
}

function renderModalBody(
    jsonFile: File,
    setJsonFile: (File) => void,
    failFast,
    setFailFast,
    async,
    setAsync,
) {
    return (
        <div className="flex flex-col">
            <CommonDropzone
                onDrop={file => {
                    setJsonFile(file);
                }}
                droppedFile={jsonFile}
                acceptedFiles={['application/json']}
                title="Drag JSON file here or click to select from file system"
            />
            <Grid className="mt-2">
                <Grid.Col span={12} md={6}>
                    <CommonCheckbox
                        onChange={() => setAsync(!async)}
                        checked={async}
                        label="Run Aync"
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                    <CommonCheckbox
                        onChange={() => setFailFast(!failFast)}
                        checked={failFast}
                        label="Fail Fast"
                    />
                </Grid.Col>
            </Grid>
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Confirmation"
                color="blue"
                className="mt-4"
            >
                <Text className="pb-2">
                    * Choose whether to produce all records or fail the import
                    as soon as the first error occurs.
                </Text>

                <Text className="pb-2">
                    * Choose whether to wait for all the records to be imported
                    or send them asynchronously.
                </Text>
                <Text>* Please confirm Blazing Records Import.</Text>
            </Alert>
        </div>
    );
}

function renderModalFooter(setIsModalOpen, action, jsonFile) {
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
                disabled={!jsonFile}
            >
                Import
            </Button>
        </div>
    );
}

function ProducerImportRecordsComponent({
    setIsModalOpen,
    isModalOpen,
    isImportBlazingRecordsPending,
    importBlazingRecords,
}: ProducerImportRecordsComponentProps) {
    const [jsonFile, setJsonFile] = useState<File>(null);
    const [failFast, setFailFast] = useState<boolean>(false);
    const [async, setAsync] = useState<boolean>(false);

    const action = () => importBlazingRecords(jsonFile, failFast, async);

    const modalBody = renderModalBody(
        jsonFile,
        setJsonFile,
        failFast,
        setFailFast,
        async,
        setAsync,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action, jsonFile);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Import Blazing Records</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isImportBlazingRecordsPending}
        />
    );
}

export default ProducerImportRecordsComponent;
