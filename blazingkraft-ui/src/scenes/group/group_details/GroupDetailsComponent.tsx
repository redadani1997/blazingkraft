import CommonBody from 'scenes/common/body/CommonBody';
import GroupDetailsBody from './body/GroupDetailsBody';
import GroupDetailsHeader from './header/GroupDetailsHeader';

interface GroupDetailsComponentProps {
    refreshPageContent: () => void;
}

function GroupDetailsComponent({
    refreshPageContent,
}: GroupDetailsComponentProps) {
    return (
        <>
            <GroupDetailsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <GroupDetailsBody />
            </CommonBody>
        </>
    );
}

export default GroupDetailsComponent;
