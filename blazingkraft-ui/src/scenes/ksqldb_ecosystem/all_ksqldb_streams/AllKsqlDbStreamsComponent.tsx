import CommonBody from 'scenes/common/body/CommonBody';
import AllKsqlDbStreamsBody from './body/AllKsqlDbStreamsBody';
import AllKsqlDbStreamsHeader from './header/AllKsqlDbStreamsHeader';

interface AllKsqlDbStreamsComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbStreamsComponent({
    refreshPageContent,
}: AllKsqlDbStreamsComponentProps) {
    return (
        <>
            <AllKsqlDbStreamsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKsqlDbStreamsBody />
            </CommonBody>
        </>
    );
}

export default AllKsqlDbStreamsComponent;
