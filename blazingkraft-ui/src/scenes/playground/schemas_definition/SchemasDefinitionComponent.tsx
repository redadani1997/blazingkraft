import CommonBody from 'scenes/common/body/CommonBody';
import SchemasDefinitionBody from './body/SchemasDefinitionBody';
import SchemasDefinitionHeader from './header/SchemasDefinitionHeader';

function SchemasDefinitionComponent() {
    return (
        <>
            <SchemasDefinitionHeader />
            <CommonBody>
                <SchemasDefinitionBody />
            </CommonBody>
        </>
    );
}

export default SchemasDefinitionComponent;
