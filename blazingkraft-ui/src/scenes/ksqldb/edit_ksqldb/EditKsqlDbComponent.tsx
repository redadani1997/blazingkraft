import CommonBody from 'scenes/common/body/CommonBody';
import EditKsqlDbBody from './body/EditKsqlDbBody';
import EditKsqlDbHeader from './header/EditKsqlDbHeader';

interface EditKsqlDbComponentProps {
    refreshPageContent: () => void;
}

function EditKsqlDbComponent({ refreshPageContent }: EditKsqlDbComponentProps) {
    return (
        <>
            <EditKsqlDbHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <EditKsqlDbBody />
            </CommonBody>
        </>
    );
}

export default EditKsqlDbComponent;
