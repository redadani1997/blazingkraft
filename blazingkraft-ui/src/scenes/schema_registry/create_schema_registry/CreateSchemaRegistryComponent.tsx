import CommonBody from 'scenes/common/body/CommonBody';
import CreateSchemaRegistryBody from './body/CreateSchemaRegistryBody';
import CreateSchemaRegistryHeader from './header/CreateSchemaRegistryHeader';

function CreateSchemaRegistryComponent() {
    return (
        <>
            <CreateSchemaRegistryHeader />
            <CommonBody>
                <CreateSchemaRegistryBody />
            </CommonBody>
        </>
    );
}

export default CreateSchemaRegistryComponent;
