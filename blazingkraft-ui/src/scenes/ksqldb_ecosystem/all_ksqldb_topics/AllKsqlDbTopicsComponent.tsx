import CommonBody from 'scenes/common/body/CommonBody';
import AllKsqlDbTopicsBody from './body/AllKsqlDbTopicsBody';
import AllKsqlDbTopicsHeader from './header/AllKsqlDbTopicsHeader';

interface AllKsqlDbTopicsComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbTopicsComponent({
    refreshPageContent,
}: AllKsqlDbTopicsComponentProps) {
    return (
        <>
            <AllKsqlDbTopicsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKsqlDbTopicsBody />
            </CommonBody>
        </>
    );
}

export default AllKsqlDbTopicsComponent;
