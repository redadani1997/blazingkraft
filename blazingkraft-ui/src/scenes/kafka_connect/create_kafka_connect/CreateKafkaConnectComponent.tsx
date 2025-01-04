import CommonBody from 'scenes/common/body/CommonBody';
import CreateKafkaConnectBody from './body/CreateKafkaConnectBody';
import CreateKafkaConnectHeader from './header/CreateKafkaConnectHeader';

function CreateKafkaConnectComponent() {
    return (
        <>
            <CreateKafkaConnectHeader />
            <CommonBody>
                <CreateKafkaConnectBody />
            </CommonBody>
        </>
    );
}

export default CreateKafkaConnectComponent;
