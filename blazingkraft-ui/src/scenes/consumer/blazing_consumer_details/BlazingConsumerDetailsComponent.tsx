import CommonBody from 'scenes/common/body/CommonBody';
import BlazingConsumerDetailsBody from './body/BlazingConsumerDetailsBody';
import BlazingConsumerDetailsHeader from './header/BlazingConsumerDetailsHeader';

interface BlazingConsumerDetailsComponentProps {
    refreshPageContent: () => void;
}

function BlazingConsumerDetailsComponent({
    refreshPageContent,
}: BlazingConsumerDetailsComponentProps) {
    return (
        <>
            <BlazingConsumerDetailsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <BlazingConsumerDetailsBody />
            </CommonBody>
        </>
    );
}

export default BlazingConsumerDetailsComponent;
