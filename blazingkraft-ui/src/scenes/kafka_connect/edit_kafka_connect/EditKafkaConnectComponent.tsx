import CommonBody from 'scenes/common/body/CommonBody';
import EditKafkaConnectBody from './body/EditKafkaConnectBody';
import EditKafkaConnectHeader from './header/EditKafkaConnectHeader';

interface EditKafkaConnectComponentProps {
    refreshPageContent: () => void;
}

function EditKafkaConnectComponent({
    refreshPageContent,
}: EditKafkaConnectComponentProps) {
    return (
        <>
            <EditKafkaConnectHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditKafkaConnectBody />
            </CommonBody>
        </>
    );
}

export default EditKafkaConnectComponent;
