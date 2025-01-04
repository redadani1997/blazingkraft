import CommonBody from 'scenes/common/body/CommonBody';
import SchemasContentBody from './body/SchemasContentBody';
import SchemasContentHeader from './header/SchemasContentHeader';

function SchemasContentComponent() {
    return (
        <>
            <SchemasContentHeader />
            <CommonBody>
                <SchemasContentBody />
            </CommonBody>
        </>
    );
}

export default SchemasContentComponent;
