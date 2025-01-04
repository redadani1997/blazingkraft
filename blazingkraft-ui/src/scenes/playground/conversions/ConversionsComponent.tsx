import CommonBody from 'scenes/common/body/CommonBody';
import ConversionsBody from './body/ConversionsBody';
import ConversionsHeader from './header/ConversionsHeader';

function ConversionsComponent() {
    return (
        <>
            <ConversionsHeader />
            <CommonBody>
                <ConversionsBody />
            </CommonBody>
        </>
    );
}

export default ConversionsComponent;
