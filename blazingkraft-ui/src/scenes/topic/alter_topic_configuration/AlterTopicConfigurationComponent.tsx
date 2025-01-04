import CommonBody from 'scenes/common/body/CommonBody';
import AlterTopicConfigurationBody from './body/AlterTopicConfigurationBody';
import AlterTopicConfigurationHeader from './header/AlterTopicConfigurationHeader';

interface AlterTopicConfigurationComponentProps {
    refreshPageContent: () => void;
}

function AlterTopicConfigurationComponent({
    refreshPageContent,
}: AlterTopicConfigurationComponentProps) {
    return (
        <>
            <AlterTopicConfigurationHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <AlterTopicConfigurationBody />
            </CommonBody>
        </>
    );
}

export default AlterTopicConfigurationComponent;
