import CommonBody from 'scenes/common/body/CommonBody';
import EditProducerConfigurationBody from './body/EditProducerConfigurationBody';
import EditProducerConfigurationHeader from './header/EditProducerConfigurationHeader';

interface EditProducerConfigurationComponentProps {
    refreshPageContent: () => void;
}

function EditProducerConfigurationComponent({
    refreshPageContent,
}: EditProducerConfigurationComponentProps) {
    return (
        <>
            <EditProducerConfigurationHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <EditProducerConfigurationBody />
            </CommonBody>
        </>
    );
}

export default EditProducerConfigurationComponent;
