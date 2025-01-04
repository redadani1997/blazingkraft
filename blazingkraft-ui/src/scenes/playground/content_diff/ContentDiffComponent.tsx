import CommonBody from 'scenes/common/body/CommonBody';
import ContentDiffBody from './body/ContentDiffBody';
import ContentDiffHeader from './header/ContentDiffHeader';

function ContentDiffComponent() {
    return (
        <>
            <ContentDiffHeader />
            <CommonBody>
                <ContentDiffBody />
            </CommonBody>
        </>
    );
}

export default ContentDiffComponent;
