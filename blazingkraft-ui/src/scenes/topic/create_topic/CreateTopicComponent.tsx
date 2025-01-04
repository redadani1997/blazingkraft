import CommonBody from 'scenes/common/body/CommonBody';
import CreateTopicBody from './body/CreateTopicBody';
import CreateTopicHeader from './header/CreateTopicHeader';

function CreateTopicComponent() {
    return (
        <>
            <CreateTopicHeader />
            <CommonBody>
                <CreateTopicBody />
            </CommonBody>
        </>
    );
}

export default CreateTopicComponent;
