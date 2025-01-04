import CommonBody from 'scenes/common/body/CommonBody';
import BrokerDetailsBody from './body/BrokerDetailsBody';
import BrokerDetailsHeader from './header/BrokerDetailsHeader';

interface BrokerDetailsComponentProps {
    refreshPageContent: () => void;
}

function BrokerDetailsComponent({
    refreshPageContent,
}: BrokerDetailsComponentProps) {
    return (
        <>
            <BrokerDetailsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <BrokerDetailsBody />
            </CommonBody>
        </>
    );
}

export default BrokerDetailsComponent;
