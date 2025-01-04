import CommonBody from 'scenes/common/body/CommonBody';
import BlazingProducerDetailsBody from './body/BlazingProducerDetailsBody';
import BlazingProducerDetailsHeader from './header/BlazingProducerDetailsHeader';

interface BlazingProducerDetailsComponentProps {
    refreshPageContent: () => void;
}

function BlazingProducerDetailsComponent({
    refreshPageContent,
}: BlazingProducerDetailsComponentProps) {
    return (
        <>
            <BlazingProducerDetailsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <BlazingProducerDetailsBody />
            </CommonBody>
        </>
    );
}

export default BlazingProducerDetailsComponent;
