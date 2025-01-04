import CommonBody from 'scenes/common/body/CommonBody';
import OpenAPIContentBody from './body/OpenAPIContentBody';
import OpenAPIContentHeader from './header/OpenAPIContentHeader';

function OpenAPIContentComponent() {
    return (
        <>
            <OpenAPIContentHeader />
            <CommonBody>
                <OpenAPIContentBody />
            </CommonBody>
        </>
    );
}

export default OpenAPIContentComponent;
