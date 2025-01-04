import CommonBody from 'scenes/common/body/CommonBody';
import ContentValidationBody from './body/ContentValidationBody';
import ContentValidationHeader from './header/ContentValidationHeader';

function ContentValidationComponent() {
    return (
        <>
            <ContentValidationHeader />
            <CommonBody>
                <ContentValidationBody />
            </CommonBody>
        </>
    );
}

export default ContentValidationComponent;
