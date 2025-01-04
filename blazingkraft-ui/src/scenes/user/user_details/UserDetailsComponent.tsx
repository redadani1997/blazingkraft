import CommonBody from 'scenes/common/body/CommonBody';
import UserDetailsBody from './body/UserDetailsBody';
import UserDetailsHeader from './header/UserDetailsHeader';

interface UserDetailsComponentProps {
    refreshPageContent: () => void;
}

function UserDetailsComponent({
    refreshPageContent,
}: UserDetailsComponentProps) {
    return (
        <>
            <UserDetailsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <UserDetailsBody />
            </CommonBody>
        </>
    );
}

export default UserDetailsComponent;
