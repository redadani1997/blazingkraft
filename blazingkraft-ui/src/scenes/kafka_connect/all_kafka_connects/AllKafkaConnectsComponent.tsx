import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteKafkaConnect from '../delete_kafka_connect/DeleteKafkaConnect';
import AllKafkaConnectsBody from './body/AllKafkaConnectsBody';
import AllKafkaConnectsHeader from './header/AllKafkaConnectsHeader';

interface AllKafkaConnectsComponentProps {
    refreshPageContent: () => void;
}

function AllKafkaConnectsComponent({
    refreshPageContent,
}: AllKafkaConnectsComponentProps) {
    const [kafkaConnectToDelete, setKafkaConnectToDelete] = useState<
        string | null
    >(null);
    const [isDeleteKafkaConnectModalOpen, setIsDeleteKafkaConnectModalOpen] =
        useState(false);
    return (
        <>
            <AllKafkaConnectsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKafkaConnectsBody
                    setKafkaConnectToDelete={setKafkaConnectToDelete}
                    setIsDeleteKafkaConnectModalOpen={
                        setIsDeleteKafkaConnectModalOpen
                    }
                />
            </CommonBody>
            <DeleteKafkaConnect
                kafkaConnectToDelete={kafkaConnectToDelete}
                isModalOpen={isDeleteKafkaConnectModalOpen}
                setIsModalOpen={setIsDeleteKafkaConnectModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllKafkaConnectsComponent;
