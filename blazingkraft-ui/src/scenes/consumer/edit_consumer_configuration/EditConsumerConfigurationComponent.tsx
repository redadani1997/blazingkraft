import CommonBody from 'scenes/common/body/CommonBody';
import EditConsumerConfigurationBody from './body/EditConsumerConfigurationBody';
import EditConsumerConfigurationHeader from './header/EditConsumerConfigurationHeader';

interface EditConsumerConfigurationComponentProps {
    refreshPageContent: () => void;
}

function EditConsumerConfigurationComponent({
    refreshPageContent,
}: EditConsumerConfigurationComponentProps) {
    return (
        <>
            <EditConsumerConfigurationHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <EditConsumerConfigurationBody />
            </CommonBody>
        </>
    );
}

export default EditConsumerConfigurationComponent;
