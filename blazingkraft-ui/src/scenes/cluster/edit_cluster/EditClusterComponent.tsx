import CommonBody from 'scenes/common/body/CommonBody';
import EditClusterBody from './body/EditClusterBody';
import EditClusterHeader from './header/EditClusterHeader';

interface EditClusterComponentProps {
    refreshPageContent: () => void;
}

function EditClusterComponent({
    refreshPageContent,
}: EditClusterComponentProps) {
    return (
        <>
            <EditClusterHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditClusterBody />
            </CommonBody>
        </>
    );
}

export default EditClusterComponent;
