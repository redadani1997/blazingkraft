import CommonBody from 'scenes/common/body/CommonBody';
import AllConsumerGroupsBody from './body/AllConsumerGroupsBody';
import AllConsumerGroupsHeader from './header/AllConsumerGroupsHeader';

interface AllConsumerGroupsComponentProps {
    refreshPageContent: () => void;
}

function AllConsumerGroupsComponent({
    refreshPageContent,
}: AllConsumerGroupsComponentProps) {
    return (
        <>
            <AllConsumerGroupsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllConsumerGroupsBody />
            </CommonBody>
        </>
    );
}

export default AllConsumerGroupsComponent;
