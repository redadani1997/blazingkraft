import CommonBody from 'scenes/common/body/CommonBody';
import EditGroupBody from './body/EditGroupBody';
import EditGroupHeader from './header/EditGroupHeader';

interface EditGroupComponentProps {
    refreshPageContent: () => void;
}

function EditGroupComponent({ refreshPageContent }: EditGroupComponentProps) {
    return (
        <>
            <EditGroupHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditGroupBody />
            </CommonBody>
        </>
    );
}

export default EditGroupComponent;
