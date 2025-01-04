import CommonBody from 'scenes/common/body/CommonBody';
import EditServerPermissionsBody from './body/EditServerPermissionsBody';
import EditServerPermissionsHeader from './header/EditServerPermissionsHeader';

interface EditServerPermissionsComponentProps {
    refreshPageContent: () => void;
}

function EditServerPermissionsComponent({
    refreshPageContent,
}: EditServerPermissionsComponentProps) {
    return (
        <>
            <EditServerPermissionsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <EditServerPermissionsBody />
            </CommonBody>
        </>
    );
}

export default EditServerPermissionsComponent;
