import CommonBody from 'scenes/common/body/CommonBody';
import EditSchemaRegistryBody from './body/EditSchemaRegistryBody';
import EditSchemaRegistryHeader from './header/EditSchemaRegistryHeader';

interface EditSchemaRegistryComponentProps {
    refreshPageContent: () => void;
}

function EditSchemaRegistryComponent({
    refreshPageContent,
}: EditSchemaRegistryComponentProps) {
    return (
        <>
            <EditSchemaRegistryHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditSchemaRegistryBody />
            </CommonBody>
        </>
    );
}

export default EditSchemaRegistryComponent;
