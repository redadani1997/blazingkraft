import CommonBody from 'scenes/common/body/CommonBody';
import TopicDetailsBody from './body/TopicDetailsBody';
import TopicDetailsHeader from './header/TopicDetailsHeader';

interface TopicDetailsComponentProps {
    refreshPageContent: () => void;
    schemaRegistryCode?: string;
    isAuthorizedDescribeSubjects: boolean;
}

function TopicDetailsComponent({
    refreshPageContent,
    isAuthorizedDescribeSubjects,
    schemaRegistryCode,
}: TopicDetailsComponentProps) {
    return (
        <>
            <TopicDetailsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <TopicDetailsBody
                    isAuthorizedDescribeSubjects={isAuthorizedDescribeSubjects}
                    schemaRegistryCode={schemaRegistryCode}
                />
            </CommonBody>
        </>
    );
}

export default TopicDetailsComponent;
