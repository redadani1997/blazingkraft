import CommonBody from 'scenes/common/body/CommonBody';
import OpenAPIDefinitionBody from './body/OpenAPIDefinitionBody';
import OpenAPIDefinitionHeader from './header/OpenAPIDefinitionHeader';

function OpenAPIDefinitionComponent() {
    return (
        <>
            <OpenAPIDefinitionHeader />
            <CommonBody>
                <OpenAPIDefinitionBody />
            </CommonBody>
        </>
    );
}

export default OpenAPIDefinitionComponent;
