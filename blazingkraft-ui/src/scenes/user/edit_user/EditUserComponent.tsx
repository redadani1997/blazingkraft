import CommonBody from 'scenes/common/body/CommonBody';
import EditUserBody from './body/EditUserBody';
import EditUserHeader from './header/EditUserHeader';

interface EditUserComponentProps {
    refreshPageContent: () => void;
}

function EditUserComponent({ refreshPageContent }: EditUserComponentProps) {
    return (
        <>
            <EditUserHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditUserBody />
            </CommonBody>
        </>
    );
}

export default EditUserComponent;
