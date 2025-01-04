import { Alert, Button, Text } from '@mantine/core';
import { BiExport } from 'react-icons/bi';
import { TbAlertCircle, TbX } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';

interface ExportClusterComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    exportCluster: () => Promise<any>;
    isExportClusterPending: boolean;
    clusterToExport: string;
}

function renderModalBody() {
    return (
        <>
            <Alert
                icon={<TbAlertCircle size={16} />}
                title="Confirmation"
                color="blue"
            >
                <Text>Please confirm Cluster Export.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action) {
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
                leftIcon={<BiExport size="1rem" />}
                onClick={() => action()}
            >
                Export
            </Button>
        </div>
    );
}

function ExportClusterComponent({
    setIsModalOpen,
    isModalOpen,
    isExportClusterPending,
    clusterToExport,
    exportCluster,
}: ExportClusterComponentProps) {
    const action = () => exportCluster();

    const modalBody = renderModalBody();
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Export Cluster</Text>
                    <Text color="dimmed" size="xs">
                        {clusterToExport}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isExportClusterPending}
        />
    );
}

export default ExportClusterComponent;
