import CommonBody from 'scenes/common/body/CommonBody';
import EditConnectorBody from './body/EditConnectorBody';
import EditConnectorHeader from './header/EditConnectorHeader';

interface EditConnectorComponentProps {
    refreshPageContent: () => void;
}

function EditConnectorComponent({
    refreshPageContent,
}: EditConnectorComponentProps) {
    return (
        <>
            <EditConnectorHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditConnectorBody />
            </CommonBody>
        </>
    );
}

export default EditConnectorComponent;
