import CommonBody from 'scenes/common/body/CommonBody';
import AllTopicsBody from './body/AllTopicsBody';
import AllTopicsHeader from './header/AllTopicsHeader';

interface AllTopicsComponentProps {
    refreshPageContent: () => void;
}

function AllTopicsComponent({ refreshPageContent }: AllTopicsComponentProps) {
    return (
        <>
            <AllTopicsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllTopicsBody />
            </CommonBody>
        </>
    );
}

export default AllTopicsComponent;
